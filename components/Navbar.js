import React from 'react';
import { View, Button, Alert } from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';

const Navbar = () => {
  const handleDownload = () => {
    const workbook = XLSX.utils.book_new();
    const sheetData = [
      ['A1', 'B1', 'C1', 'D1', 'E1'],
      ['A2', 'B2', 'C2', 'D2', 'E2'],
      // Add your gridData values here
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    const wbout = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
    const dirPath = RNFS.DownloadDirectoryPath;
    const filePath = `${dirPath}/GoogleSheetsClone.xlsx`;

    RNFS.writeFile(filePath, wbout, 'ascii')
      .then(() => {
        Alert.alert('File Downloaded', 'Excel file has been downloaded successfully.');
      })
      .catch((error) => {
        console.log('Error saving file:', error);
      });
  };

  return (
    <View>
      <Button title="Download" onPress={handleDownload} />
    </View>
  );
};

export default Navbar;

