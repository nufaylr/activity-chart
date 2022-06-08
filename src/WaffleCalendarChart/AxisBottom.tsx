import {FunctionComponent, useMemo} from "react"
import {height, margin} from "./settings"
import {getDaysArray} from "./mockData";
import xScale from "./xScale"

const AxisBottom: FunctionComponent<{startDate: Date, endDate:Date}> = ({startDate, endDate}) => {

    const axisBottomTicks = useMemo(() => {
        const getDateRange = getDaysArray(startDate,  endDate)
        const xDateScale: any = xScale(getDateRange)
        return xDateScale.domain().map((value: any) => (
            {value, xOffset: xDateScale(value) + margin.left}))
    },[startDate, endDate])

    return (
        <g transform={`translate(${margin.left},${height - margin.bottom})`} opacity="0.5" fill="none" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
            <path className="domain" stroke="currentColor" d="M0.5,6V0.5H700.5V6"/>
            {axisBottomTicks.map((item: any) => (
                <g
                    className="tick"
                    opacity="1"
                    key={item.value}
                    transform={`translate(${item.xOffset}, 0)`}
                >
                    <line stroke="currentColor" y2="6" />
                    <text key={`axisBottom_${item.value}`} fill="currentColor" y="9" dy="0.71em">
                        {item.value}
                    </text>
                </g>
            ))}
        </g>
    )
}

export {AxisBottom}