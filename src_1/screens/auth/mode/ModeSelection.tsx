import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../../theme';
import ActionButton from '../../../components/ActionButton';
import KeyboardAvoidingWrapper from '../../../utils/KeyboardAvoidingWrapper';
import callerLogo from '../../../assets/image/caller.png';

const ModeSelection = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('Mode-1');

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleModeSubmit = () => {
    if (selectedMode === 'Mode-1') {
      navigation.navigate('BottomStack');
    } else {
      navigation.navigate('BottomStack');
      // navigation.navigate('ModeInputScreen', { mode: selectedMode });
    }
  };

  const modes = ['Mode-1', 'Mode-2', 'Mode-3'];

  return (
    <KeyboardAvoidingWrapper style={styles.container} imageSource={callerLogo}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Please select the mode</Text>
        {modes.map((mode) => (
          <TouchableOpacity
            key={mode}
            style={styles.modeContainer}
            onPress={() => handleModeSelect(mode)}
          >
            <Text style={styles.modeText}>{mode}</Text>
            <View
              style={[
                styles.oval,
                selectedMode === mode && styles.selectedOval,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{marginBottom:20}} >
      <ActionButton
          title="Submit"
          onPress={handleModeSubmit}
          disabled={null}
      />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop:50,
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
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  modeText: {
    fontSize: 24,
  },
  oval: {
    width: 40,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },
  selectedOval: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ModeSelection;
