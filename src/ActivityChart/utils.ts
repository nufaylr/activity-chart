import * as d3 from "d3";

// todo: make dynamic instead static
const time24h  =  Array(24).fill(0).map((_, i)=>{
    if(i < 10 ) {
        return '0' + i.toString()
    }
    return i.toString()
})

const dateRange = (start: Date, end: Date): string[] => {
    const dateRange = d3.timeDays(start, end)
    const formatDate = dateRange.map((day)=>d3.timeFormat("%d/%m/%Y")(day))
    return formatDate
};

const defaultMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 50
}

export {time24h, defaultMargin, dateRange}
