import React from 'react';
import './App.css';
import {scaleOrdinal} from "d3-scale";
import { DataCell, ActivityChart} from "./ActivityChart"

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
const colorScale: any = scaleOrdinal().domain(["Success", "Error", "Scheduled"])
    .range(['#319747', '#ed3939', '#cccaca'])

function App() {
  return (
    <div className="App">
     <ActivityChart startDate={mockStartDate} endDate={mockEndDate} width='700'>
       {
         JOBSSummary.map((data, index)=>
               <DataCell
                   key={index}
                   item={data}
                   dateTime={data.startedAt}
                   fill={colorScale(data)}
                   onClick={(item)=>{ console.log('🌺 can trigger popup here', item) }}/>
         )
       }
     </ActivityChart>
    </div>
  );
}

export default App;
