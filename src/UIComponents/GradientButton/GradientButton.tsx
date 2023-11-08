import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ViewStyle, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientBorder from '../GradientBorder/GradientBorder';

interface GradientButtonProps {
  children: ReactNode;
  onPress: () => void;
  active?: boolean;
  p?:boolean;
  br?:number;
  wid?:number;
  
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, onPress, active=true,p=true,br=30,wid=1 }) => {
  const handlePress = () => {
    if (active) {
      onPress();
    }
  };
  console.log(wid);

  return (
    <Pressable
      disabled={!active}
      style={{width:'100%',overflow:'hidden'}}
      onPress={handlePress}>
        <GradientBorder 
        style={{paddingVertical:p?8:0,width:"100%",alignItems:'center'}}
        active={active}
        br={br}
        wid={wid}
        >
              {children}
        </GradientBorder>
      
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 20,
    width: 285,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default GradientButton;
