import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
              title: 'Contacts',
              message: 'ContactsList app would like to access your contacts.',
              buttonPositive: 'Accept',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const contactsData = await Contacts.getAll();
            setContacts(contactsData);
            setFilteredContacts(contactsData);
          } else {
            console.log('Contacts permission denied');
          }
        } else {
          const contactsData = await Contacts.getAll();
          setContacts(contactsData);
          setFilteredContacts(contactsData);
        }
      } catch (error) {
        console.log('Error fetching contacts:', error);
      }
    };

    loadContacts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = contacts.filter(
      (contact) =>
        contact.givenName.toLowerCase().includes(query.toLowerCase()) ||
        contact.familyName.toLowerCase().includes(query.toLowerCase()) ||
        contact.phoneNumbers.some((phoneNumber) =>
          phoneNumber.number.includes(query)
        )
    );
    setFilteredContacts(filtered);
  };

  const makeCall = (phoneNumber) => {
    let phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((err) =>
      console.error('Error making a call', err)
    );
  };

  const renderContactItem = ({ item }) => {
    const getPrimaryPhoneNumber = () => {
      if (item.phoneNumbers.length > 0) {
        const primaryNumber = item.phoneNumbers.find(
          (number) => number.label === 'mobile'
        );
        return primaryNumber ? primaryNumber.number : item.phoneNumbers[0].number;
      }
      return 'No phone number available';
    };

    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => makeCall(getPrimaryPhoneNumber())}
      >
        <Image
          source={
            item.thumbnailPath
              ? { uri: item.thumbnailPath }
              : require('../../../assets/image/contacts.png')
          }
          style={styles.contactImage}
        />
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{`${item.givenName} ${item.familyName}`}</Text>
          <Text style={styles.contactNumber}>{getPrimaryPhoneNumber()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerButton, styles.activeButton]}
          onPress={() => setFilteredContacts(contacts)}
        >
          <Text style={styles.buttonText}>All Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            const gcmContacts = contacts.filter(
              (contact) => contact.someCustomField === 'GCM'
            );
            setFilteredContacts(gcmContacts);
          }}
        >
          <Text style={styles.buttonText}>GCM Contacts</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.recordID}
        style={styles.contactList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  headerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
  },
});

export default ContactsComponent;
