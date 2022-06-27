import {FunctionComponent} from "react";

interface SquareProps {
    x:string,
    y:number,
    color:string,
    width: number,
    marginLeft: number
    className?: string
    onClick?: () => void
}

const Cell : FunctionComponent<SquareProps> = ({x, y, color, width, marginLeft, className, onClick})=>
    <rect width={width+15} height="16" transform={`translate(${marginLeft + 5},0)`}
                          x={x} y={y} fill={color} onClick={onClick && onClick} className={className} />
export {Cell}
