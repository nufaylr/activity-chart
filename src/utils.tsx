import * as d3 from "d3";
import {yScale , time24h} from "./WaffleCalendarChart/yScale";
import xScale from "./WaffleCalendarChart/xScale";

const mockStartDate = new Date(2022, 4, 24)
const mockEndDate = new Date(2022, 4, 30, 23, 0, 0, 0)

const dateRange = (start: Date, end: Date): string[] => {
    const dateRange = d3.timeDays(start, end)
    const formatDate = dateRange.map((day)=>d3.timeFormat("%d/%m/%Y")(day))
    return formatDate
};

const getDateRange = dateRange(mockStartDate,  mockEndDate)
const xScaleWithDateRange: any = xScale(getDateRange)

const getXpos = (date:string) => {
    const parts: any = date.split('/')
    const dateFormat = `${parts[2]}-${parts[1]}-${parts[0]}`
    const _date = new Date(dateFormat);
    return xScaleWithDateRange(d3.timeFormat("%d/%m/%Y")(_date))
}

const getYpos= (d:any) =>{
    if(yScale(d)){
        return yScale(d)
    }
}

const getXposWithData = (d: any) =>{
   const dateTime = new Date(d.startedAt)
   return xScaleWithDateRange(d3.timeFormat("%d/%m/%Y")(dateTime))
}

const getYposWithData = (d:any) =>{
   const dateTime = new Date(d.startedAt)
   const dateTimeFormat = d3.timeFormat("%H:%M")(dateTime)
   return yScale(`${dateTimeFormat.split(":")[0]}`)
}


export {dateRange, mockStartDate, mockEndDate, time24h, getXpos, getYpos, getXposWithData, getYposWithData}
