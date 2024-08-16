import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../screens/main/settings';
import MyProfileScreen from '../screens/main/settings/myProfileScreen';
import ChangePasswordScreen from '../screens/main/settings/changePasswordScreen';
import ChangeSecurityScreen from '../screens/main/settings/changeSecurityScreen';
import AboutUsScreen from '../screens/main/settings/aboutUsScreen';
import ContactUsScreen from '../screens/main/settings/contactUsScreen';
import LogoutScreen from '../screens/main/settings/logoutScreen';

const Stack = createNativeStackNavigator();

export default function SettingsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#6495ED',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          title: 'My Profile',
          headerStyle: {
            backgroundColor: '#6495ED',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="ChangeSecurityScreen"
        component={ChangeSecurityScreen}
      />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
    </Stack.Navigator>
  );
}
