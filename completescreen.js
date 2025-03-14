import React, { useState, useEffect, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Scanner() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const adminValue = '2888'; // Replace this with your desired number
  const moveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [moveAnim]);

  const moveY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function getData(e) {
    setScannedData(e.data);
    if (e.data === adminValue) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setErrorMessage('Please scan the correct QR Code');
    }
  }

  return (
    <ImageBackground source={{ uri: 'https://static.vecteezy.com/system/resources/previews/003/127/954/original/abstract-template-blue-background-white-squares-free-vector.jpg ' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={getData}
        >
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.crossLine, { transform: [{ translateY: moveY }] }]} />
        </CameraView>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    width: '67%', 
    height: '37%', 
    position: 'absolute', 
    top: 228, 
    left: 70,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 120,
    left: 15,
    right: 0,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 21,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  crossLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#37AFE1',
    position: 'absolute',
    top: 0,
  },
});