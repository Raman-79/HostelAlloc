import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/index'; // Adjust the path as necessary

interface SearchBarProps {
  suggestions: Array<{ name: string, academicYear: string, type: string, class: string, section: string, fathersName: string }>;
}

const SearchBar: React.FC<SearchBarProps> = ({ suggestions }) => {
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof suggestions>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleInputChange = (text: string) => {
    setInput(text);
    if (text.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion: typeof suggestions[0]) => {
    setInput(suggestion.name);
    setFilteredSuggestions([]);
    navigation.navigate('Details', { student: suggestion });
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
                  <Text>{item.name}</Text>
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
    width: '100%', // Make the container take full width
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow: 'hidden',
    width: '90%', // Set a fixed width for the search bar
    marginTop: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
  },
  suggestionsContainer: {
    width: '90%', // Ensure suggestions container matches the width of the search bar
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    maxHeight: 150, // Limit the height of the suggestions container
  },
  suggestionItem: {
    padding: 10,
  },
});

export default SearchBar;
