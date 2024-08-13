import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or any other icon set

const Keypad = ({ phoneNumber, setPhoneNumber, handleDelete, handleCall, handlePress }) => {
  const renderButton = (digit, letters) => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(digit)} key={digit}>
      <Text style={styles.buttonText}>{digit}</Text>
      {letters && <Text style={styles.letters}>{letters}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      <View style={styles.row}>
        {renderButton('1', '')}
        {renderButton('2', 'ABC')}
        {renderButton('3', 'DEF')}
      </View>
      <View style={styles.row}>
        {renderButton('4', 'GHI')}
        {renderButton('5', 'JKL')}
        {renderButton('6', 'MNO')}
      </View>
      <View style={styles.row}>
        {renderButton('7', 'PQRS')}
        {renderButton('8', 'TUV')}
        {renderButton('9', 'WXYZ')}
      </View>
      <View style={styles.row}>
        {renderButton('*', '')}
        {renderButton('0', '+')}
        {renderButton('#', '')}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={handleCall}>
          <Icon name="call" size={30} color="#fff" />
        </TouchableOpacity>
        {phoneNumber.length > 0 && (
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Icon name="backspace" size={30} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  phoneNumber: {
    fontSize: 32,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6495ED',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#6495ED',
  },
  letters: {
    fontSize: 10,
    color: '#6495ED',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: 'green',
  },
});

export default Keypad;
