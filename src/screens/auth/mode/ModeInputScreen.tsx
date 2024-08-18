import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from '../../../components/TextInputField';
import ActionButton from '../../../components/ActionButton';
import KeyboardAvoidingWrapper from '../../../utils/KeyboardAvoidingWrapper';
import callerLogo from '../../../assets/image/caller.png';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import FullScreenLoader from '../../../components/FullScreenLoader';
import {modeChange} from '../../../redux/actions/authActions';

const ModeInputScreen = ({navigation, route}) => {
  const {mode} = route.params;
  const dispatch = useDispatch();
  const {loading, user} = useSelector(state => state.auth);
  console.log('user--->', user);

  const validationSchema = Yup.object().shape({
    ...(mode === 'ModeTwo' && {
      ExtensionNO: Yup.string()
        .required('Extension No is required')
        .matches(/^\d+$/, 'Extension No must be a number'), // Match digits only
      ExtensionPassword: Yup.string().required(
        'Extension Password is required',
      ),
    }),
    ...(mode === 'ModeThree' && {
      ExtensionNO: Yup.string()
        .required('Extension No is required')
        .matches(/^\d+$/, 'Extension No must be a number'), // Match digits only
    }),
  });

  const handleSubmit = (
    values: {ExtensionNO: string; ExtensionPassword?: string},
    {resetForm}: any,
  ) => {
    console.log('Form Values:', values);

    const {ExtensionNO, ExtensionPassword} = values;

    dispatch(
      modeChange({
        ExtensionNO: Number(ExtensionNO),
        ExtensionPassword: mode === 'ModeTwo' ? ExtensionPassword : undefined,
        RequestMode: mode.toUpperCase(),
      }),
    )
      .then(() => {
        resetForm();
        navigation.replace('BottomStack');
      })
      .catch((error: {data: {message: string}}) => {
        Snackbar.show({
          text: error.data
            ? error?.data?.message
            : 'Mode change failed. Please try again.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#FF5733',
        });
      });
  };

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      {loading && <FullScreenLoader />}
      <Text style={styles.header}>{`Enter details for ${mode}`}</Text>
      <Formik
        initialValues={
          mode === 'ModeTwo'
            ? {ExtensionNO: '', ExtensionPassword: ''}
            : mode === 'ModeThree'
            ? {ExtensionNO: ''}
            : {}
        }
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
            {mode !== 'ModeOne' && (
              <TextInputField
                label="Extension No"
                field={{
                  name: 'ExtensionNO',
                  value: values.ExtensionNO, // Use string for input
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                form={{touched, errors}}
                placeholder="Enter Extension No"
                keyboardType="numeric" // Ensure number keyboard is used
              />
            )}
            {mode === 'ModeTwo' && (
              <TextInputField
                label="Extension Password"
                field={{
                  name: 'ExtensionPassword',
                  value: values.ExtensionPassword,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                form={{touched, errors}}
                placeholder="Enter Extension Password"
                secureTextEntry
              />
            )}
            <View style={styles.buttonContainer}>
              <ActionButton
                title="Submit"
                onPress={handleSubmit}
                disabled={
                  (mode === 'ModeTwo' &&
                    (!values.ExtensionNO || !values.ExtensionPassword)) ||
                  (mode === 'ModeThree' && !values.ExtensionNO)
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
    bottom: 120,
  },
});

export default ModeInputScreen;
