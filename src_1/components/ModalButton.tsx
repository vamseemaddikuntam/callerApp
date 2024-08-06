import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ModalButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.modalButton} onPress={onPress}>
    <Text style={styles.modalButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modalButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'blue',
    fontSize: 18,
  },
});

export default ModalButton;
