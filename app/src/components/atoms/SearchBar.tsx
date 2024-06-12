/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchBarProps {
  onSearchPress: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchPress }) => {
  const [input, setInput] = useState('');

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSearchPress(input)}
      >
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
