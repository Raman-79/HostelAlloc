import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'RoleForLogin'>;

const RoleForLoginScreen: React.FC<Props> = ({ navigation }) => {
  const handleLogin = (role: string) => {
    if (!role) {
      Alert.alert('Error', 'Role is required to proceed');
      return;
    }
    navigation.navigate('Login', { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who do you want to log in as?</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleLogin('admin')}
      >
        <Text style={styles.buttonText}>Login as Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleLogin('user')}
      >
        <Text style={styles.buttonText}>Login as User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RoleForLoginScreen;
