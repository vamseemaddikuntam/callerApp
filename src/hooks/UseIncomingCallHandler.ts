import messaging from '@react-native-firebase/messaging';
import {Linking} from 'react-native';
import {useEffect} from 'react';

const useIncomingCallHandler = () => {
  useEffect(() => {
    // Handle incoming messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {type, callId} = remoteMessage.data;

      // Construct the deep link based on call type
      if (type === 'incomingCall') {
        const deepLinkUrl = `myapp://call/${callId}`; // Navigate to PhoneDialer
        Linking.openURL(deepLinkUrl);
      } else if (type === 'missedCall') {
        const deepLinkUrl = 'myapp://history'; // Navigate to History screen
        Linking.openURL(deepLinkUrl);
      }
    });

    // Handle notifications received when the app is in the background
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const {type, callId} = remoteMessage.data;

      if (type === 'incomingCall') {
        const deepLinkUrl = `myapp://call/${callId}`;
        Linking.openURL(deepLinkUrl);
      } else if (type === 'missedCall') {
        const deepLinkUrl = 'myapp://history';
        Linking.openURL(deepLinkUrl);
      }
    });

    // Cleanup the listener on component unmount
    return unsubscribe;
  }, []);
};

export default useIncomingCallHandler;
