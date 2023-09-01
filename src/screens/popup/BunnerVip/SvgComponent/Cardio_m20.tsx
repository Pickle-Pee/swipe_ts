//@ts-nocheck

import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, LinearGradient, Stop } from "react-native-svg"


const SvgCardio_m20 = () => (
  <Svg
                                    
      width={65}
      height={61}
      fill="none"
  >
      <Path
      fill="url(#a)"
      d="M62.797 35.376c-7.431 19.803-41.644 25.25-43.093 25.461a2.247 2.247 0 0 1-2.06-.773C16.693 58.952-5.49 32.342 1.942 12.54 3.69 7.891 7.14 4.1 11.53 1.996 15.924-.107 20.9-.35 25.368 1.321c5.61 2.105 9.579 6.46 11.047 11.856 4.656-3.097 10.51-3.766 16.12-1.66 4.464 1.68 8.052 5.136 9.976 9.61 1.923 4.473 2.027 9.597.287 14.25Z"
      />
      <Defs>
      {/* @ts-ignore */}
      <LinearGradient
          id="a"
          x1={38.95}
          x2={18.573}
          y1={6.419}
          y2={60.721}
          gradientUnits="userSpaceOnUse"
      >
          <Stop stopColor="#F857A6" />
          <Stop offset={1} stopColor="#FFC9E4" />
      </LinearGradient>
      </Defs>
  </Svg>
)
export default SvgCardio_m20
