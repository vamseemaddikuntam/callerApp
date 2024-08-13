import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Snackbar from 'react-native-snackbar';
import TextInputField from './TextInputField';
import ActionButton from './ActionButton';
import KeyboardAvoidingWrapper from '../utils/KeyboardAvoidingWrapper';
import callerLogo from '../assets/image/caller.png';
import { COLORS } from '../theme';
import { login } from '../redux/actions/authActions'
import { useDispatch } from 'react-redux';

// Import password_needed from the theme or config
const PASSWORD_NEEDED = false; // This should be imported from your theme/config

const LoginForm = ({ navigation }) => {
    const dispatch = useDispatch();
    const initialValues = {
        userName: '',
        password: PASSWORD_NEEDED ? '' : undefined,
    };

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        password: PASSWORD_NEEDED ? Yup.string().required('Password is required') : Yup.string(),
    });

    const handleSubmit = (values, { resetForm }) => {
        const { userName, password } = values;
        if (userName.toLowerCase() !== "tempuser") {
            return Snackbar.show({
                text: PASSWORD_NEEDED ? 'Login failed. Please try again.' : 'Login failed. Please try again with correct username.',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: '#FF5733',
            });
        } else {
            dispatch(login({ userName, password: PASSWORD_NEEDED ? password : undefined }))
                .then(() => {
                    resetForm();
                    navigation.navigate('BottomStack');
                })
                .catch((error) => {
                    resetForm(); //need to remove after demo
                    navigation.navigate('BottomStack'); //need to remove after demo
                    // Snackbar.show({
                    //     text: PASSWORD_NEEDED ? 'Login failed. Please try again.' : 'Login failed. Please try again with correct username.',
                    //     duration: Snackbar.LENGTH_SHORT,
                    //     backgroundColor: '#FF5733', // Error color
                    // });
                });
        }
    };

    const handleRegister = () => {
        //  navigation.navigate('Registration');
        navigation.navigate('ModeSelection');
    };

    return (
        <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
            <Text style={styles.header}>Login</Text>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
                    <>
                        <View style={styles.formContainer}>
                            <TextInputField
                                label="Username"
                                iconName="person-outline"
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                                value={values.userName}
                                field={{ name: 'userName', onChange: handleChange, onBlur: handleBlur, value: values.userName }}
                                form={{ touched, errors }}
                                secureTextEntry={false}
                            />

                            {PASSWORD_NEEDED && (
                                <TextInputField
                                    label="Password"
                                    iconName="lock-closed-outline"
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    field={{ name: 'password', onChange: handleChange, onBlur: handleBlur, value: values.password }}
                                    form={{ touched, errors }}
                                />
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <ActionButton
                                title="Login"
                                onPress={handleSubmit}
                                disabled={!values.userName || (PASSWORD_NEEDED && !values.password) || Object.keys(errors).length > 0}
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
                .
            </Text>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
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
