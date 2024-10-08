import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../../../redux/actions/authActions';

const modes = [
  {id: 'MODEONE', title: 'Mode 1', screen: 'ModeOne'},
  {id: 'MODETWO', title: 'Mode 2', screen: 'ModeTwo'},
  {id: 'MODETHREE', title: 'Mode 3', screen: 'ModeThree'},
];

const settingsOptions = [
  {
    id: 'modeToggle',
    title: 'Mode',
    icon: 'options-outline',
    isModeToggle: true,
  },
  {
    id: 'profile',
    title: 'My Profile',
    icon: 'person-circle-outline',
    screen: 'MyProfileScreen',
  },
  {
    id: 'password',
    title: 'Change Password',
    icon: 'lock-closed-outline',
    screen: 'ChangePasswordScreen',
  },
  {
    id: 'security',
    title: 'Change Security Question',
    icon: 'shield-checkmark-outline',
    screen: 'ChangeSecurityScreen',
  },
  {
    id: 'about',
    title: 'About Us',
    icon: 'information-circle-outline',
    screen: 'AboutUsScreen',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: 'call-outline',
    screen: 'ContactUsScreen',
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: 'log-out-outline',
    screen: 'LogoutScreen',
  },
];

const Settings = () => {
  const [currentMode, setCurrentMode] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  useFocusEffect(
    useCallback(() => {
      setCurrentMode(user.ActiveMode || '');
    }, [user?.ActiveMode]),
  );

  const handleModeChange = mode => {
    if (mode.id === currentMode) {
      return;
    }

    Alert.alert(
      'Switch Mode',
      `Are you sure you want to switch to ${mode.title}?`,
      [
        {
          text: 'No',
          onPress: () => console.log('Mode change cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setCurrentMode(mode.id);
            navigation.navigate('ModeInputScreen', {mode: mode.screen});
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            dispatch(logout());
            await AsyncStorage.setItem('accessToken', '');
            navigation.navigate('AuthStack');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handlePress = item => {
    if (item.id === 'logout') {
      handleLogout();
    } else if (!item.isModeToggle) {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({item}) => {
    if (item.isModeToggle) {
      return (
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={24} color="#6495ED" />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.modesContainer}>
            {modes.map(mode => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.modeButton,
                  mode.id === currentMode && styles.selectedModeButton,
                ]}
                onPress={() => handleModeChange(mode)}>
                <Text
                  style={[
                    styles.modeText,
                    mode.id === currentMode && styles.selectedModeText,
                  ]}>
                  {mode.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handlePress(item)}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={24} color="#6495ED" />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    width: '96%',
    marginLeft: '2%',
    backgroundColor: '#cccccc',
  },
  modesContainer: {
    flexDirection: 'row',
  },
  modeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginLeft: 8,
  },
  selectedModeButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  modeText: {
    color: 'black',
  },
  selectedModeText: {
    color: 'white',
  },
});

export default Settings;
