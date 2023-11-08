import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGCancelVip = ({color="#000000"}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none">
    <Path
      fill={color}
      d="M17.175 15.45a1.221 1.221 0 0 1-1.727 1.727L9 10.727l-6.45 6.448a1.221 1.221 0 0 1-1.727-1.727L7.273 9 .826 2.55A1.22 1.22 0 0 1 2.552.823L9 7.273l6.45-6.45a1.221 1.221 0 0 1 1.727 1.726L10.727 9l6.448 6.45Z"
    />
  </Svg>
)
export default SVGCancelVip