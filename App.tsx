import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/navigation';
import {store, persistor} from './src/redux/store';
import useIncomingCallHandler from './src/hooks/UseIncomingCallHandler'; // Import the hook

export default function App() {
  useIncomingCallHandler(); // Handle incoming calls with deep linking

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{flex: 1}}>
          <RootNavigation />
        </View>
      </PersistGate>
    </Provider>
  );
}


// import React, { useEffect } from 'react';
// import { Alert, View, Text } from 'react-native';
// import JailMonkey from 'jail-monkey';
// import RootChecker from 'react-native-root-checker';

// const checkDeviceSecurity = async () => {
//   // Check using JailMonkey
//   RootChecker.isRootedByNativeRootCheck()
//   .then((isRooted) => {
//     console.log('isRooted--->',isRooted)
//     Alert.alert('Native Root Check', isRooted ? 'Device is rooted!' : 'Device is not rooted.');
//   })
//   .catch((error) => {
//     console.error('Error during Native Root Check:', error);
//   });

//   const isJailBroken = JailMonkey.isJailBroken();
//   console.log('isJailBroken || isRooted--->',isJailBroken)
 
//   if (isJailBroken) {
//     Alert.alert(
//       "Security Warning",
//       "Your device is rooted or jailbroken. Access is restricted for your security.",
//       [{ text: "OK", onPress: () => console.log("Access Restricted") }]
//     );
//     // Handle restricted access or limited functionality here
//   } else {
//     // Proceed with normal app functionality
//     console.log("Device is secure. Proceeding with app functionality.");
//   }
// };

// const App = () => {
//   useEffect(() => {
//     checkDeviceSecurity();
//   }, []);

//   return (
//     <View>
//       <Text>Welcome to the Secure App</Text>
//     </View>
//   );
// };

// export default App;
