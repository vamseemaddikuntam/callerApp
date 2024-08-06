import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const PermissionsSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dialogLabel, setDialogLabel] = useState('');

  const permissions = [
    { name: 'headset-outline', label: 'Voice Calls Allowed' },
    { name: 'people-outline', label: 'Voice Conferencing Allowed' },
    { name: 'videocam-outline', label: 'Video Calls Allowed' },
    { name: 'call-outline', label: 'GSM Calls Allowed' },
  ];

  const handleIconPress = (label) => {
    setDialogLabel(label);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allowed Permissions</Text>
      <View style={styles.permissionsContainer}>
        {permissions.map((permission) => (
          <TouchableOpacity key={permission.name} onPress={() => handleIconPress(permission.label)}>
            <Icon name={permission.name} size={30} color="#0096FF" />
          </TouchableOpacity>
        ))}
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.dialogTitle}>{dialogLabel}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensure icons are spaced out properly
    marginBottom: 20,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center the title text
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionsSection;
