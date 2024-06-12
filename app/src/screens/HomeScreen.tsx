/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import Card from '../components/molecules/Card';
import SearchBar from '../components/atoms/SearchBar'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';
import Text from '../components/atoms/Text';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleSearchPress = (text: string) => {
    // Here you can handle the search input
    // For example, you could navigate to another screen with the search text
    console.log('Search', `You searched for: ${text}`);
    // Or use navigation to navigate to a search results screen
    // navigation.navigate('SearchResultsScreen', { query: text });
  };

  return (
    <MainTemplate username="Sam">
      <View style={styles.container}>
        <Text style={styles.title}>Search for a Student Name</Text>
        <SearchBar onSearchPress={handleSearchPress} />
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
