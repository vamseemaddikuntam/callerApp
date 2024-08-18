import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import TextInputField from './TextInputField';
import KeyboardAvoidingWrapper from '../utils/KeyboardAvoidingWrapper';
import callerLogo from '../assets/image/contacts.png';
import { updateProfile } from '../redux/actions/authActions';
import PermissionsSection from './PermissionsSection';

const ProfileForm = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required('Full Name is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    mobileNo: Yup.string().required('Mobile Number is required')
  });

  const handleSubmit = (values) => {
    if (!isEditing) {
      dispatch(updateProfile(values));
      setIsEditing(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      <Formik
        initialValues={{
          fullName: user?.fullName || user?.username || '',
          email: user?.email || '',
          username: user?.username || '',
          mobileNo: user?.mobileNo || ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, handleBlur, handleSubmit: formikHandleSubmit, values, errors, touched, isValid, isSubmitting }) => (
          <View style={{ flex: 1, width: '100%', marginBottom : 100 }}>
            <View style={styles.headerContainer}>
              <Pressable
                onPress={() => {
                    formikHandleSubmit();
                    setIsEditing(!isEditing);
                }}
                style={[styles.button, isEditing ? styles.buttonEdit : styles.buttonSubmit, (isEditing && !isValid) ? styles.buttonDisabled : {}]}
                disabled={isEditing && !isValid}
              >
                <Text style={styles.buttonText}>{isEditing ? 'Submit' : 'Edit'}</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.formContainer}>
              <TextInputField
                label="Full Name"
                placeholder="Enter your full name"
                iconName="person-outline"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                editable={isEditing}
                field={{ name: 'fullName', onChange: handleChange, onBlur: handleBlur, value: values.fullName }}
                form={{ touched, errors }}
                style={isEditing ? styles.textInput : styles.textInputDisabled}
              />

              <TextInputField
                label="Email"
                placeholder="Enter your email"
                iconName="mail-outline"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                editable={isEditing}
                field={{ name: 'email', onChange: handleChange, onBlur: handleBlur, value: values.email }}
                form={{ touched, errors }}
                keyboardType="email-address"
                style={isEditing ? styles.textInput : styles.textInputDisabled}
              />

              <TextInputField
                label="Username"
                placeholder="Enter your username"
                iconName="person-circle-outline"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                editable={isEditing}
                field={{ name: 'username', onChange: handleChange, onBlur: handleBlur, value: values.username }}
                form={{ touched, errors }}
                style={isEditing ? styles.textInput : styles.textInputDisabled}
              />

              <TextInputField
                label="Mobile Number"
                placeholder="Enter your mobile number"
                iconName="call-outline"
                onChangeText={handleChange('mobileNo')}
                onBlur={handleBlur('mobileNo')}
                value={values.mobileNo}
                editable={isEditing}
                field={{ name: 'mobileNo', onChange: handleChange, onBlur: handleBlur, value: values.mobileNo }}
                form={{ touched, errors }}
                keyboardType="phone-pad"
                style={isEditing ? styles.textInput : styles.textInputDisabled}
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
    width: '100%'
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
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
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
