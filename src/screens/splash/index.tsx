import React, {useEffect} from 'react';
import {Text, StyleSheet, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem('accessToken');
        const isAuthenticated = !!userToken;
        if (isAuthenticated) {
          navigation.replace('BottomStack');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // navigation.replace('AuthStack');
      }
    };
    const timer = setTimeout(() => {
      checkAuthentication();
    }, 500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#3944BC', '#0492C2', '#52B2BF']}
      style={styles.container}>
      <StatusBar backgroundColor="#4682B4" />
      <Image
        style={styles.logo}
        source={require('../../assets/image/caller.png')}
      />
      <Text style={styles.title}>GCM DIALER</Text>
      {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
});

export default SplashScreen;
