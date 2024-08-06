import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { tabBarHeight } from '../../../../theme';

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../../assets/image/appImage.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <TouchableOpacity>
            <Text style={styles.text}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:tabBarHeight
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 18,
  },
});
