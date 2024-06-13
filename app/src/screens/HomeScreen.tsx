/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import SearchBar from '../components/atoms/SearchBar'; // Adjust the import path as necessary
import Text from '../components/atoms/Text';

// Sample data for suggestions
const suggestions = [
  { name: "John Doe", academicYear: "2023", type: "Hostel", class: "10", section: "A", fathersName: "Mr. Doe" },
  { name: "Jane Smith", academicYear: "2023", type: "Hostel", class: "10", section: "B", fathersName: "Mr. Smith" },
  { name: "Sam Johnson", academicYear: "2023", type: "Hostel", class: "11", section: "A", fathersName: "Mr. Johnson" },
  { name: "Chris Lee", academicYear: "2023", type: "Hostel", class: "12", section: "C", fathersName: "Mr. Lee" },
  { name: "Patricia Brown", academicYear: "2023", type: "Hostel", class: "9", section: "D", fathersName: "Mr. Brown" }
];

const HomeScreen: React.FC = () => {
  return (
    <MainTemplate username="Sam">
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Student Name</Text>
        <SearchBar suggestions={suggestions} />
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
