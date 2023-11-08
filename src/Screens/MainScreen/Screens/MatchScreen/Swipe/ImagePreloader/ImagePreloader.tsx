import React, { FC, useState } from 'react';
import { View, Image, ActivityIndicator, Text, Dimensions, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ImagePreloader:FC<{source:string}> = ({source}) => {
    const wWidth=Dimensions.get("window").width
    const hHidth=Dimensions.get("window").height
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  console.log(`http://193.164.150.223:1024${source}`);
  return (
    <View style={{position:"absolute",top:0,borderRadius: 15,}}>
      {isLoading &&
         <ShimmerPlaceHolder
         style={{position:"absolute",top:0,borderRadius: 15,height:hHidth*0.73,width:wWidth-40,transform: [{ rotate: "0deg" }] }}
         location={[0.3, 0.5, 0.7]}
         width={wWidth-40}
         height={15}
         shimmerWidthPercent={0.7}
         contentStyle={{transform: [{ rotate: '0deg' }] }}
     />}
       <Image             
        style={{position:"absolute",top:0,borderRadius: 15}}
        height={hHidth*0.73}
        width={wWidth-40}
        source={{uri: `http://193.164.150.223:1024${source}`}}
        onLoad={handleImageLoad}
        />
    </View>
  );
};

export default ImagePreloader;
