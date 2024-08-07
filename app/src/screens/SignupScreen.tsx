import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../types';
import { SIGNUP } from '../api/POST';

type Props = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(SIGNUP, {
        email,
        password,
        phoneNumber: phone,
        name: username,
      });
      if (response.status === 201) {
        const username = response.data.user.name;
        Alert.alert('Signup Successful', 'New user created!', [
          { text: 'OK', onPress: () => {} },
        ]);
        setTimeout(() => {
          navigation.navigate('Admin');
        }, 2000);
      } else {
        Alert.alert('Signup Failed', response.data.message);
      }
    } catch (error) {
      console.error('Signup error', error);
      Alert.alert('Signup Error', 'An error occurred during signup');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default SignupScreen;
