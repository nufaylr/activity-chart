import React from 'react';
import './App.css';
import {scaleOrdinal} from "d3-scale";
import {AxisLeft, AxisBottom, Square} from "./WaffleCalendarChart"
import {height, margin} from "./WaffleCalendarChart/settings"
import {dateRange, getXpos, getYpos, getXposWithData, getYposWithData, time24h} from "./utils"

/*
 We can build summaries the outcome of the jobs example :
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
const axisDateRange = dateRange(mockStartDate, mockEndDate)

const colorScale: any = scaleOrdinal().domain(["Success", "Error", "Scheduled"])
    .range([success_colour, error_colour, scheduled_colour])

const squareItems = axisDateRange.map((axisBottomDate) => time24h.map((axisLeftTime, index) =>
    getYpos(axisLeftTime) ? <Square key={index} x={getXpos(axisBottomDate)} y={getYpos(axisLeftTime) - 6} width={barWidth} marginLeft={margin.left} color={default_colour}/>  : null))

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
        <AxisBottom range={axisDateRange} />
      </svg>
    </div>
  );
}

export default App;
