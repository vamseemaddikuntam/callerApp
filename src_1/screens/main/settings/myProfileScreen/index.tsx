import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileForm from '../../../../components/ProfileForm';

export default function MyProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ProfileForm navigation={navigation} />
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



