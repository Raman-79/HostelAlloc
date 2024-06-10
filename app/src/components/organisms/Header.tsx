/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Text from '../atoms/Text';
import { Colors } from '../../constants/colors';

interface HeaderProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Header: React.FC<HeaderProps> = ({ title, style, textStyle }) => (
  <View style={[styles.header, style]}>
    <Text style={[styles.title, textStyle]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: Colors.headerbg,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Header;
