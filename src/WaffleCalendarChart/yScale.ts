import {scaleBand} from "d3-scale"
import {height, margin} from "./settings";

// todo: make dynamic instead static
const time24h  =  Array(24).fill(0).map((_,i)=>{
    if(i < 10 ) {
        return '0' + i.toString()
    }
    return i.toString()
})

const yScale:any = scaleBand()
    .domain(time24h.reverse())
    .rangeRound([margin.top, height - margin.bottom])

export {yScale, time24h}