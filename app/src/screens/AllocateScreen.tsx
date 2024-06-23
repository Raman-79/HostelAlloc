import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { RootStackParamList, Student } from '../types';
import { GET_HOSTELS } from '../api/GET'; // Ensure this import path is correct
import { ALLOCATE_HOSTEL } from '../api/PUT';

type AllocateScreenRouteProp = RouteProp<RootStackParamList, 'Allocate'>;
type AllocateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Allocate'>;

type AllocateScreenProps = {
  route: AllocateScreenRouteProp;
};

const AllocateScreen: React.FC<AllocateScreenProps> = ({ route }) => {
  const { student } = route.params;
  const navigation = useNavigation<AllocateScreenNavigationProp>();
  const [selectedHostel, setSelectedHostel] = useState<string>('');
  const [hostels, setHostels] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get(`${GET_HOSTELS}`);
        setHostels(response.data.hostels);
        if (response.data.hostels.length > 0) {
          setSelectedHostel(response.data.hostels[0].name);
        }
      } catch (error) {
        console.error('Failed to fetch hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  const handleConfirm = async () => {
    try {
      const response = await axios.put(`${ALLOCATE_HOSTEL}`, {
        studentId: student.ID,
        hostelId: hostels.find(h => h.name === selectedHostel)?.id,
        wardenName: 'Sam',  // Assuming 'Sam' is the wardenName
        // ReportingTime is handled on the server side
      });

      const { allocation, ReportingDate } = response.data;

      console.log(`${selectedHostel} allocated to`, student.FirstName, ` at ${ReportingDate}`);
      navigation.navigate('Details', { student: { ...student, hostelName: selectedHostel } });

    } catch (error) {
      console.error('Failed to allocate hostel:', error);
      // Handle error scenarios
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Allocate Hostel for {student.FirstName}</Text>
      <Picker
        selectedValue={selectedHostel}
        onValueChange={(itemValue) => setSelectedHostel(itemValue)}
        style={styles.picker}
      >
        {hostels.map((hostel) => (
          <Picker.Item key={hostel.id} label={hostel.name} value={hostel.name} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '90%',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default AllocateScreen;
