import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SVGGeo = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={6} height={8} fill="none">
    <Path
      fill="#000"
      d="M5.083 4.47a9.613 9.613 0 0 1-.98 1.535C3.759 6.453 3.39 6.882 3 7.29c-.39-.408-.759-.837-1.103-1.285a9.613 9.613 0 0 1-.98-1.535C.652 3.934.5 3.431.5 3a2.5 2.5 0 0 1 5 0c0 .431-.152.933-.417 1.47ZM3 8s3-2.843 3-5a3 3 0 1 0-6 0c0 2.157 3 5 3 5Z"
    />
    <Path
      fill="#000"
      d="M3 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 .5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
    />
  </Svg>
)
export default SVGGeo