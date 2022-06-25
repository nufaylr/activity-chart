import * as d3 from "d3";
import {useActivityChart} from "./ActivityChart"

const usePosition = () => {
    const {xScale, yScale} = useActivityChart()

    const getXpos = (date: Date) => {
        const dateFormat = d3.timeFormat("%d/%m/%Y")(date)
        return xScale(dateFormat)
    }

    const getYpos = (dateTime: Date) => {
        const dateTimeFormat = d3.timeFormat("%H:%M")(dateTime)
        return yScale(`${dateTimeFormat.split(":")[0]}`)
    }

    return {getXpos, getYpos, xScale, yScale}
}

export default usePosition
