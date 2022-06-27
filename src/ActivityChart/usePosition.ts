import {timeFormat} from "d3-time-format";
import {useActivityChart} from "./ActivityChart"

const usePosition = () => {
    const {xScale, yScale} = useActivityChart()

    const getXpos = (date: Date) => {
        const dateFormat = timeFormat("%d/%m/%Y")(date)
        return xScale(dateFormat)
    }

    const getYpos = (dateTime: Date) => {
        const dateTimeFormat = timeFormat("%H:%M")(dateTime)
        return yScale(`${dateTimeFormat.split(":")[0]}`)
    }

    return {getXpos, getYpos, xScale, yScale}
}

export default usePosition
