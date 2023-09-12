import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgChevronLeft = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={20}
    fill="none"

  >
    <Path
      stroke="#C9CACA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m8 1-7 9.25L8 19"
    />
  </Svg>
)
export default SvgChevronLeft
