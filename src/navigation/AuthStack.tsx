import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, Alert} from 'react-native';
import SplashScreen from '../screens/splash';
import Login from '../screens/auth/login';
import Registration from '../screens/auth/registration';
import OTPScreen from '../screens/auth/registration/OTPScreen';
import ModeSelection from '../screens/auth/mode/ModeSelection';
import ModeInputScreen from '../screens/auth/mode/ModeInputScreen';
import {COLORS} from '../theme';
import RNCallKeep from 'react-native-callkeep';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    const setupCallKeep = async () => {
      const options = {
        ios: {
          appName: 'GCMDialler',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription:
            'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
          imageName: 'phone_account_icon',
        },
      };
      RNCallKeep.setup(options);
      RNCallKeep.setAvailable(true);

      if (Platform.OS === 'android') {
        // Request runtime permissions
        const permissions = [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ];

        const statuses = await Promise.all(
          permissions.map(permission => request(permission)),
        );

        statuses.forEach((status, index) => {
          if (status !== RESULTS.GRANTED) {
            Alert.alert(
              'Permission Required',
              `The following permission is needed: ${permissions[index]}`,
            );
          }
        });
      }
    };

    setupCallKeep();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.blue,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ModeSelection" component={ModeSelection} />
      <Stack.Screen name="ModeInputScreen" component={ModeInputScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
