import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgLike = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
  
  >
    <Circle cx={26} cy={26} r={26} fill="#fff" />
    <Path
      fill="url(#a)"
      d="M39.125 22.016c0 8.203-12.163 14.843-12.68 15.117a.937.937 0 0 1-.89 0c-.517-.274-12.68-6.914-12.68-15.117a7.274 7.274 0 0 1 7.266-7.266c2.42 0 4.538 1.04 5.859 2.8 1.32-1.76 3.44-2.8 5.86-2.8a7.274 7.274 0 0 1 7.265 7.266Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12.875}
        x2={38.48}
        y1={37.245}
        y2={14.072}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgLike
