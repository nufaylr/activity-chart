import React from 'react';
import * as d3 from "d3";
import './App.css';
import {AxisLeft, AxisBottom} from "./WaffleCalendarChart"
import {height, margin} from "./WaffleCalendarChart/settings"
import {getDaysArray, pad} from "./WaffleCalendarChart/mockData"
import xScale from "./WaffleCalendarChart/xScale"
import yScale from "./WaffleCalendarChart/yScale";

/*
 group by day and hour and summaries the outcome example :
*/
const JOBSSummary = [
  {
    jobIds: ["d1", "d2"],
    startedAt: "2022-05-24T01:40:00.00",
    outcome: "Success"
  },
  {
    jobIds: ["d3", "d4"],
    startedAt: "2022-05-24T15:03:00.00",
    outcome: "Error"
  },
  {
    jobIds: ["d5"],
    startedAt: "2022-05-25T19:10:00.00",
    outcome: "Scheduled"
  }
];

const mockStartDate = new Date(2022, 4, 24)
const mockEndDate = new Date(2022, 4, 30, 23, 0, 0, 0)

const barWidth = 80;
const success_colour = '#319747';
const error_colour = '#ed3939';
const scheduled_colour = '#cccaca';
const default_colour = '#ebeaea';
const getDateRange = getDaysArray(mockStartDate,  mockEndDate)
const xDateScale: any = xScale(getDateRange)

const getXpos = (date:any) => {
  const parts: any = date.split('/')
  const _date = `${parts[2]}-${parts[1]}-${parts[0]}`
  const mydate = new Date(_date);
  return xDateScale(d3.timeFormat("%d/%m/%Y")(mydate))
}
const getYpos= (d:any) =>{
  if(yScale(`${pad(d)}`)){
    return yScale(`${pad(d)}`)
  }
}
const getXposWithData = (d: any) =>{
  const dateTime = new Date(d.startedAt)
  return xDateScale(d3.timeFormat("%d/%m/%Y")(dateTime))
}
const getYposWithData = (d:any) =>{
  const dateTime = new Date(d.startedAt)
  const _tt = d3.timeFormat("%H:%M")(dateTime)
  return yScale(`${_tt.split(":")[0]}`)
}
const colorScale: any = d3.scaleOrdinal().domain(["Success", "Error", "Scheduled"])
    .range([success_colour, error_colour, scheduled_colour])
const hours  = d3.range(24)

const squareItems  = getDateRange.map((axisBottomDate)=> hours.map((axisLeftTime, index)=>
    getYpos(axisLeftTime) ? <rect width={barWidth+15}
                                  height="16" key={index}
                                  transform={`translate(${margin.left + 5},0)`}
                                  x={getXpos(axisBottomDate)}
                                  y={getYpos(axisLeftTime) - 6}
                                  fill={default_colour} /> : null))

const squareItemsWithData = JOBSSummary.map((data, index)=>
    <rect width={barWidth+15}
          height="16" key={index}
          transform={`translate(${margin.left + 5},0)`}
          x={getXposWithData(data)}
          y={getYposWithData(data) - 6} fill={colorScale(data) } /> )

function App() {
  return (
    <div className="App">
      <svg width="100%" height={height} className="container">
        <AxisLeft />
        <g>
          {squareItems}
          {squareItemsWithData}
        </g>
        <AxisBottom startDate={mockStartDate} endDate={mockEndDate} />
      </svg>
    </div>
  );
}

export default App;
