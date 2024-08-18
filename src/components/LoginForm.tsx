import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Snackbar from 'react-native-snackbar';
import TextInputField from './TextInputField';
import ActionButton from './ActionButton';
import KeyboardAvoidingWrapper from '../utils/KeyboardAvoidingWrapper';
import callerLogo from '../assets/image/caller.png';
import {COLORS} from '../theme';
import {login} from '../redux/actions/authActions';
import {useDispatch, useSelector} from 'react-redux';
import FullScreenLoader from '../components/FullScreenLoader';

const PASSWORD_NEEDED = false;

const LoginForm = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.auth);
  const initialValues = {
    email: '',
    password: PASSWORD_NEEDED ? '' : undefined,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: PASSWORD_NEEDED
      ? Yup.string().required('Password is required')
      : Yup.string(),
  });

  const handleSubmit = (
    values: {email: string; password: any},
    {resetForm}: any,
  ) => {
    const {email, password} = values;
    if (email) {
      dispatch(login({email, password: PASSWORD_NEEDED ? password : undefined}))
        .then(() => {
          resetForm();
          navigation.navigate('BottomStack');
        })

        .catch((error: {data: {message: string}}) => {
          Snackbar.show({
            text: error.data
              ? error?.data?.message
              : 'Login failed. Please try again with correct email.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: '#FF5733',
          });
        });
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registration');
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      {loading && <FullScreenLoader />}
      <Text style={styles.header}>Login</Text>
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
          <>
            <View style={styles.formContainer}>
              <TextInputField
                label="Email"
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
                secureTextEntry={false}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {PASSWORD_NEEDED && (
                <TextInputField
                  label="Password"
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
              )}
            </View>
            <View style={styles.buttonContainer}>
              <ActionButton
                title="Login"
                onPress={handleSubmit}
                disabled={
                  loading ||
                  !values.email ||
                  (PASSWORD_NEEDED && !values.password) ||
                  Object.keys(errors).length > 0
                }
              />
            </View>
          </>
        )}
      </Formik>
      <Text style={styles.registerText}>
        If you are not registered previously, please{' '}
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>click here to register</Text>
        </TouchableOpacity>
      </Text>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  registerText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
  },
  registerLink: {
    color: COLORS.blue,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default LoginForm;
