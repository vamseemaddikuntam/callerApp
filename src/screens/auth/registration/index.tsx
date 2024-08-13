import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegistrationForm from '../../../components/RegistrationForm';

export default function Registration({ navigation }) {
  return (
    <View style={styles.container}>
      <RegistrationForm navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
