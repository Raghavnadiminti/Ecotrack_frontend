
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { io } from 'socket.io-client';
export default function Location_() {
  const [location, setLocation] = useState({lat:19.876,lan:90.087});
  const [errorMsg, setErrorMsg] = useState(null);
  
   socket=io('https://b-p-m-s.onrender.com/collector-waste-confirm')

   socket.on('collector_loc', ({location})=>{console.log(location.lat,location.lan,"eww")
    setLocation(location)
  }) 

  useEffect(()=>{
    socket.emit('user_join',({username:"raghavendra"}))

    const intervalId = setInterval(() => {
      socket.emit('give_collector_loc',{id:"1234",username:"raghavendra"})
    }, 1000);
    
    return () => clearInterval(intervalId);
  },[])
   



  // useEffect(() => {
  //   let intervalId;
  
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status!=='granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }
    


  //     intervalId = setInterval(async () => {
  //       let location = await Location.getCurrentPositionAsync({});
      
  //     }, 1000);
  //   })();
  //   return () => clearInterval(intervalId);
  // }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {errorMsg ? (
        <Text style={{ color: 'red' }}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={{ width: '100%', height: '100%' }}
          region={{
            latitude: location.lat,
            longitude: location.lan,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.lat,
              longitude: location.lan,
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