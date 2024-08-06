import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OTPInput from '../../../components/OTPInput';
import KeyboardAvoidingWrapper from '../../../utils/KeyboardAvoidingWrapper';
import callerLogo from '../../../assets/image/caller.png';

const OTPScreen = ({ navigation }) => {
  const handleSubmitOTP = (otp) => {
    // Handle OTP submission logic here
    console.log('Submitted OTP:', otp);

    if (otp === '123456') {
      navigation.navigate('ModeSelection');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Enter OTP</Text>
        <OTPInput onSubmit={handleSubmitOTP} />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical:50,
  },
  innerContainer: {
    alignItems: 'center',
    flex:1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default OTPScreen;
