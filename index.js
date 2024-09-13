/**
 * @format
 */
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import VoipPushNotification from 'react-native-voip-push-notification';
import {name as appName} from './app.json';

// Register background handler
VoipPushNotification.addEventListener('register', token => {
  console.log('APNs Token:', token);
});

VoipPushNotification.addEventListener('notification', notification => {
  console.log('VoIP Notification:', notification);
  VoipPushNotification.onVoipNotificationCompleted(notification.uuid);
});

AppRegistry.registerComponent(appName, () => App);

// import { AppRegistry, StatusBar, Linking, Platform } from "react-native";
// import App from "./App";
// import { name as appName } from "./app.json";
// import { register } from "@videosdk.live/react-native-sdk";
// import colors from "./src/styles/colors";
// import messaging from "@react-native-firebase/messaging";
// import React from "react";
// import Incomingvideocall from "./src/utils/incoming-video-call";
// import { updateCallStatus } from "./src/api/api";

// Platform.OS == "android" && StatusBar.setBackgroundColor(colors.primary[900]);

// // Register the VideoSDK service
// register();

// const firebaseListener = async (remoteMessage) => {
//   const { callerInfo, videoSDKInfo, type } = JSON.parse(
//     remoteMessage.data.info
//   );

//   if (type === "CALL_INITIATED") {
//     const incomingCallAnswer = ({ callUUID }) => {
//       Incomingvideocall.backToForeground();
//       updateCallStatus({
//         callerInfo,
//         type: "ACCEPTED",
//       });
//       Incomingvideocall.endIncomingcallAnswer(callUUID);
//       Linking.openURL(
//         `videocalling://meetingscreen/${videoSDKInfo.token}/${videoSDKInfo.meetingId}`
//       ).catch((err) => {
//         Toast.show(`Error`, err);
//       });
//     };

//     const endIncomingCall = () => {
//       Incomingvideocall.endIncomingcallAnswer();
//       updateCallStatus({ callerInfo, type: "REJECTED" });
//     };

//     Incomingvideocall.configure(incomingCallAnswer, endIncomingCall);
//     Incomingvideocall.displayIncomingCall(callerInfo.name);
//     Incomingvideocall.backToForeground();
//   }
// };

// // Register background handler
// messaging().setBackgroundMessageHandler(firebaseListener);

// function HeadlessCheck({ isHeadless }) {
//   if (isHeadless) {
//     // App has been launched in the background by iOS, ignore
//     return null;
//   }

//   return <App />;
// }

// AppRegistry.registerComponent(appName, () => HeadlessCheck);
