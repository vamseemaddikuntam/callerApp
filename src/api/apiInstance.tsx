import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SIGN_UP_URL,
  VERIFY_OTP_URL,
  LOGIN_URL,
  MODE_CHANGE,
  UPDATE_PASSWORD_URL,
  UPDATE_PROFILE_URL,
  UPDATE_SECURITY_QUESTIONS_URL,
  APP_BASE_URL,
  RESEND_OTP_URL,
} from './apiUrls';
import {string} from 'yup';

const apiInstance = axios.create({
  baseURL: APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  async config => {
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

// Response Interceptor
apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access - redirecting to login...');
    }
    return Promise.reject(error.response);
  },
);

// API Functions
export const login = async loginInfo => {
  try {
    const response = await apiInstance.post(LOGIN_URL, loginInfo);
    const {token, data} = response?.data;
    await AsyncStorage.setItem('accessToken', token);
    return {token, data};
  } catch (error) {
    throw error;
  }
};

export const signUp = async userInfo => {
  try {
    const response = await apiInstance.post(SIGN_UP_URL, userInfo);
    const {token, data} = response.data;
    await AsyncStorage.setItem('accessToken', token);
    return {token, data};
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async otpInfo => {
  try {
    const response = await apiInstance.post(VERIFY_OTP_URL, otpInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async () => {
  try {
    const response = await apiInstance.post(RESEND_OTP_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const modeChange = async modeInfo => {
  try {
    const response = await apiInstance.post(MODE_CHANGE, modeInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// apiInstance.js
export const updateProfile = async profileData => {
  try {
    const response = await apiInstance.post(UPDATE_PROFILE_URL, profileData);
    return response.data;
  } catch (error) {
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
