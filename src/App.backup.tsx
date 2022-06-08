import { useRef, useLayoutEffect } from 'react';
import * as d3 from "d3";
import './App.css';

const JOBS = [
  {
    id: "d1",
    startedAt: "2022-05-24T18:40:00.00",
    name: "job-name-1",
    outcome: "Success"
  },
  {
    id: "d2",
    startedAt: "2022-05-24TT18:40:00.00",
    name: "job-name-2",
    outcome: "Success"
  },
  {
    id: "d3",
    startedAt: "2022-05-26T16:20:00.00",
    name: "job-name-3",
    outcome: "Error"
  },
  {
    id: "d4",
    startedAt: "2022-05-26T16:10:00.00",
    name: "job-name-4",
    outcome: "Error"
  },
  {
    id: "d5",
    startedAt: "2022-05-24T04:10:00.00",
    name: "job-name-4",
    outcome: "Error"
  }
];

/*
 group by day and hour and summaries the outcome example :
*/

// const _example1 = parseISO("2022-05-24T18:40:00.00");
// const _example2 = parseISO("2022-05-26T16:10:00.00");

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


const margin = { top: 30, right: 30, bottom: 30, left: 50 }; // Gives space for axes and other margins
const height = 500;
const width = 700;

const barWidth = 80;
const success_colour = '#319747';
const error_colour = '#ed3939';
const scheduled_colour = '#cccaca';
const default_colour = '#ebeaea';

const barStyle = {
  background: default_colour,
  textColor: 'white',
  width: width,
};

const mockStartDate = new Date(2022, 4, 24)
const mockEbdtDate = new Date(2022, 4, 30, 23, 0, 0, 0)
const mock24h = ["00","01","02","03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15","16","17", "18", "19", "20", "22", "23"]

// const mockStartTime = new Date('2022-05-24T01:00:00.00')
// const mockEbdtTime = new Date('2022-05-30T23:00:00.00')

// var start_of_day = new Date()
// start_of_day.setHours(0,0,0,0)
// var end_of_day = new Date()
// end_of_day.setHours(23,0,0,0)

// function roundMinutes(date: any) {
//   date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
//   date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
//   return date;
// }

var getDaysArray = function(start: Date, end: Date) {
  for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
    arr.push(d3.timeFormat("%d/%m/%Y")(dt));
  }
  return arr;
};
const daysX = getDaysArray(mockStartDate, mockEbdtDate)
const hours = d3.range(0, 24,1)
function pad(d:any) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}


const Chart = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const renderOnce = useRef(false)

  useLayoutEffect(() => {
    if (!renderOnce.current){
      renderOnce.current = true
     return
    }

    // console.log("date  ::", JOBSSummary);
    // console.log("date00  ::", daysX);
    // d3.timeDays()

    d3.select(chartRef.current).selectAll("*").remove();
    const waffleSVGRef = d3.select(chartRef.current)

    // Scales
    const yScale : any = d3.scaleBand().domain(mock24h.reverse())
        .rangeRound([margin.top, height - margin.bottom])
        .paddingInner(0.1).align(0.1)

    // @ts-ignore
    const yAxis = d3.axisLeft(yScale).tickFormat(function (date) {
      return `${date}:00`
    })
    const colorScale: any = d3.scaleOrdinal().domain(["Success", "Error", "Scheduled"]).range([success_colour, error_colour, scheduled_colour])

    // const xScale : any = d3.scaleTime()
    //     .domain([mockStartDate, mockEbdtDate])
    //     .range([0, width - 100]);

    const xScale : any = d3.scaleBand()
        .domain([...daysX])
        .rangeRound([0, width])

    const xAxis = d3.axisBottom(xScale)

    // append y
    waffleSVGRef
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("opacity", 0.5)
        .call(yAxis)

    // append x
    waffleSVGRef
        .append("g")
        .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
        .attr("opacity", 0.5)
        .call(xAxis)
        // .selectAll("text")
        // .attr("x", 20)
        // .style("text-anchor", "start")

    // grid line
    const xGridLines = d3.axisRight(yScale).ticks(24)
        .tickSize(barStyle.width) // even though they're "ticks" we've set them to be full-width
        .tickFormat((d, i) => '')

    // const gridBox = d3.axisTop(xScale)
    //     .tickSize(height - 60)
    //     .ticks(120)
    //     .tickFormat((d, i) => '')

    waffleSVGRef.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .attr('opacity', 0.3)
        .call(xGridLines);

    waffleSVGRef.append('g')
        .call(function (sel) {
          const join = sel.selectAll('rect')
              .data(d3.range(25))

          daysX.map((date)=>{
            join.enter().append('rect')
                .attr('x', function (d){
                    const parts: any = date.split('/')
                  const _date = `${parts[2]}-${parts[1]}-${parts[0]}`
                    const mydate = new Date(_date);
                    return xScale(d3.timeFormat("%d/%m/%Y")(mydate))
                })
                .attr('y', function (d){
                  if(yScale(`${pad(d)}`)){
                    return yScale(`${pad(d)}`)
                  }
                }).attr('width', barWidth+15)
                .attr('height', '16')
                .attr("fill", function(d){return default_colour })
                .attr('transform', `translate(${margin.left + 5},0)`)
          })

        })


    waffleSVGRef.append("g").selectAll(".rect-block").data(JOBSSummary)
        .enter()
        .append('rect')
        .attr('width', barWidth+15)
        .attr('height', '16')
        .attr("fill", function(d){return colorScale(d) })
        .attr('transform', `translate(${margin.left + 5},0)`)
        // @ts-ignore
        .attr("x", function (d: any){
          const datae = new Date(d.startedAt)
          return xScale(d3.timeFormat("%d/%m/%Y")(datae))
        })
        .attr("y", function (d: any){
          const datae = new Date(d.startedAt)
          const _tt = d3.timeFormat("%H:%M")(datae)
          return yScale(`${_tt.split(":")[0]}`)
        })

  }, []);

  return( <svg ref={chartRef} width="100%" height={height} className="container" />)
}

function App() {
  return (
    <div className="App">
      <Chart/>
    </div>
  );
}

export default App;
