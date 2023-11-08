import * as React from "react"
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGBunner_5Comment = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={93}
    height={97}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#77A1E2"
        d="M82.84 71.48c26.116 4.106 49.341-5.659 51.884-21.832 1.798-11.432-7.269-22.98-21.952-30.224l1.254-7.972c.347-2.204-1.749-4.002-3.875-3.324l-16.232 5.176c-.626-.114-1.228-.256-1.874-.357-26.116-4.107-49.342 5.658-51.885 21.83C37.617 50.95 56.724 67.374 82.84 71.48Z"
      />
    </G>
    <G clipPath="url(#b)" filter="url(#c)">
      <Path
        fill="#77A1E2"
        fillOpacity={0.2}
        d="M56.099-6.033C28.488-7.72 5.085 7.686 3.819 28.404c-.895 14.645 9.56 27.985 25.507 35.153l-.675 11.04c-.142 2.334 2.323 3.927 4.393 2.837L49.53 68.75c.662.06 1.303.158 1.986.2 27.611 1.687 51.014-13.72 52.281-34.437 1.266-20.719-20.087-38.86-47.698-40.547Z"
      />
      <G filter="url(#d)">
        <Circle
          cx={30.705}
          cy={30.335}
          r={7}
          fill="url(#e)"
          transform="rotate(-5.54 30.705 30.335)"
        />
      </G>
      <G filter="url(#f)">
        <Circle
          cx={52.602}
          cy={28.211}
          r={7}
          fill="url(#g)"
          transform="rotate(-5.54 52.602 28.21)"
        />
      </G>
      <G filter="url(#h)">
        <Circle
          cx={74.5}
          cy={26.087}
          r={7}
          fill="url(#i)"
          transform="rotate(-5.54 74.5 26.087)"
        />
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="e"
        x1={17.817}
        x2={44.758}
        y1={36.786}
        y2={28.348}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#77A1E2" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={15.98}
        x2={62.17}
        y1={37.005}
        y2={26.918}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#77A1E2" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={20.984}
        x2={86.742}
        y1={28.846}
        y2={24.173}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#77A1E2" />
        <Stop offset={1} stopColor="#fff" />
      </LinearGradient>
      <ClipPath id="a">
        <Path
          fill="#fff"
          d="m130.122 78.915-94.564-14.87L47.831-14 142.395.871z"
        />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="m6.11-9.088 99.977 6.11-6.11 99.977L0 90.89z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SVGBunner_5Comment
