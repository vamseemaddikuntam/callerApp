import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LoginForm from '../../../components/LoginForm';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
       <StatusBar backgroundColor= '#4682B4'/>
      <LoginForm navigation={navigation} />
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
