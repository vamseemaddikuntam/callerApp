import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SIGN_UP_URL,
  VERIFY_OTP_URL,
  LOGIN_URL,
  MODE_THREE_URL,
  UPDATE_PASSWORD_URL,
  UPDATE_PROFILE_URL,
  UPDATE_SECURITY_QUESTIONS_URL,
  APP_BASE_URL,
} from './apiUrls';

const apiInstance = axios.create({
  baseURL: APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  async config => {
    console.log('config--->', config);
    if (config.url !== SIGN_UP_URL && config.url !== LOGIN_URL) {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

// API Functions
export const signUp = async userInfo => {
  try {
    const response = await apiInstance.post(SIGN_UP_URL, userInfo);
    const {token, data} = response.data;
    // Store the access token
    await AsyncStorage.setItem('accessToken', token);
    return {token, data};
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const verifyOtp = async otpInfo => {
  try {
    const response = await apiInstance.post(VERIFY_OTP_URL, otpInfo);
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const login = async loginInfo => {
  try {
    const response = await apiInstance.post(LOGIN_URL, loginInfo);
    const {token, data} = response?.data;
    await AsyncStorage.setItem('accessToken', token);
    return {token, data};
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const modeThree = async () => {
  try {
    const response = await apiInstance.post(MODE_THREE_URL);
    return response.data;
  } catch (error) {
    console.error('Error in modeThree:', error);
    throw error;
  }
};

// apiInstance.js
export const updateProfile = async profileData => {
  try {
    const response = await apiInstance.put(UPDATE_PROFILE_URL, profileData); // Adjust endpoint as necessary
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Update Password Function
export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiInstance.put(UPDATE_PASSWORD_URL, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const updateSecurityQuestions = async questions => {
  try {
    const response = await apiInstance.post(UPDATE_SECURITY_QUESTIONS_URL, {
      questions,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating security questions:', error);
    throw error;
  }
};
