import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CallModal = ({ visible, closeModal, startVoIPCall, startGSMCall, startVideoCall }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={startVoIPCall}>
              <Text style={styles.modalButtonText}>VoIP Call</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.modalButton} onPress={startGSMCall}>
              <Text style={styles.modalButtonText}>GSM Call</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.modalButton} onPress={startVideoCall}>
              <Text style={styles.modalButtonText}>Video Call</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cancelContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 10,
  },
  modalButton: {
    padding: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'blue',
  },
  cancelContainer: {
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'blue',
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default CallModal;
