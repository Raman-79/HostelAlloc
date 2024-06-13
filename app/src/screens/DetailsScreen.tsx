import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Adjust the path as necessary
import MainTemplate from '../components/templates/MainTemplate';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { student } = route.params;

  return (
    <MainTemplate username='Sam'>
      <Text style={styles.label}>Student Name: {student.name}</Text>
      <Text style={styles.label}>Academic Year: {student.academicYear}</Text>
      <Text style={styles.label}>Student Type: {student.type}</Text>
      <Text style={styles.label}>Class: {student.class}</Text>
      <Text style={styles.label}>Section: {student.section}</Text>
      <Text style={styles.label}>Father's Name: {student.fathersName}</Text>
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default DetailsScreen;
