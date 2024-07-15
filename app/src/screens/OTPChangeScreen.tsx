import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { PASS_CHANGE } from '../api/PUT';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'OTPChange'>;

const OTPChangeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { email, username } = route.params;
  const [newPassword, setNewPassword] = useState('');

  const validateInputs = () => {
    if (!newPassword) {
      Alert.alert('Validation Error', 'New Password is required');
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.put(`${PASS_CHANGE}`, {
        email,
        password: newPassword
      });
      if (response.status === 200) {
        Alert.alert('Password changed successfully');
        navigation.navigate('Home', { role: 'user', username }); // Navigate to the home screen after password change
      } else {
        Alert.alert('Password Change Failed', response.data.message);
      }
    } catch (error) {
      console.error('Password change error', error);
      Alert.alert('Error', 'An error occurred while changing the password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    padding: 8,
  },
});

export default OTPChangeScreen;
