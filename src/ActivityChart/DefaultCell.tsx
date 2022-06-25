import {FunctionComponent} from "react";
import usePosition from "./usePosition";
import {time24h} from "./utils";
import {Cell} from "./Cell";

interface DefaultCellProps {
    dataRange: string[]
    cellColor?: string
}

const margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 50
};

const DefaultCell:FunctionComponent<DefaultCellProps> = ({dataRange, cellColor}) => {
    const {getXpos, yScale} = usePosition()

    const calculateXpos = (xAxis:string) => {
        const splitStr: any = xAxis.split('/')
        const dateFormat = `${splitStr[2]}-${splitStr[1]}-${splitStr[0]}`
        const AxisDate = new Date(dateFormat)
        return getXpos(AxisDate)
    }

    const cells = dataRange.map((axisBottomValue: string) => time24h.map((axisLeftValue, index) => {
        return yScale(axisLeftValue)
            && <Cell
                key={index}
                x={calculateXpos(axisBottomValue)}
                y={yScale(axisLeftValue) - 6}
                width={80}
                marginLeft={margin.left}
                color={cellColor ? cellColor : '#ebeaea'}/>
    }))

    return (<>{cells}</>)
}

export default DefaultCell
