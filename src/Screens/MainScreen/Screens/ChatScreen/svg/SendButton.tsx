import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgSendButton = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
   
  >
    <Circle cx={16} cy={16} r={16} fill="url(#a)" />
    <Path
      fill="#fff"
      d="M15 23a1 1 0 1 0 2 0h-2Zm1.707-13.707a1 1 0 0 0-1.414 0l-6.364 6.364a1 1 0 0 0 1.414 1.414L16 11.414l5.657 5.657a1 1 0 0 0 1.414-1.414l-6.364-6.364ZM17 23V10h-2v13h2Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0}
        x2={35.454}
        y1={32}
        y2={4.503}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgSendButton
