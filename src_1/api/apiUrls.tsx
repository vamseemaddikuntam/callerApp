// apiUrls.js
export const API_BASE_URL = "http://api/gcm";
export const VIDEO_SDK_URL = "https://api.videosdk.live/v2";

// Auth Endpoints
export const SIGN_UP_URL = `${API_BASE_URL}/signup`;
export const VERIFY_OTP_URL = `${API_BASE_URL}/verifyOtp`;
export const LOGIN_URL = `${API_BASE_URL}/login`;

// Call Endpoints
export const INITIATE_CALL_URL = `${API_BASE_URL}/initiate-call`;
export const UPDATE_CALL_STATUS_URL = `${API_BASE_URL}/update-call`;

export const MODE_THREE_URL = `${API_BASE_URL}/ModeThree`;
export const UPDATE_PASSWORD_URL = `${API_BASE_URL}/UpdatePassword`;
export const UPDATE_PROFILE_URL = `${API_BASE_URL}/UpdateProfile`;
export const UPDATE_SECURITY_QUESTIONS_URL = `${API_BASE_URL}/UpdateSecurityQuestions`;
// Video SDK Endpoint
export const CREATE_MEETING_URL = `${VIDEO_SDK_URL}/rooms`;
