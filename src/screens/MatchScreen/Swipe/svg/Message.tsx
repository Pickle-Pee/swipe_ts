import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgMessage = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
  
  >
    <Circle cx={26} cy={26} r={26} fill="#fff" />
    <Path
      fill="url(#a)"
      d="M26.62 13c-7.386.009-13.371 5.824-13.38 13v.044c0 3.173 1.185 6.077 3.148 8.317l-.015-.018L12 39h14.62C34.01 39 40 33.18 40 26s-5.99-13-13.38-13Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={40}
        x2={10.734}
        y1={39}
        y2={14.556}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgMessage
