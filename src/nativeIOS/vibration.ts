import { NativeModules } from "react-native";

const {RTCVibrate}=NativeModules
export const vibrateShort:()=>void=RTCVibrate.vibrateShort
