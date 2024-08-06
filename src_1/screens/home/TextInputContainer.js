import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextInputContainer = ({ title, placeholder, onChangeText, value, keyboardType, maxLength }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    color: '#D0D4DD',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1A1C22',
    color: '#FFF',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});

export default TextInputContainer;
