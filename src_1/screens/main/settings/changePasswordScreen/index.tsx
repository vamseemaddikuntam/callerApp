import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInputField from '../../../../components/TextInputField';
import ActionButton from '../../../../components/ActionButton';
import KeyboardAvoidingWrapper from '../../../../utils/KeyboardAvoidingWrapper';
import { tabBarHeight } from '../../../../theme';
import { updatePassword } from '../../../../api/apiInstance';

const ChangePasswordScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Replace with your actual API call
      const response = await updatePassword(values.currentPassword, values.newPassword);
      if (response.success) {
        // Handle success (e.g., show success message)
        console.log('Password updated successfully');
      } else {
        // Handle failure (e.g., show error message)
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container}>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ flex: 1, marginBottom: tabBarHeight}}>
            <ScrollView style={styles.formContainer}>
              <View style={{ alignItems: 'center' }}>
                {/* <Text style={styles.header}>Change Password</Text> */}
                <Text style={styles.subHeader}>Please enter your new password details</Text>
              </View>

              <TextInputField
                label="Current Password"
                placeholder="Enter your current password"
                iconName="lock-closed-outline"
                secureTextEntry
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
                value={values.currentPassword}
                field={{ name: 'currentPassword', onChange: handleChange, onBlur: handleBlur, value: values.currentPassword }}
                form={{ touched, errors }}
              />

              <TextInputField
                label="New Password"
                placeholder="Enter your new password"
                iconName="lock-closed-outline"
                secureTextEntry
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                field={{ name: 'newPassword', onChange: handleChange, onBlur: handleBlur, value: values.newPassword }}
                form={{ touched, errors }}
              />

              <TextInputField
                label="Confirm Password"
                placeholder="Confirm your new password"
                iconName="lock-closed-outline"
                secureTextEntry
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                field={{ name: 'confirmPassword', onChange: handleChange, onBlur: handleBlur, value: values.confirmPassword }}
                form={{ touched, errors }}
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <ActionButton
                title="Update Password"
                onPress={handleSubmit}
                disabled={isSubmitting || Object.keys(errors).length > 0 || !values.currentPassword || !values.newPassword || !values.confirmPassword}
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
    backgroundColor: '#fff',
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

export default ChangePasswordScreen;
