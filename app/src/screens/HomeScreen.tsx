/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';
import Card from '../components/molecules/Card';

const HomeScreen: React.FC = () => (
  <MainTemplate username="Sam">
    <View style={styles.container}>
      <Card title="Welcome" content="This is the home screen using Atomic Design." />
    </View>
  </MainTemplate>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
