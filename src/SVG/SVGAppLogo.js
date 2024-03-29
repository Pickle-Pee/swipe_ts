import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const SVGAppLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={44}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d="M22.542 0c5.696-.032 10.579 1.976 14.852 5.596.813.689.791 1.152.04 1.866a286.569 286.569 0 0 0-6.157 6.035c-.65.649-1.137.677-1.896.089-4.098-3.175-9.344-3.253-13.52-.271-3.99 2.85-5.532 7.968-3.637 12.673.544 1.348.385 2.186-.7 3.081-.963.796-1.827 1.716-2.684 2.622-1.093 1.155-1.1 2.682-.08 3.71 1.024 1.03 2.603 1.07 3.772 0 1.166-1.064 2.273-2.187 3.38-3.307.505-.514.926-.696 1.696-.35 4.207 1.877 8.194 1.43 11.842-1.38.72-.553 1.191-.492 1.79.104a372.877 372.877 0 0 0 6.255 6.134c.72.682.647 1.099-.058 1.766-6.712 6.356-18.268 7.494-26.466 2.557C-.809 33.842-3.605 18.722 5.043 8.157 9.49 2.725 15.41.036 22.542 0Z"
      />
      <Path
        fill="url(#c)"
        d="M29.156 21.076c0 .96-.348 1.787-1.042 2.458-1.68 1.633-3.344 3.285-5.02 4.922-.044.043-.088.085-.135.128a.478.478 0 0 1-.66.007c-.019-.017-.037-.032-.052-.05-1.626-1.597-3.253-3.199-4.883-4.793-.236-.232-.475-.453-.66-.728a3.308 3.308 0 0 1-.588-1.576 3.375 3.375 0 0 1 .344-1.92 3.453 3.453 0 0 1 1.442-1.483 3.56 3.56 0 0 1 1.993-.432 3.48 3.48 0 0 1 2.087.878c.233.203.429.431.6.685.04.06.061.05.094 0a3.51 3.51 0 0 1 1.753-1.363c.505-.186 1.024-.232 1.558-.186a3.423 3.423 0 0 1 1.87.757 3.376 3.376 0 0 1 1.3 2.7v-.004Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={0}
        x2={46.541}
        y1={43.994}
        y2={12.816}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E62885" />
        <Stop offset={0.911} stopColor="#009ADA" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={22.626}
        x2={22.626}
        y1={17.601}
        y2={28.72}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F857A6" />
        <Stop offset={1} stopColor="#FFC9E4" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h38v44H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SVGAppLogo
