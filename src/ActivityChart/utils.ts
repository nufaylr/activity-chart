import {timeDays} from "d3-time";
import {timeFormat} from "d3-time-format";

// todo: make dynamic instead static
const time  =  Array(24).fill(0).map((_, i)=>{
    if(i < 10 ) {
        return '0' + i.toString()
    }
    return i.toString()
})

const time24h = time.reverse()

const dateRange = (start: Date, end: Date): string[] => {
    const dateRange = timeDays(start, end)
    const formatDate = dateRange.map((day)=>timeFormat("%d/%m/%Y")(day))
    return formatDate
};

const defaultMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 50
}

export {time24h, defaultMargin, dateRange}
