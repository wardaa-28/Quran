import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestScreen: React.FC = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>App is working!</Text>
      <Text style={styles.subtext}>If you see this, the app is rendering correctly.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
  },
});

export default TestScreen;
