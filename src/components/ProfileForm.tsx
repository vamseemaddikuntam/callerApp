/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import TextInputField from './TextInputField';
import KeyboardAvoidingWrapper from '../utils/KeyboardAvoidingWrapper';
import callerLogo from '../assets/image/contacts.png';
import {updateProfile} from '../redux/actions/authActions';
import PermissionsSection from './PermissionsSection';
import Snackbar from 'react-native-snackbar';
import FullScreenLoader from './FullScreenLoader';

const ProfileForm = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentMode, setCurrentMode] = useState('MODETHREE');
  const dispatch = useDispatch();
  const {loading, user} = useSelector(state => state.auth);

  useFocusEffect(
    useCallback(() => {
      setCurrentMode(user?.ActiveMode || '');
    }, [user]),
  );

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    username: Yup.string().required('Username is required'),
    mobileNo: Yup.string().required('Mobile Number is required'),
  });

  const handleSubmit = values => {
    if (!isEditing) {
      dispatch(updateProfile(values))
        .then(response => {
          setIsEditing(false);
          Snackbar.show({
            text: 'Profile updated successfully!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#28a745',
          });
        })
        .catch(error => {
          Snackbar.show({
            text: error.data
              ? error?.data?.message
              : 'Profile details could not be updated, please try again!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#FF5733',
          });
        });
    }
  };

  const isEditButtonEnabled = currentMode === 'MODETHREE';

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      {loading && <FullScreenLoader />}
      <Formik
        initialValues={{
          username: currentMode === 'MODETHREE' ? user?.username || '' : 'XXXX',
          email: user?.email || '',
          mobileNo: user?.mobileNo || '000 000 000',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize>
        {({
          handleChange,
          handleBlur,
          handleSubmit: formikHandleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={{flex: 1, width: '100%', marginBottom: 100}}>
            <View style={styles.headerContainer}>
              <Pressable
                onPress={() => {
                  if (isEditButtonEnabled || !isEditing) {
                    formikHandleSubmit();
                    setIsEditing(!isEditing);
                  }
                }}
                style={[
                  styles.button,
                  isEditing
                    ? isEditButtonEnabled
                      ? styles.buttonSubmit
                      : styles.buttonDisabled
                    : styles.buttonEdit,
                  isEditing && !isValid && isEditButtonEnabled
                    ? styles.buttonDisabled
                    : {},
                  !isEditButtonEnabled && !isEditing
                    ? styles.buttonDisabled
                    : {},
                ]}
                disabled={!isEditButtonEnabled || (isEditing && !isValid)}>
                <Text style={styles.buttonText}>
                  {isEditing ? 'Submit' : 'Edit'}
                </Text>
              </Pressable>
            </View>

            <ScrollView style={styles.formContainer}>
              <TextInputField
                label="Username"
                placeholder="Enter your username"
                iconName="person-circle-outline"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                editable={isEditing && currentMode === 'MODETHREE'}
                field={{
                  name: 'username',
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.username,
                }}
                form={{touched, errors}}
                style={
                  isEditing && currentMode === 'MODETHREE'
                    ? styles.textInput
                    : styles.textInputDisabled
                }
              />

              <TextInputField
                label="Email"
                placeholder="Enter your email"
                iconName="mail-outline"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                editable={false}
                field={{
                  name: 'email',
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.email,
                }}
                form={{touched, errors}}
                keyboardType="email-address"
                style={styles.textInputDisabled}
              />

              <TextInputField
                label="Mobile Number"
                placeholder="Enter your mobile number"
                iconName="call-outline"
                onChangeText={handleChange('mobileNo')}
                onBlur={handleBlur('mobileNo')}
                value={values.mobileNo}
                editable={false}
                field={{
                  name: 'mobileNo',
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.mobileNo,
                }}
                form={{touched, errors}}
                keyboardType="phone-pad"
                style={styles.textInputDisabled}
              />
              <PermissionsSection />
            </ScrollView>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonEdit: {
    backgroundColor: 'blue',
  },
  buttonSubmit: {
    backgroundColor: 'green',
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3', // Gray color for disabled state
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
  },
  textInputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#a0a0a0',
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
});

export default ProfileForm;
