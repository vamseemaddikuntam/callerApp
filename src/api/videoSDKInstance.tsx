import axios from 'axios';
import {
  INITIATE_CALL_URL,
  UPDATE_CALL_STATUS_URL,
  CREATE_MEETING_URL,
} from './apiUrls';

// Create videoSDKInstance
const videoSDKInstance = axios.create({
  baseURL: CREATE_MEETING_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token for videoSDKInstance
videoSDKInstance.interceptors.request.use(
  (config) => {
    const token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYjc1ZDY0Ny03NmU0LTQyYjktOGE4OS0zM2JmYTRlMzNiYjQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMjkyMDAzMiwiZXhwIjoxNzU0NDU2MDMyfQ.HNeYsZcay31t3AfACr_-diJRckOXFcqxY2OBF-bk2yw';;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Functions
// export const createMeeting = async () => {
//   try {
//     const response = await videoSDKInstance.post('');
//     return response.data.roomId;
//   } catch (error) {
//     console.error("Error creating meeting:", error);
//     throw error;
//   }
// };

// export const initiateCall = async (callerInfo, calleeInfo, videoSDKInfo) => {
//   try {
//     const response = await videoSDKInstance.post(INITIATE_CALL_URL, { callerInfo, calleeInfo, videoSDKInfo });
//     console.log("Initiate Call Response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error initiating call:", error);
//     throw error;
//   }
// };

// export const updateCallStatus = async (callerInfo, type) => {
//   try {
//     const response = await videoSDKInstance.post(UPDATE_CALL_STATUS_URL, { callerInfo, type });
//     console.log("Update Call Status Response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating call status:", error);
//     throw error;
//   }
// };


const API_BASE_URL = "https://api.videosdk.live/v2";
const VIDEOSDK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYjc1ZDY0Ny03NmU0LTQyYjktOGE4OS0zM2JmYTRlMzNiYjQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMjkyMDAzMiwiZXhwIjoxNzU0NDU2MDMyfQ.HNeYsZcay31t3AfACr_-diJRckOXFcqxY2OBF-bk2yw';

const FCM_SERVER_URL = "http://192.168.1.10:9000";

export const getToken = () => {
  return VIDEOSDK_TOKEN;
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));

  return roomId;
};

export const initiateCall = async ({
  callerInfo,
  calleeInfo,
  videoSDKInfo,
}) => {
  await fetch(`${FCM_SERVER_URL}/initiate-call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callerInfo,
      calleeInfo,
      videoSDKInfo,
    }),
  })
    .then((response) => {
      console.log(" RESP", response);
    })
    .catch((error) => console.error("error", error));
};

export const updateCallStatus = async ({ callerInfo, type }) => {
  await fetch(`${FCM_SERVER_URL}/update-call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callerInfo,
      type,
    }),
  })
    .then((response) => {
      console.log("##RESP", response);
    })
    .catch((error) => console.error("error", error));
};
