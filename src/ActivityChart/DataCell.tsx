import {FunctionComponent, useMemo} from 'react';
import {Cell} from "./Cell";
import usePosition from "./usePosition";
import {useActivityChart} from "./ActivityChart";

interface DataCellProps {
    item : {[key: string]: any}
    itemKey: string
    fill: string
}

const DataCell:FunctionComponent<DataCellProps> = ({item, itemKey, fill}) => {
    const {getXpos, getYpos} = usePosition()
    const {margin} = useActivityChart()

    const calculateXpos = useMemo(()=>{
        const DateItem = new Date(item[itemKey])
        return getXpos(DateItem)
    },[item, itemKey, getXpos])

    const calculateYpos = useMemo(()=>{
        const DateTime = new Date(item[itemKey])
        return getYpos(DateTime)
    },[item, itemKey, getYpos])

    return (
        <Cell x={calculateXpos} y={calculateYpos  - 6} color={fill} width={80} marginLeft={margin.left}/>
    );
};

export {DataCell}
