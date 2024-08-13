
// authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAILURE } from '../types';

const initialState = {
  user: null,
  accessToken: null,
  error: null,
};
console.log('initialState-->',initialState)
const authReducer = (state = initialState, action) => {
  console.log('action--->', action)
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };
    case PROFILE_UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
