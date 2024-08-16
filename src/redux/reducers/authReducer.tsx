import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  VERIFY_OTP_REQUEST,
  RESEND_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  RESEND_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  RESEND_OTP_FAILURE,
} from '../types';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case VERIFY_OTP_REQUEST:
    case RESEND_OTP_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return {...state, loading: true, error: null};
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {...state, user: action.payload.user, loading: false};
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case VERIFY_OTP_FAILURE:
    case RESEND_OTP_FAILURE:
    case PROFILE_UPDATE_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default authReducer;
