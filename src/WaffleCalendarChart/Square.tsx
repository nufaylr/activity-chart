import {FunctionComponent} from "react";

interface SquareProps {x:string, y:number, color:string, width: number, marginLeft: number}

const Square : FunctionComponent<SquareProps> = ({x, y, color, width, marginLeft})=>
    <rect width={width+15} height="16" transform={`translate(${marginLeft + 5},0)`}
                          x={x}
                          y={y} fill={color} />

export {Square}