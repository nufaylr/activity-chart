import {FunctionComponent, useMemo} from "react"
import usePosition from "./usePosition"
import {useActivityChart} from "./ActivityChart";

const AxisBottom: FunctionComponent = () => {

    const {xScale} = usePosition()
    const {height, margin} = useActivityChart()

    const axisBottomTicks = useMemo(() => {
        return xScale.domain().map((value: any) => (
            {value, xOffset: xScale(value) + margin.left}))
    },[xScale, margin])

    return (
        <g transform={`translate(${margin.left},${Number(height) - margin.bottom})`} opacity="0.5"
           fill="none" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
            <path className="domain" stroke="currentColor" d="M0.5,6V0.5H700.5V6"/>
            {axisBottomTicks.map((item: {[key: string]: string;}) => (
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
