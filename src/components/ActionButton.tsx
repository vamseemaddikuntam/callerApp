import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme';

const { width: screenWidth } = Dimensions.get('window');
const buttonWidth = screenWidth * 0.9;

const ActionButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width: buttonWidth }, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    paddingVertical: 15,
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
