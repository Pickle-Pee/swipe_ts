import * as React from "react"
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgDislike= () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={52}
    fill="none"
   
  >
    <Circle cx={26} cy={26} r={26} fill="#fff" />
    <Path
      fill="url(#a)"
      d="M35.433 33.443a1.409 1.409 0 1 1-1.992 1.992L26 27.992l-7.443 7.44a1.409 1.409 0 1 1-1.992-1.992L24.009 26l-7.44-7.443a1.409 1.409 0 0 1 1.991-1.992L26 24.008l7.443-7.444a1.408 1.408 0 1 1 1.992 1.992L27.993 26l7.44 7.443Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={16.153}
        x2={37.975}
        y1={35.847}
        y2={18.924}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgDislike
