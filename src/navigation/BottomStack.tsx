/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'react-native';
import History from '../screens/main/history';
import Contacts from '../screens/main/contacts';
import SettingsNavigation from './SettingStack';
import {SvgXml} from 'react-native-svg';
import historyIcon from '../assets/svg/history';
import settingsIcon from '../assets/svg/settings';
import {COLORS, FONTSIZE, tabBarHeight} from '../theme';
import focusedHistoryIcon from '../assets/svg/focusedHistory';
import focusedSettingsIcon from '../assets/svg/focusedSettings';
import PhoneDialer from '../screens/main/phoneDialer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CallScreen from '../screens/main/phoneDialer/callScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PhoneStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PhoneDialer" component={PhoneDialer} />
      <Stack.Screen name="CallScreen" component={CallScreen} />
    </Stack.Navigator>
  );
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.blue,
          height: tabBarHeight,
          position: 'absolute',
          bottom: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: FONTSIZE.size_16,
          fontWeight: 'bold',
          display: 'none',
        },
      }}>
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <SvgXml
                xml={focused ? focusedHistoryIcon : historyIcon}
                color={focused ? COLORS.whiteHex : COLORS.gray}
              />
              <Text style={{color: focused ? COLORS.whiteHex : COLORS.grayHex}}>
                History
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PhoneStack"
        component={PhoneStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.whiteHex : COLORS.grayHex,
                }}
                source={require('../assets/image/keypadIcon.png')}
              />
              <Text style={{color: focused ? COLORS.whiteHex : COLORS.grayHex}}>
                Keypad
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? COLORS.whiteHex : COLORS.grayHex,
                }}
                source={require('../assets/image/contacts.png')}
              />
              <Text style={{color: focused ? COLORS.whiteHex : COLORS.grayHex}}>
                Contacts
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <SvgXml
                xml={focused ? focusedSettingsIcon : settingsIcon}
                color={focused ? COLORS.whiteHex : COLORS.grayHex}
              />
              <Text style={{color: focused ? COLORS.whiteHex : COLORS.grayHex}}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
