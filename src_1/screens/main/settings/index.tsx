import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const settingsOptions = [
  { id: 'profile', title: 'My Profile', icon: 'person-circle-outline', screen: 'MyProfileScreen' },
  { id: 'password', title: 'Change Password', icon: 'lock-closed-outline', screen: 'ChangePasswordScreen' },
  { id: 'security', title: 'Change Security Question', icon: 'shield-checkmark-outline', screen: 'ChangeSecurityScreen' },
  { id: 'about', title: 'About Us', icon: 'information-circle-outline', screen: 'AboutUsScreen' },
  { id: 'contact', title: 'Contact Us', icon: 'call-outline', screen: 'ContactUsScreen' },
  { id: 'logout', title: 'Logout', icon: 'log-out-outline', screen: 'LogoutScreen' },
];

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Login'),
        }
      ],
      { cancelable: false }
    );
  };

  const handlePress = (item) => {
    if (item.id === 'logout') {
      handleLogout();
    } else {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      // onPress={() => navigation.navigate(item.screen)}
      onPress={() => handlePress(item)}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#6495ED" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
});

export default Settings;
