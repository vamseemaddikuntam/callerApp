// PhoneDialer.js
import React, { useState } from 'react';
import { View, ScrollView, Alert , Linking} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Keypad from '../../../components/Keypad';
import CallModal from '../../../components/CallModal'; // Import the CallModal component
import useRequestPermissions from '../../../hooks/UseRequestPermissions';

const PhoneDialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const { requestPermissions } = useRequestPermissions();

  const handleCallButtonPress = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number.');
      return;
    }
    setShowModal(true); // Show the call options modal
  };

  const handleCall = async (type) => {
    setShowModal(false); // Close the modal

    if (type === 'gsm') {
      startGSMCall();
    } else {
      const hasPermissions = await requestPermissions();
      if (hasPermissions) {
        navigation.navigate('CallScreen', {
          callType: type,
          phoneNumber,
          profileImage: 'https://example.com/profile.jpg', // Replace with a real URL or local asset
        });
      } else {
        Alert.alert('Permissions required', 'Please grant the necessary permissions to make a call.');
      }
    }
  };

  const startGSMCall = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Error', 'Unable to make a GSM call. This device does not support it.');
        }
      })
      .catch((err) => console.error('Error opening URL', err));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Keypad
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleDelete={() => setPhoneNumber((prev) => prev.slice(0, -1))}
          handleCall={handleCallButtonPress} // Trigger the modal when the call button is pressed
          handlePress={(digit) => setPhoneNumber((prev) => prev + digit)}
        />
        <CallModal
          visible={showModal}
          closeModal={() => setShowModal(false)}
          startVoIPCall={() => handleCall('voip')}
          startVideoCall={() => handleCall('video')}
          startGSMCall={() => handleCall('gsm')}
        />
      </ScrollView>
    </View>
  );
};

export default PhoneDialer;
