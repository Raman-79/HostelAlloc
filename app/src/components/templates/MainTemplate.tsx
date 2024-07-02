/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../organisms/Header';
import { Colors } from '../../constants/colors';

interface MainTemplateProps {
  children: React.ReactNode;
  username: string;
  role: string | '';
}

const MainTemplate: React.FC<MainTemplateProps> = ({ children, username, role }) => (
  <View style={styles.container}>
    <Header title={`Welcome, ${username} (${role})`} textStyle={{color: 'black'}}/>
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default MainTemplate;
