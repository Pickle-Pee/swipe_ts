import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const SVGTabMessages = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={24}
    fill="none"
    {...props}
  >
    <Circle cx={10} cy={12.114} r={1} fill={props.color} />
    <Circle cx={14} cy={12.114} r={1} fill={props.color} />
    <Circle cx={18} cy={12.114} r={1} fill={props.color} />
    <Path
      fill={props.color}
      d="M13.997 0C7.37.008 2 5.377 1.993 12.003v.041c0 2.93 1.063 5.611 2.825 7.68l-.014-.018-3.923 4.3h13.116C20.626 24.007 26 18.634 26 12.004 26 5.374 20.626 0 13.997 0ZM4.862 22.25l2.332-2.56-.575-.592a10.077 10.077 0 0 1-2.87-7.057l.001-.04v.002c0-5.659 4.588-10.246 10.247-10.246s10.246 4.587 10.246 10.246c0 5.66-4.587 10.247-10.246 10.247H4.862Z"
    />
  </Svg>
)
export default SVGTabMessages
