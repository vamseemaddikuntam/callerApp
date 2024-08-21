import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESEND_OTP_REQUEST,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  MODE_CHANGE_REQUEST,
  MODE_CHANGE_SUCCESS,
  MODE_CHANGE_FAILURE,
  LOGOUT,
} from '../types';
import {
  login as loginApi,
  signUp as signUpApi,
  updateProfile as updateProfileApi,
  verifyOtp as verifyOtpApi,
  resendOtp as resendOtpApi,
  modeChange as modeChangeApi,
} from '../../api/apiInstance';
import {Dispatch} from 'redux';

interface User {
  _id: string;
  username: string;
  email: string;
  ActiveMode: string;
  isActive?: boolean;
  sendOtp?: string;
  fullName?: string;
  mobileNo?: string;
}

interface LoginResponse {
  token: string;
  data: User;
}

interface ProfileUpdateData {
  username?: string;
  email?: string;
}

export const login =
  (loginInfo: {email: string; password?: string}) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({type: LOGIN_REQUEST});
    try {
      const response: LoginResponse = await loginApi(loginInfo);
      const {token, data} = response;
      const user: User = {
        _id: data._id,
        username: data.username,
        email: data.email,
        ActiveMode: data.ActiveMode,
      };
      dispatch({type: LOGIN_SUCCESS, payload: {user, accessToken: token}});
      return Promise.resolve();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      dispatch({type: LOGIN_FAILURE, payload: errorMessage});
      return Promise.reject(error);
    }
  };

export const signUp =
  (userInfo: {email: string; username: string}) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({type: SIGNUP_REQUEST});
    try {
      const response: LoginResponse = await signUpApi(userInfo);
      const {token, data} = response;
      const user: User = {
        _id: data._id,
        username: data.username,
        email: data.email,
        ActiveMode: data.ActiveMode,
        isActive: data.isActive,
        sendOtp: data.sendOtp,
      };
      dispatch({type: SIGNUP_SUCCESS, payload: {user, accessToken: token}});
      return Promise.resolve();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      dispatch({type: SIGNUP_FAILURE, payload: errorMessage});
      return Promise.reject(error);
    }
  };

export const updateProfile =
  (profileData: ProfileUpdateData) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({type: PROFILE_UPDATE_REQUEST});
    try {
      // Only send fields that are provided
      const response: {data: User} = await updateProfileApi(profileData);
      const {data} = response;
      const user: User = {
        _id: data._id,
        username: data.username,
        email: data.email,
        ActiveMode: data.ActiveMode,
      };
      dispatch({type: PROFILE_UPDATE_SUCCESS, payload: {user}});
      return Promise.resolve();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      dispatch({type: PROFILE_UPDATE_FAILURE, payload: errorMessage});
      return Promise.reject(error);
    }
  };

export const verifyOtp =
  (otp: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({type: VERIFY_OTP_REQUEST});
    try {
      const response = await verifyOtpApi(otp);
      const {data} = response;
      dispatch({type: VERIFY_OTP_SUCCESS, payload: data});
      return Promise.resolve();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      dispatch({type: VERIFY_OTP_FAILURE, payload: errorMessage});
      return Promise.reject(error);
    }
  };

export const resendOtp =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({type: RESEND_OTP_REQUEST});
    try {
      const response = await resendOtpApi();
      dispatch({type: RESEND_OTP_SUCCESS});
      return Promise.resolve(response);
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      dispatch({type: RESEND_OTP_FAILURE, payload: errorMessage});
      return Promise.reject(error);
    }
  };

export const modeChange =
  ({
    ExtensionNO,
    ExtensionPassword,
    RequestMode,
  }: {
    ExtensionNO?: number;
    ExtensionPassword?: string;
    RequestMode: string;
  }) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({type: MODE_CHANGE_REQUEST});
    try {
      const response = await modeChangeApi({
        ExtensionNO,
        ExtensionPassword,
        RequestMode,
      });
      const {data} = response;
      dispatch({type: MODE_CHANGE_SUCCESS, payload: data});
      return Promise.resolve();
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        errorMessage = (error as any).response?.data?.message || errorMessage;
      }
      dispatch({type: MODE_CHANGE_FAILURE, payload: errorMessage});
      return Promise.reject(error);
    }
  };

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
