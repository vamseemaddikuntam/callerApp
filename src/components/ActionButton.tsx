import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {COLORS} from '../theme';

const ActionButton = ({title, onPress, disabled, fullWidth = true}) => {
  const {width: screenWidth} = Dimensions.get('window');
  const buttonWidth = fullWidth ? screenWidth : screenWidth * 0.5;

  return (
    <View
      style={[
        styles.buttonContainer,
        {width: buttonWidth},
        disabled && styles.disabled,
      ]}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ActionButton;
