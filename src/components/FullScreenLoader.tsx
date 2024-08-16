import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS} from '../theme'; // Adjust path as necessary

const FullScreenLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default FullScreenLoader;
