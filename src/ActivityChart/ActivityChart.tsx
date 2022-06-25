import React, {FunctionComponent, PropsWithChildren, useMemo, createContext, useContext} from 'react';
import {AxisLeft} from "./AxisLeft";
import {AxisBottom} from "./AxisBottom";
import DefaultCell from "./DefaultCell"
import {ActivityChartProps, ContextProps} from './types'
import {scaleBand} from "d3-scale";
import {time24h, dateRange, defaultMargin} from "./utils";

const ActivityChartContext = createContext<ContextProps>({
    width: '',
    height: '',
    margin: defaultMargin,
    startDate: null,
    endDate: null,
    xScale: null,
    yScale: null
})

const useActivityChart = () => {
    const context = useContext(ActivityChartContext)
    if (context === undefined) {
        throw new Error('useActivityChart must be used within a ActivityChartContext Provider')
    }
    return context
}

const ActivityChart:FunctionComponent<PropsWithChildren<ActivityChartProps>> =
    ({width='100%', height= '500',startDate,endDate, children, margin= defaultMargin})=> {

    const dataRange = useMemo(() =>
            dateRange(startDate, endDate),
        [startDate, endDate])

    const contextValue = useMemo(() => {
        const yScale:any = scaleBand()
            .domain(time24h.reverse())
            .rangeRound([margin.top, Number(height) - margin.bottom])

            const createXScale = (domain: string[]) => {
                return scaleBand()
                    .domain([...domain])
                    .rangeRound([0, Number(width)])
            }
        const xScale = createXScale(dataRange)
        return { width, height, startDate, endDate, yScale, xScale, margin}
        },
        [width, height, margin, startDate, endDate, dataRange]
    )

        return (
            <ActivityChartContext.Provider value={contextValue}>
                <svg width={Number(width) + 60} height={height} className="container">
                    <AxisLeft />
                    <g>
                        <DefaultCell dataRange={dataRange}/>
                        {children}
                    </g>
                    <AxisBottom/>
                </svg>
           </ActivityChartContext.Provider>
        );
}

export {ActivityChart, useActivityChart};
