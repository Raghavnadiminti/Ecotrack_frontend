
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { io } from 'socket.io-client';

export default function Location_(locatione) {
  
  const [errorMsg, setErrorMsg] = useState(null);
  
   const location=locatione.route.params.location
   
 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {errorMsg ? (
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={{ width: '100%', height: '100%' }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="locator"
          />
        </MapView>
        
      ) : (
        <Text>Waiting for location...</Text>
      )}
    </View>


  );
}