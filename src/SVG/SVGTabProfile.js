import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGTabProfile = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M13 0a7.217 7.217 0 1 1-7.218 7.217A7.225 7.225 0 0 1 13 0Zm0 12.764a5.547 5.547 0 1 0-5.547-5.547A5.554 5.554 0 0 0 13 12.764Zm10.873 12.7-.412-2.285c-.936-4.993-5.262-8.722-10.459-8.722H13c-5.192 0-9.515 3.72-10.45 8.64l-.01.066-.41 2.28-1.647-.297.412-2.283c1.092-5.77 6.095-10.076 12.103-10.076 6.014 0 11.021 4.315 12.094 10.018l.012.076.413 2.288-1.644.296Z"
    />
  </Svg>
)
export default SVGTabProfile