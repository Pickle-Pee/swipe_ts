import React, { ReactNode } from 'react';
import { Text } from 'native-base';
import { GradientBorderView } from '@good-react-native/gradient-border';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';

interface GradientButtonProps {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, onPress, disabled }) => {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const gradientColors = disabled ? ['#CCCCCC', '#CCCCCC'] : ['#F857A6', '#20BDFF'];

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handlePress}>
      <GradientBorderView
        gradientProps={{
          colors: gradientColors
        }}
        style={[
          styles.buttonContainer,
          {
            opacity: disabled ? 0.7 : 1
          }
        ]}
      >
        {children}
      </GradientBorderView>
    </TouchableOpacity>
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
