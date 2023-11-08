import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SVGTabSearch = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="m29.906 28.448-7.788-7.788a11.362 11.362 0 1 0-1.458 1.458l7.788 7.788 1.458-1.458ZM4.125 13.406a9.281 9.281 0 1 1 9.281 9.281 9.291 9.291 0 0 1-9.281-9.28Z"
    />
    <Path
      fill="url(#b)"
      d="M15.509 10c-.83 0-1.556.37-2.009.996-.453-.626-1.18-.996-2.009-.996a2.45 2.45 0 0 0-1.76.758A2.636 2.636 0 0 0 9 12.584c0 2.917 4.17 5.279 4.348 5.376a.313.313 0 0 0 .304 0C13.83 17.863 18 15.501 18 12.584c0-.685-.263-1.342-.73-1.826A2.45 2.45 0 0 0 15.509 10Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={2.025}
        x2={32.915}
        y1={29.906}
        y2={5.949}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={14.85}
        x2={10.387}
        y1={11.333}
        y2={14.496}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFC9E4" />
        <Stop offset={1} stopColor="#F857A6" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SVGTabSearch
