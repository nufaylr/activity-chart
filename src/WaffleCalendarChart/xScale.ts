import {scaleBand} from "d3-scale";
import {width} from "./settings";

const xScale :any = (domain: string[]) => {
   return scaleBand()
       .domain([...domain])
       .rangeRound([0, width])
}

export default xScale