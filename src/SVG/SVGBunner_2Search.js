import * as React from "react"
import Svg, { Path, G, Circle, Mask, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGBunner_2Search = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={101}
    height={125}
    fill="none"
    {...props}
  >
    <Path
      fill="#9AAAB4"
      d="m80.65 12.852 5.65 6.497-11.373 9.888-5.65-6.497 11.373-9.888Z"
    />
    <Path
      fill="#66757F"
      d="M91.34-2.143 77.832 9.6a4.304 4.304 0 0 0-.425 6.073l5.65 6.497a4.304 4.304 0 0 0 6.072.424l13.507-11.742a8.61 8.61 0 0 0 .849-12.15c-3.118-3.585-8.558-3.963-12.147-.845Z"
    />
    <Path
      fill="#8899A6"
      d="M84.007 42.87c1.118-16.01-10.955-29.897-26.966-31.015-16.01-1.119-29.897 10.954-31.016 26.965C24.907 54.83 36.98 68.717 52.991 69.836 69 70.954 82.888 58.882 84.007 42.87Z"
    />
    <Path
      fill="#BBDDF5"
      d="M75.417 42.27c.787-11.267-7.709-21.039-18.976-21.826-11.267-.787-21.039 7.709-21.826 18.976-.787 11.267 7.709 21.039 18.976 21.826 11.267.787 21.039-7.709 21.826-18.976Z"
    />
    <G filter="url(#a)">
      <G filter="url(#b)">
        <Path
          fill="#C6DBEB"
          fillOpacity={0.64}
          d="m67.862 85.9-6.11 6.064L51.135 81.27l6.11-6.065L67.863 85.9Z"
        />
      </G>
      <G filter="url(#c)">
        <Path
          fill="#A9B0B5"
          fillOpacity={0.2}
          d="M83.53 95.575 70.921 82.873a4.304 4.304 0 0 0-6.088-.022l-6.11 6.065a4.304 4.304 0 0 0-.022 6.088l12.609 12.702a8.61 8.61 0 0 0 12.18.045c3.37-3.348 3.388-8.8.04-12.176Z"
        />
      </G>
    </G>
    <G filter="url(#d)">
      <Circle
        cx={39}
        cy={61}
        r={18}
        fill="#0095FF"
        fillOpacity={0.11}
        shapeRendering="crispEdges"
      />
    </G>
    <G filter="url(#e)">
      <Mask id="f" fill="#fff">
        <Path d="M68.12 61.06c0 16.05-13.01 29.06-29.06 29.06C23.01 90.12 10 77.11 10 61.06 10 45.01 23.01 32 39.06 32c16.05 0 29.06 13.01 29.06 29.06Zm-46.496 0c0 9.63 7.806 17.436 17.436 17.436 9.63 0 17.436-7.806 17.436-17.436 0-9.63-7.806-17.436-17.436-17.436-9.63 0-17.436 7.806-17.436 17.436Z" />
      </Mask>
      <Path
        fill="#BCCDDA"
        fillOpacity={0.29}
        d="M68.12 61.06c0 16.05-13.01 29.06-29.06 29.06C23.01 90.12 10 77.11 10 61.06 10 45.01 23.01 32 39.06 32c16.05 0 29.06 13.01 29.06 29.06Zm-46.496 0c0 9.63 7.806 17.436 17.436 17.436 9.63 0 17.436-7.806 17.436-17.436 0-9.63-7.806-17.436-17.436-17.436-9.63 0-17.436 7.806-17.436 17.436Z"
        shapeRendering="crispEdges"
      />
      <Path
        stroke="#000"
        strokeOpacity={0.07}
        strokeWidth={0.4}
        d="M68.12 61.06c0 16.05-13.01 29.06-29.06 29.06C23.01 90.12 10 77.11 10 61.06 10 45.01 23.01 32 39.06 32c16.05 0 29.06 13.01 29.06 29.06Zm-46.496 0c0 9.63 7.806 17.436 17.436 17.436 9.63 0 17.436-7.806 17.436-17.436 0-9.63-7.806-17.436-17.436-17.436-9.63 0-17.436 7.806-17.436 17.436Z"
        mask="url(#f)"
        shapeRendering="crispEdges"
      />
    </G>
    <Defs></Defs>
  </Svg>
)
export default SVGBunner_2Search
