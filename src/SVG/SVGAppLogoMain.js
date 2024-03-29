import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const SVGAppLogoMain = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={88}
    height={103}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d="M52.201 0c13.191-.075 24.5 4.626 34.395 13.1 1.883 1.612 1.833 2.697.092 4.367-4.834 4.626-9.567 9.36-14.258 14.128-1.505 1.52-2.632 1.586-4.39.209-9.491-7.431-21.64-7.615-31.308-.635-9.24 6.671-12.813 18.653-8.424 29.666 1.26 3.156.89 5.118-1.623 7.214-2.228 1.862-4.229 4.016-6.213 6.137-2.53 2.705-2.548 6.279-.185 8.683 2.37 2.413 6.028 2.505 8.735 0 2.699-2.488 5.263-5.118 7.828-7.74 1.168-1.202 2.143-1.628 3.926-.818C50.52 78.703 59.75 77.66 68.2 71.08c1.664-1.294 2.757-1.152 4.144.242 4.784 4.826 9.585 9.644 14.486 14.361 1.665 1.595 1.497 2.572-.134 4.133-15.545 14.879-42.306 17.543-61.29 5.987C-1.875 79.22-8.349 43.827 11.677 19.096 21.978 6.379 35.69.084 52.202 0Z"
      />
      <Path
        fill="url(#c)"
        d="M67.52 49.338c0 2.246-.807 4.183-2.413 5.752-3.893 3.824-7.743 7.69-11.628 11.523-.1.1-.201.2-.31.3a1.1 1.1 0 0 1-1.53.017c-.043-.042-.085-.075-.119-.117-3.766-3.74-7.533-7.49-11.308-11.222-.546-.542-1.1-1.06-1.53-1.703-.756-1.119-1.236-2.338-1.362-3.69-.16-1.57.084-3.081.8-4.492a8.046 8.046 0 0 1 3.337-3.474c1.437-.801 2.984-1.119 4.615-1.01 1.842.133 3.456.835 4.835 2.054.538.476.992 1.01 1.387 1.603.092.142.143.117.219 0 1-1.503 2.362-2.563 4.06-3.19 1.169-.434 2.371-.542 3.607-.434a7.88 7.88 0 0 1 4.33 1.77c1.63 1.328 2.614 3.023 2.934 5.102.059.4.076.81.076 1.219v-.008Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={0}
        x2={108.497}
        y1={102.987}
        y2={31.084}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={52.397}
        x2={52.397}
        y1={41.201}
        y2={67.232}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F857A6" />
        <Stop offset={1} stopColor="#FFC9E4" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h88v103H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SVGAppLogoMain
