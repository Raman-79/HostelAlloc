import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import SearchBar from '../components/atoms/SearchBar'; // Adjust the import path as necessary
import Text from '../components/atoms/Text';
import axios from 'axios';
import { Student } from '../types';
import { SEARCH_API } from '../api/GET';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ route }) => {
  const { role, username } = route.params;
  const [userData, setUserData] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (searchQuery: string) => {
    if (!searchQuery) {
      setUserData([]);
      setError(null);
      return;
    }
    try {
      const response = await axios.get(`${SEARCH_API}`, {
        params: { name: searchQuery },
      });
      const data = response.data.students; // Extract students array from response
      setUserData(data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Axios-specific error
        if (err.response) {
          console.error("Axios response data:", err.response.data);
          console.error("Axios response status:", err.response.status);
          setError(`Error: No such student found` || `'Something went wrong.'`);
        } else if (err.request) {
          console.error("Axios request:", err.request);
          setError('Error: No response received from server.');
        } else {
          console.error("Axios error message:", err.message);
          setError(`Error: ${err.message}`);
        }
      } else {
        console.error("Unexpected error:", err);
        setError('Error: An unexpected error occurred.');
      }
      setUserData([]); // Clear userData on error
    }
  };

  const handleSearch = useCallback((text: string) => {
    getRecommendations(text);
  }, []);

  return (
    <MainTemplate username={username} role={role}>
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Student Name</Text>
        <SearchBar suggestions={userData} onSearch={handleSearch} />
        {error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}
      </View>
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    alignItems: 'center',
    padding: '5%',
    fontSize: 20,
  },
  errorBox: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    alignItems: 'center',
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
  },
});

export default HomeScreen;
