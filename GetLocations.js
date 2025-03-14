import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';


export  const fetchLocationName = async (latitude,longitude) => {
    if (!latitude || !longitude) {
     
      return;
    }

    const apiKey = 'pk.e9fbacf4f654422bfa2717cad0681de3';
    const url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json` ;

    try {
      const response = await axios.get(url);
      const data = response.data;
      // console.log('Response data:', data);  
      
      let k
      if (data && data.address) {
        const address = data.address;
      
          // console.log(address.state_district)
            return address.state_district
      }
       
    } catch (error) {
      console.error('Error fetching location name:', error);
    
    }
  };
export async function getcity(){

   let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
     console.log("hii",location)

         let m=async ()=>{
         let b= await fetchLocationName(location.coords.latitude,location.coords.longitude)
          console.log("eww",b)
          return b
         }

        let g=await m();
        return g
}
 
export async function getCoordinates(){
  let location = await  Location.getCurrentPositionAsync({});
  return {latitude:location.coords.latitude,longitude:location.coords.longitude}
}


