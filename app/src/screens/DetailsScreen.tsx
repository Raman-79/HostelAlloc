import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import MainTemplate from '../components/templates/MainTemplate';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { student } = route.params;
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const handleAllotHostel = () => {
    navigation.navigate('Allocate', { student });
  };

  return (
    <MainTemplate username='Sam'>
      <View style={styles.container}>
        <Text style={styles.label}>Student Name: {student.FirstName + ' ' + student.LastName}</Text>
        <Text style={styles.label}>Academic Year: {student.academicYear || 'N/A'}</Text>
        <Text style={styles.label}>Student Type: {student.type || 'N/A'}</Text>
        <Text style={styles.label}>Class: {student.class || 'N/A'}</Text>
        <Text style={styles.label}>Section: {student.section || 'N/A'}</Text>
        <Text style={styles.label}>Father's Name: {student.fathersName || 'N/A'}</Text>
        {student.hostelName && (
          <Text style={styles.label}>Hostel Name: {student.hostelName}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Allot Hostel" onPress={handleAllotHostel} />
      </View>
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
  buttonContainer: {
    padding: 20,
  },
});

export default DetailsScreen;
