# Activity Chart
Chart using the D3 js visualisation library with React.

##  The problem
As charting libraries have limitations as they were built for common scenarios it does not cover the requirement we got for the Observability Dashboard activity jobs chart.

## Solution
Trying to solve the problem by building a customised chart using the D3 js visualisation library's modules such as scale, axis with using Reactjs as a rendering UI.

## How to use


### Simple Example

```javascript
import { DataCell, ActivityChart} from "./ActivityChart"

const StartDate = new Date(2022, 4, 24)
const EndDate = new Date(2022, 4, 30, 23, 0, 0, 0)
    
<ActivityChart startDate={StartDate} endDate={EndDate} width='700'>
  <DataCell dateTime="2022-05-24T01:40:00.00" fill='#319747'/>
</ActivityChart>

```

### Advance Example

```javascript
import { DataCell, ActivityChart} from "./ActivityChart"

// data can be fetch from server make sure to have datatime
const data = [{at:"2022-05-24T01:40:00.00",...etc}, {at:"2022-05-25T19:10:00.00",...etc}] 

const StartDate = new Date(2022, 4, 24)
const EndDate = new Date(2022, 4, 30, 23, 0, 0, 0)
const onDataCellCick = (item) => {
    // trigger anything pop-up window to tooltips etc..
    console.log(item)
}

<ActivityChart startDate={StartDate} endDate={EndDate} width='700'>
    {data.map((item)=> <DataCell item={item} dateTime={item.at} fill='#319747' onClick={onDataCellCick}/> )
</ActivityChart>

```

## Required dependencies
- React ^18.xx
- [d3-axis](https://github.com/d3/d3-axis) ^3.xx
- [d3-scale ](https://github.com/d3/d3-scale)^4.xx
- [d3-time](https://github.com/d3/d3-time) ^3.xx
- [d3-time-format](https://github.com/d3/d3-time-format) ^4.xx 


## To starting dev server 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## To do
- Make chart responsive for (XS, M) screens
- Make history time to be highlighted
- `startDate` and `endDate` props to be validated
- Make margin's and time dynamic
- Make more type safety by using internal d3-scale, axis interfaces
- Write test cases

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
