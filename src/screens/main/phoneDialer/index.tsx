import React, { useState } from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import Keypad from '../../../components/Keypad';
import CallModal from '../../../components/CallModal';
import WebRTCCall from '../../../components/WebRTCCall';

const PhoneDialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [callType, setCallType] = useState(null);

  const handlePress = (digit) => {
    setPhoneNumber((prev) => prev + digit);
  };

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  const handleCall = (type) => {
    if (phoneNumber.length === 0) {
      Alert.alert("Error", "Please enter a phone number.");
    } else {
      setCallType(type);
      setShowModal(true);  // Ensure the modal state is set to true
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const startVoIPCall = () => {
    Alert.alert("Starting VoIP Call...");
  };

  const startGSMCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(err => console.error('Error:', err));
  };

  const startVideoCall = () => {
    Alert.alert("Starting Video Call...");
  };

  return (
    <View style={styles.container}>
      <Keypad
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleDelete={handleDelete}
        handleCall={() => handleCall('gsm')}
        handlePress={handlePress}
      />
      <CallModal
        visible={showModal}
        closeModal={closeModal}
        startVoIPCall={startVoIPCall}
        startGSMCall={startGSMCall}
        startVideoCall={startVideoCall}
      />
      {callType === 'voip' && showModal && (
        <WebRTCCall closeModal={closeModal} phoneNumber={phoneNumber} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default PhoneDialer;
