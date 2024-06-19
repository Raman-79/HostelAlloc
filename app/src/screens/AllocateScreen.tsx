import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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

  const handleConfirm = (hostelName: string) => {
    // Logic for confirming the hostel allocation
    console.log(`Hostel ${hostelName} allocated to`, student.name);
    navigation.navigate('Details', { student: { ...student, hostelName } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Allocate Hostel for {student.name}</Text>
      <FlatList
        data={hostelNames}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.hostelContainer}>
            <Text style={styles.hostelName}>{item}</Text>
            <Button title="Allocate" onPress={() => handleConfirm(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  hostelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  hostelName: {
    fontSize: 16,
  },
});

export default AllocateScreen;
