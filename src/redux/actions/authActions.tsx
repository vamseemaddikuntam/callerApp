// authActions.js
import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
} from '../types';
import {
  login as loginApi,
  signUp as signUpApi,
  updateProfile as updateProfileApi,
} from '../../api/apiInstance';

export const login = loginInfo => async dispatch => {
  try {
    const response = await loginApi(loginInfo);
    const {token, data} = response;
    const user = {
      _id: data._id,
      username: data.username,
      email: data.email,
      role: data.role,
    };
    dispatch({type: LOGIN_SUCCESS, payload: {user, accessToken: token}});
    return Promise.resolve();
  } catch (error) {
    const tempData = {
      user: {
        _id: 'temp_id',
        username: 'tempuser',
        email: 'temp_email@example.com',
        role: 'mode_1',
      },
      accessToken: 'temporary_token',
      errorMessage:
        error.response?.data?.message || 'An unexpected error occurred.',
    };
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {user: tempData?.user, accessToken: tempData?.accessToken},
    });
    // dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
    return Promise.reject(error);
  }
};

export const signUp = userInfo => async dispatch => {
  try {
    const response = await signUpApi(userInfo);
    const {token, data} = response;
    const user = {
      _id: data._id,
      username: data.username,
      email: data.email,
      role: data.role,
      isActive: data.IsActive,
      sendOtp: data.sendOtp,
    };
    dispatch({type: SIGNUP_SUCCESS, payload: {user, accessToken: token}});
    return Promise.resolve();
  } catch (error) {
    const tempData = {
      user: {
        _id: 'temp_id',
        username: 'tempuser',
        email: 'temp_email@example.com',
        role: 'mode_1',
        isActive: true,
        sendOtp: '123456',
      },
      accessToken: 'temporary_token',
      errorMessage:
        error.response?.data?.message || 'An unexpected error occurred.',
    };
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {user: tempData?.user, accessToken: tempData?.accessToken},
    });
    // dispatch({ type: SIGNUP_FAILURE, payload: error.response.data });
    return Promise.reject(error);
  }
};

export const updateProfile = profileData => async dispatch => {
  try {
    const response = await updateProfileApi(profileData);
    const {data} = response;
    const user = {
      _id: data._id,
      username: data.username,
      email: data.email,
      role: data.role,
      fullName: data.fullName,
      mobileNo: data.mobileNo,
    };
    dispatch({type: PROFILE_UPDATE_SUCCESS, payload: {user}});
  } catch (error) {
    dispatch({type: PROFILE_UPDATE_FAILURE, payload: error.response.data});
  }
};
