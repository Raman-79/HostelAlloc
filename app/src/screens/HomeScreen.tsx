import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import SearchBar from '../components/atoms/SearchBar'; // Adjust the import path as necessary
import Text from '../components/atoms/Text';
import axios from 'axios';
import { Student } from '../types';
import { SEARCH_API } from '../api/GET';

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<Student[]>([]);

  const getRecommendations = async (searchQuery: string) => {
    if (!searchQuery) {
      setUserData([]);
      return;
    }
    try {
      const response = await axios.get(`${SEARCH_API}`, {
        params: { name: searchQuery },
      });
      const data = response.data.students; // Extract students array from response
      setUserData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        if (error.response) {
          console.error("Axios response data:", error.response.data);
          console.error("Axios response status:", error.response.status);
        } else if (error.request) {
          console.error("Axios request:", error.request);
        } else {
          console.error("Axios error message:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
      setUserData([]); // Clear userData on error
    }
  };

  const handleSearch = useCallback((text: string) => {
    getRecommendations(text);
  }, []);

  return (
    <MainTemplate username="Sam">
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Student Name</Text>
        <SearchBar suggestions={userData} onSearch={handleSearch} />
      </View>
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    alignItems: 'center',
    padding: '5%',
    fontSize: 20,
  },
});

export default HomeScreen;
