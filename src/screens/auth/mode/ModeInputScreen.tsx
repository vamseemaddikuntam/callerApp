import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from '../../../components/TextInputField';
import ActionButton from '../../../components/ActionButton';
import KeyboardAvoidingWrapper from '../../../utils/KeyboardAvoidingWrapper';
import callerLogo from '../../../assets/image/caller.png';

const ModeInputScreen = ({navigation, route}) => {
  const {mode} = route.params;

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    ...(mode === 'ModeTwo' && {
      domainId: Yup.string().required('Domain ID is required'),
    }),
    ...(mode === 'ModeThree' && {
      extension: Yup.string().required('Extension is required'),
    }),
  });

  const handleSubmit = values => {
    console.log(values);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      <Text style={styles.header}>{`Enter details for ${mode}`}</Text>
      <Formik
        initialValues={{password: '', domainId: '', extension: ''}}
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
            <TextInputField
              label="Password"
              field={{
                name: 'password',
                value: values.password,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
              form={{touched, errors}}
              placeholder="Enter Password"
              secureTextEntry
            />
            {mode === 'ModeTwo' && (
              <TextInputField
                label="Domain ID"
                field={{
                  name: 'domainId',
                  value: values.domainId,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                form={{touched, errors}}
                placeholder="Enter Domain ID"
              />
            )}
            {mode === 'ModeThree' && (
              <TextInputField
                label="Extension"
                field={{
                  name: 'extension',
                  value: values.extension,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                form={{touched, errors}}
                placeholder="Enter Extension"
              />
            )}
            <View style={styles.buttonContainer}>
              <ActionButton
                title="Submit"
                onPress={handleSubmit}
                disabled={
                  !values.password ||
                  (mode === 'ModeTwo' && !values.domainId) ||
                  (mode === 'ModeThree' && !values.extension)
                }
              />
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginVertical: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
});

export default ModeInputScreen;
