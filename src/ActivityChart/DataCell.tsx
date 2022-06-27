import {FunctionComponent, useMemo, useCallback} from 'react';
import {Cell} from "./Cell";
import usePosition from "./usePosition";
import {useActivityChart} from "./ActivityChart";


interface DataCellProps  {
    dateTime : string
    fill: string
    onClick?: (item:any) => void
    className? : string
    item? : {[key: string]: any}
}

const DataCell:FunctionComponent<DataCellProps> = ({item,  dateTime, fill,className, onClick}) => {
    const {getXpos, getYpos} = usePosition()
    const {margin} = useActivityChart()

    const calculateXpos = useMemo(()=>{
        const DateItem = new Date(dateTime)
        return getXpos(DateItem)
    },[dateTime, getXpos])

    const calculateYpos = useMemo(()=>{
        const DateTime = new Date(dateTime)
        return getYpos(DateTime)
    },[dateTime, getYpos])

    const  forwardOnClick = useCallback(()=>{
        if(!onClick) return;
            onClick(item? item : null)
    },[item, onClick])

    return (
        <Cell
            x={calculateXpos}
            y={calculateYpos  - 6}
            color={fill} width={80} marginLeft={margin.left} onClick={onClick && forwardOnClick } className={className}/>
    );
};

export {DataCell}
