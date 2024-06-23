import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList, Student } from '../../types';
import { GET_STUDENT } from '../../api/GET'; // Ensure this import path is correct

interface SearchBarProps {
  suggestions: Student[];
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ suggestions, onSearch }) => {
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<Student[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (input.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        `${suggestion.FirstName} ${suggestion.LastName}`.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [input, suggestions]);

  const handleInputChange = (text: string) => {
    setInput(text);
    onSearch(text);
  };

  const handleSuggestionPress = async (suggestion: Student) => {
    setInput(`${suggestion.FirstName} ${suggestion.LastName}`);
    setFilteredSuggestions([]);
    try {
      const response = await axios.get(GET_STUDENT, { params: { id: suggestion.ID } });
      const studentDetails = response.data.user;
      console.log(studentDetails);
      navigation.navigate('Details', { student: { 
          ID: studentDetails.ID,
          FirstName: studentDetails.FirstName,
          LastName: studentDetails.LastName,
          academicYear: studentDetails.AcademicYear,
          type: studentDetails.StudentType,
          class: studentDetails.Class,
          section: studentDetails.SECTION,
          fathersName: studentDetails.FatherName,
          hostelName: studentDetails.HostelName
      }});
    } catch (error) {
      console.error("Failed to fetch student details:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={input}
          onChangeText={handleInputChange}
        />
      </View>
      {filteredSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={() => handleSuggestionPress(item)}>
                <View style={styles.suggestionItem}>
                  <Text>{`${item.FirstName} ${item.LastName}`}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow: 'hidden',
    width: '90%',
    marginTop: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
  },
  suggestionsContainer: {
    width: '85%',
    backgroundColor: '#fff',
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    maxHeight: '75%',
    padding: 5
  },
  suggestionItem: {
    padding: 10,
  },
});

export default SearchBar;
