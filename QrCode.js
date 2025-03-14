import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Socket,io } from 'socket.io-client';


const QRGenerator = ({id="1234",tripno=1}) => {
  const value = `id=${id}//tipno=1`;
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR</Text>
      <QRCode
        value={value}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default QRGenerator;