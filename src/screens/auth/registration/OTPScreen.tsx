import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OTPInput from '../../../components/OTPInput';
import KeyboardAvoidingWrapper from '../../../utils/KeyboardAvoidingWrapper';
import callerLogo from '../../../assets/image/caller.png';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import FullScreenLoader from '../../../components/FullScreenLoader';
import {resendOtp, verifyOtp} from '../../../redux/actions/authActions';

const OTPScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const otpInputRef = useRef(null);

  const handleSubmitOTP = (otp: string) => {
    dispatch(verifyOtp({verifyOtp: otp}))
      .then(() => {
        navigation.navigate('ModeSelection');
      })
      .catch((error: {data: {message: string}}) => {
        Snackbar.show({
          text: error.data
            ? error?.data?.message
            : 'OTP verification failed. Please try again.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#FF5733',
        });
      });
  };

  const handleResendOtp = () => {
    dispatch(resendOtp())
      .then(response => {
        Snackbar.show({
          text: response.message
            ? response.message
            : 'OTP has been resent successfully.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#28A745',
        });
        otpInputRef.current?.resetTimer(); // Reset the timer on successful OTP resend
      })
      .catch((error: {data: {message: string}}) => {
        Snackbar.show({
          text: error.data
            ? error?.data?.message
            : 'Failed to resend OTP. Please try again.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#FF5733',
        });
      });
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      {loading && <FullScreenLoader />}
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Enter OTP</Text>
        <OTPInput
          onSubmit={handleSubmitOTP}
          resendOTP={handleResendOtp}
          ref={otpInputRef}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default OTPScreen;
