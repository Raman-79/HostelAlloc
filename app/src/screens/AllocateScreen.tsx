import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, Student } from '../types';

type AllocateScreenRouteProp = RouteProp<RootStackParamList, 'Allocate'>;
type AllocateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Allocate'>;

type AllocateScreenProps = {
  route: AllocateScreenRouteProp;
};

const hostelNames = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D', 'Hostel E'];

const AllocateScreen: React.FC<AllocateScreenProps> = ({ route }) => {
  const { student } = route.params;
  const navigation = useNavigation<AllocateScreenNavigationProp>();
  const [selectedHostel, setSelectedHostel] = useState<string>(hostelNames[0]);

  const handleConfirm = () => {
    // Logic for confirming the hostel allocation
    console.log(`Hostel ${selectedHostel} allocated to`, student.name);
    navigation.navigate('Details', { student: { ...student, hostelName: selectedHostel } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Allocate Hostel for {student.name}</Text>
      <Picker
        selectedValue={selectedHostel}
        onValueChange={(itemValue) => setSelectedHostel(itemValue)}
        style={styles.picker}
      >
        {hostelNames.map((hostel) => (
          <Picker.Item key={hostel} label={hostel} value={hostel} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Confirm Allocation" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default AllocateScreen;
