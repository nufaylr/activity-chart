import * as d3 from "d3";

const getDaysArray = function(start: Date, end: Date) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(d3.timeFormat("%d/%m/%Y")(dt));
    }
    return arr;
};

// const mockStartDate = new Date(2022, 4, 24)
// const mockEndDate = new Date(2022, 4, 30, 23, 0, 0, 0)
// const weekDateRange = getDaysArray(mockStartDate,  mockEndDate)
const time24h = ["00","01","02","03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15","16","17", "18", "19", "20", "22", "23"]
const pad = (d:any) => {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
export {getDaysArray, time24h, pad}
