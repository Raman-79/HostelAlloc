/* eslint-disable prettier/prettier */
import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';

const Text: React.FC<TextProps> = ({ children, style, ...props }) => (
  <RNText style={[styles.text, style]} {...props}>
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Text;
