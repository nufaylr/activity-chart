import {FunctionComponent, useMemo} from "react"
import {yScale} from "./yScale";
import {width} from "./settings";

const formatScale = (date: string) => `${date}:00`

const AxisLeft: FunctionComponent = () => {

    const axisLeftTicks = useMemo(() => {
        return yScale.domain().map((value: string) => (
            {value, yOffset: yScale(value)}))
    },[])

    return (
        <g transform="translate(50,0)" opacity="0.5" fill="none" fontSize="10" fontFamily="sans-serif" textAnchor="end">
            <path className="domain" stroke="currentColor" d="M-6,30H0V470H-6"></path>
            {axisLeftTicks.map((item: any) => (
                <g
                    className="tick"
                    opacity="1"
                    key={item.value}
                    transform={`translate(0, ${item.yOffset})`}
                >
                    <line x2={width} stroke="currentColor"/>
                    <text key={item.value} fill="currentColor" x="-9" dy="0.32em">
                        {formatScale(item.value)}
                    </text>
                </g>
            ))}
        </g>
    )
}

export {AxisLeft}