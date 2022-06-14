import {FunctionComponent, useMemo} from "react"
import {height, margin} from "./settings"
import xScale from "./xScale"

const AxisBottom: FunctionComponent<{range:string[]}> = ({range}) => {

    const axisBottomTicks = useMemo(() => {
        const xScaleWithRange: any = xScale(range)
        return xScaleWithRange.domain().map((value: any) => (
            {value, xOffset: xScaleWithRange(value) + margin.left}))
    },[range])

    return (
        <g transform={`translate(${margin.left},${height - margin.bottom})`} opacity="0.5"
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