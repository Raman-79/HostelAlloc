import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import SearchBar from '../components/atoms/SearchBar'; // Adjust the import path as necessary
import Text from '../components/atoms/Text';
import axios from 'axios';
import { Student } from '../types';
import { SEARCH_API } from '../api/GET';
// Sample data for suggestions
const suggestions = [
  { name: "John Doe", academicYear: "2023", type: "Hostel", class: "10", section: "A", fathersName: "Mr. Doe" },
  { name: "Jane Smith", academicYear: "2023", type: "Hostel", class: "10", section: "B", fathersName: "Mr. Smith" },
  { name: "Sam Johnson", academicYear: "2023", type: "Hostel", class: "11", section: "A", fathersName: "Mr. Johnson" },
  { name: "Chris Lee", academicYear: "2023", type: "Hostel", class: "12", section: "C", fathersName: "Mr. Lee" },
  { name: "Patricia Brown", academicYear: "2023", type: "Hostel", class: "9", section: "D", fathersName: "Mr. Brown" }
];

const HomeScreen: React.FC = () => {
  const [userData, setUserData] = useState<Student []>([]);

  const getRecommendations = async () => {
    try {
      const response = await axios.get(SEARCH_API,{
        // TODO: Add params
      });
      const data: Student[] = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <MainTemplate username="Sam">
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Student Name</Text>
        <SearchBar suggestions={userData} />
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
    fontSize: 20
  }
});

export default HomeScreen;
