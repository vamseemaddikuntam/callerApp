// KeyboardAvoidingWrapper.js

import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

const KeyboardAvoidingWrapper = ({ children, style, behavior, keyboardVerticalOffset, imageSource }) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={behavior || (Platform.OS === 'ios' ? 'padding' : 'height')}
      keyboardVerticalOffset={keyboardVerticalOffset || (Platform.OS === 'ios' ? 64 : 0)}
    >
      <View style={styles.innerContainer}>
        {imageSource && <Image source={imageSource} style={styles.logo} />}
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default KeyboardAvoidingWrapper;
