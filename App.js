import React from 'react';
import { View } from 'react-native';
import Grid from './components/Grid';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <View>
      <Navbar />
      <Grid />
    </View>
  );
};

export default App;
