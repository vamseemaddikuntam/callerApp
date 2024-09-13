import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomStack from './BottomStack';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      PhoneDialer: 'call/:callId',
      History: 'history',
    },
  },
};

const RootNavigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomStack" component={BottomStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
