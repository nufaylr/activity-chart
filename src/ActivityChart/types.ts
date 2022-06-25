export interface ActivityChartProps {
    width?: string | number
    height?: string | number
    margin?: {[key: string]: number}
    startDate: Date
    endDate: Date
    defaultCellColor?: string
}

export interface ContextProps {
    width: string | number
    height: string | number
    margin: {[key: string]: number}
    startDate: Date | null
    endDate: Date | null
    defaultCellColor?: string
    xScale: any | null
    yScale: any | null
}

