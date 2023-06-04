import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const handleInputChange = async (row, col, value) => {
    const updatedGridData = [...gridData];
    updatedGridData[row][col] = value;
    setGridData(updatedGridData);
  
    try {
      await AsyncStorage.setItem('gridData', JSON.stringify(updatedGridData));
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  
    const Grid = () => {
        const [gridData, setGridData] = useState([]);
      
        useEffect(() => {
          const fetchGridData = async () => {
            try {
              const storedData = await AsyncStorage.getItem('gridData');
              if (storedData) {
                setGridData(JSON.parse(storedData));
              }
            } catch (error) {
              console.log('Error retrieving data: ', error);
            }
          };
      
          fetchGridData();
        }, []);
      
    }
      
  

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const cols = [];
      for (let j = 0; j < 5; j++) {
        cols.push(
          <TextInput
            key={`${i}-${j}`}
            style={styles.input}
            onChangeText={(value) => handleInputChange(i, j, value)}
            value={gridData[i] ? gridData[i][j] : ''}
          />
        );
      }
      rows.push(<View key={i} style={styles.row}>{cols}</View>);
    }
    return rows;
  };

  return <View>{renderGrid()}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    flex: 1,
    height: 40,
  },
});

export default Grid;
