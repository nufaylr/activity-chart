import {scaleBand} from "d3-scale"
import {height, margin} from "./settings";
import {time24h} from "./mockData"

const yScale: any = scaleBand()
    .domain(time24h.reverse())
    .rangeRound([margin.top, height - margin.bottom])

export default yScale