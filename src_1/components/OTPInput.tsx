import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import ActionButton from './ActionButton';

const OTPInput = ({ onSubmit }) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus(); // Autofocus on the first input field
  }, []);

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      // Ensure only digits are allowed
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);

      // Move focus to the next input after entering a digit
      if (value.length === 1 && index < otpValues.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace') {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = ''; // Clear the current input field
      setOtpValues(updatedOtpValues);

      // Move focus to the previous input if deleting a digit
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmission = () => {
    const otp = otpValues.join('');
    onSubmit(otp); // Pass OTP to onSubmit function provided by parent component
  };

  const isInputFilled = otpValues.every(value => value.length === 1);

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otpValues.map((value, index) => (
          <TextInput
            key={index}
            style={styles.input}
            maxLength={1}
            value={value}
            onChangeText={text => handleInputChange(index, text)}
            onKeyPress={event => handleKeyPress(index, event)}
            keyboardType="numeric"
            ref={ref => (inputRefs.current[index] = ref)}
            autoFocus={index === 0} // Autofocus on the first input
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
      <ActionButton
        title="Submit OTP"
        onPress={handleSubmission}
        disabled={!isInputFilled}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 40,
    height: 40,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
});

export default OTPInput;
