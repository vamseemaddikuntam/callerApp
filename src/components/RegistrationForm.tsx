import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from './TextInputField';
import ActionButton from './ActionButton';
import KeyboardAvoidingWrapper from '../utils/KeyboardAvoidingWrapper';
import callerLogo from '../assets/image/caller.png';
import {useDispatch} from 'react-redux';
import {signUp} from '../redux/actions/authActions';

// Import password_needed from the theme or config
const PASSWORD_NEEDED = false; // This should be imported from your theme/config

const RegistrationForm = ({navigation}) => {
  const dispatch = useDispatch();
  const initialValues = {
    fullName: '',
    email: '',
    username: '',
    password: PASSWORD_NEEDED ? '' : undefined,
    confirmPassword: PASSWORD_NEEDED ? '' : undefined,
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required('Full Name is required'),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
        'Invalid email format',
      ),
    username: Yup.string().required('Username is required'),
    password: PASSWORD_NEEDED
      ? Yup.string()
          .required('Password is required')
          .min(6, 'Password must be at least 6 characters')
      : Yup.string(),
    confirmPassword: PASSWORD_NEEDED
      ? Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      : Yup.string(),
  });

  const handleSubmit = (values, {resetForm}) => {
    const {fullName, email, username, password} = values;

    dispatch(
      signUp({
        fullName,
        email,
        username,
        password: PASSWORD_NEEDED ? password : undefined,
      }),
    )
      .then(() => {
        resetForm(); // Reset the form on success
        navigation.navigate('OTPScreen');
      })
      .catch(error => {
        navigation.navigate('OTPScreen');
        // Snackbar.show({
        //   text: 'Registration failed. Please try again.',
        //   duration: Snackbar.LENGTH_SHORT,
        //   backgroundColor: '#FF5733', // Error color
        // });
        console.error('Registration error:', error);
      });
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{flex: 1}}>
            <ScrollView style={styles.formContainer}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.header}>Create Account</Text>
                <Text style={styles.subHeader}>Please enter your details</Text>
              </View>

              <TextInputField
                label="Full Name"
                placeholder="Enter your full name"
                iconName="person-outline"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                field={{
                  name: 'fullName',
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.fullName,
                }}
                form={{touched, errors}}
              />

              <TextInputField
                label="Email"
                placeholder="Enter your email"
                iconName="mail-outline"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                field={{
                  name: 'email',
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.email,
                }}
                form={{touched, errors}}
                keyboardType="email-address"
              />

              <TextInputField
                label="Username"
                placeholder="Enter your username"
                iconName="person-circle-outline"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                field={{
                  name: 'username',
                  onChange: handleChange,
                  onBlur: handleBlur,
                  value: values.username,
                }}
                form={{touched, errors}}
              />

              {PASSWORD_NEEDED && (
                <>
                  <TextInputField
                    label="Password"
                    placeholder="Enter your password"
                    iconName="lock-closed-outline"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    field={{
                      name: 'password',
                      onChange: handleChange,
                      onBlur: handleBlur,
                      value: values.password,
                    }}
                    form={{touched, errors}}
                  />

                  <TextInputField
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    iconName="lock-closed-outline"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    field={{
                      name: 'confirmPassword',
                      onChange: handleChange,
                      onBlur: handleBlur,
                      value: values.confirmPassword,
                    }}
                    form={{touched, errors}}
                  />
                </>
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <ActionButton
                title="Send OTP"
                onPress={handleSubmit}
                disabled={Object.keys(errors).length > 0}
              />
            </View>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
  },
  formContainer: {
    flex: 0.9,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default RegistrationForm;
