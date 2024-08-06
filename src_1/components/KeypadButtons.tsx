import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const KeypadButton = ({ onPress, digit, letters }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{digit}</Text>
    {letters && <Text style={styles.letters}>{letters}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6495ED',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#6495ED',
  },
  letters: {
    fontSize: 10,
    color: '#6495ED',
  },
});

export default KeypadButton;
