import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgGeoBlack= () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
  >
    <G fill="#000" clipPath="url(#a)">
      <Path d="M10.645 7.822c-.458.93-1.08 1.856-1.715 2.687A27.547 27.547 0 0 1 7 12.757a27.543 27.543 0 0 1-1.93-2.248c-.636-.832-1.257-1.757-1.715-2.687-.464-.938-.73-1.818-.73-2.572a4.375 4.375 0 0 1 8.75 0c0 .754-.267 1.634-.73 2.572ZM7 14s5.25-4.975 5.25-8.75a5.25 5.25 0 1 0-10.5 0C1.75 9.025 7 14 7 14Z" />
      <Path d="M7 7a1.75 1.75 0 1 1 0-3.5A1.75 1.75 0 0 1 7 7Zm0 .875a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgGeoBlack