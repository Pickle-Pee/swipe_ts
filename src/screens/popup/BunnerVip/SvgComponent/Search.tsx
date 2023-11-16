//@ts-nocheck

import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"


const SvgSearch = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={54}
    height={54}
    fill="none"
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M21.42 2.141c-1.218-.044-1.829-.02-2.951.132-2.166.29-4.445 1.126-6.354 2.324-1.137.71-2.704 1.99-3.565 2.903a16.895 16.895 0 0 0-3.053 4.62c-.688 1.58-.924 2.365-1.196 4.008-.369 2.21-.388 3.872-.065 5.855.486 3.002 1.867 5.865 4.04 8.391 1.687 1.959 3.805 3.461 6.369 4.505 1.13.464 2.035.683 3.756.92 1.724.24 2.724.273 3.927.142 2.043-.223 4.344-.896 6.037-1.772l.49-.255.197.246c.11.129 1.86 2.31 3.894 4.841 5.706 7.105 6.71 8.35 7.855 9.767 1.297 1.597 2.91 3.56 3.242 3.928.811.93 2.316.747 3.032-.364.33-.514.397-1.239.163-1.712-.13-.261-1.406-1.974-2.61-3.504-.616-.784-2.906-3.66-5.09-6.385-5.604-6.997-6.926-8.696-7.15-9.164l-.1-.202.24-.25c2.234-2.342 3.66-4.822 4.338-7.534.242-.973.554-2.947.614-3.871.148-2.379-.349-5.13-1.32-7.376-1.337-3.085-3.722-5.913-6.442-7.632-1.35-.861-2.85-1.55-4.107-1.887-.561-.152-3.685-.653-4.191-.674Zm2.412 2.386c1.56.335 2.775.79 4.096 1.543 4.525 2.574 7.34 7.222 7.51 12.406.036 1.046.005 1.552-.148 2.656-.165 1.192-.283 1.691-.643 2.737-.442 1.282-.95 2.298-1.757 3.5-.944 1.41-1.96 2.485-3.355 3.551-1.523 1.163-3.15 1.984-4.881 2.468-2.369.664-4.515.71-7.113.161a13.482 13.482 0 0 1-3.66-1.324c-.722-.377-1.953-1.212-2.575-1.744a15.08 15.08 0 0 1-5.263-10.945c-.048-1.459.312-3.739.839-5.357.649-2.002 2.102-4.26 3.77-5.873.605-.586 1.967-1.622 2.682-2.043 1.933-1.126 3.806-1.75 6.03-2.002.632-.071 1.583-.118 1.948-.097.495.028 1.897.232 2.52.363Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="m6.512 0 47.086 6.512-6.512 47.086L0 47.086z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgSearch