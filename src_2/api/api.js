/* eslint-disable prettier/prettier */
const API_BASE_URL = 'https://api.videosdk.live/v2';
const VIDEOSDK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYjc1ZDY0Ny03NmU0LTQyYjktOGE4OS0zM2JmYTRlMzNiYjQiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMjk1MDc3OCwiZXhwIjoxNzU0NDg2Nzc4fQ.YSfzRjINmf9QvlGynCLj_Yt4ttMoDpi_L4U24uCOzvI';

const FCM_SERVER_URL = 'http://192.168.1.9:9000';

export const getToken = () => {
  return VIDEOSDK_TOKEN;
};

export const createMeeting = async ({token}) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: 'POST',
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  };

  const {roomId} = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error('error', error));
  console.log('roomID-->', roomId);
  return roomId;
};

export const initiateCall = async ({callerInfo, calleeInfo, videoSDKInfo}) => {
  console.log(
    '  callerInfo,calleeInfo,videoSDKInfo,--->',
    callerInfo,
    calleeInfo,
    videoSDKInfo,
  );
  await fetch(`${FCM_SERVER_URL}/initiate-call`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      callerInfo,
      calleeInfo,
      videoSDKInfo,
    }),
  })
    .then(response => {
      console.log(' RESP--->', response);
    })
    .catch(error => console.error('error--->', error));
};

export const updateCallStatus = async ({callerInfo, type}) => {
  await fetch(`${FCM_SERVER_URL}/update-call`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      callerInfo,
      type,
    }),
  })
    .then(response => {
      console.log('##RESP', response);
    })
    .catch(error => console.error('error', error));
};
