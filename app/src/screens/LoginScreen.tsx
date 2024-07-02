import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../types';
import { LOGIN } from '../api/GET';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get(LOGIN, {
        params: { email, password }
      });
      if (response.status === 200) {
        const user = response.data.user;
        const username = user.name;
        const lastLogin = user.lastLogin;
        if (role == 'user' && (lastLogin == null || lastLogin === 'Admin')) {
          navigation.navigate('OTPChange', { email, username });
        } else if (role === 'admin' && username === 'Admin') {
          navigation.navigate('Admin');
        } else {
          navigation.navigate('Home', { role, username });
        }
      } else {
        Alert.alert('Login Failed', response.data.message);
      }
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Login Error', 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</Text>
      <View>
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
      </View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
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
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default LoginScreen;
