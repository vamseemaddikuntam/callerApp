import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import ActionButton from './ActionButton';

const OTPInput = forwardRef(({onSubmit, resendOTP}, ref) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const timerRef = useRef(null);
  const inputRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    resetTimer: () => {
      setTimeRemaining(20);
      startTimer();
    },
  }));

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);

      if (value.length === 1 && index < otpValues.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace') {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = '';
      setOtpValues(updatedOtpValues);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmission = () => {
    const otp = otpValues.join('');
    onSubmit(otp);
  };

  const handleResendOTP = () => {
    setOtpValues(['', '', '', '', '', '']);
    resendOTP();
  };

  const isInputFilled = otpValues.every(value => value.length === 1);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timerText = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

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
            autoFocus={index === 0}
          />
        ))}
      </View>
      <Text style={styles.timerText}>Time remaining: {timerText}</Text>
      <View style={styles.buttonContainer}>
        <ActionButton
          title="Resend OTP"
          onPress={handleResendOTP}
          disabled={timeRemaining === 0 ? false : true}
          fullWidth={false}
        />
        <ActionButton
          title="Submit OTP"
          onPress={handleSubmission}
          disabled={!isInputFilled}
          fullWidth={false}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
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
  timerText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default OTPInput;
