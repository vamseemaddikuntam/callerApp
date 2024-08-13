import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TextInputField = ({
  label,
  iconName,
  secureTextEntry,
  field,
  form,
  style,
  ...props
}) => {
  const {name} = field;
  const {touched, errors} = form;
  const isError = touched[name] && errors[name];

  const [secureEntry, setSecureEntry] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, style]}>
        <TextInput
          style={[styles.input, isError && styles.inputError]}
          onChangeText={field.onChange(name)}
          onBlur={field.onBlur(name)}
          value={field.value}
          secureTextEntry={secureEntry}
          {...props}
        />
        {iconName && (
          <View style={styles.icon}>
            <Icon name={iconName} size={20} color="#ccc" />
          </View>
        )}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.icon}
            onPress={togglePasswordVisibility}>
            <Icon
              name={secureEntry ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#ccc"
            />
          </TouchableOpacity>
        )}
      </View>
      {isError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default TextInputField;
