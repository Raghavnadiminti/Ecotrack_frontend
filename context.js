import React, { createContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import {io} from 'socket.io-client';
import { useEffect } from 'react';
import {getcity,getCoordinates} from './GetLocations.js'
export const DataContext = createContext();
import axios from 'axios';

export const DataProvider = ({ children }) => {
  const [newList, setNewList] = useState([]);
  const [msg,setMessage] = useState('')
  const [waste_update,setWaste]=useState('')
  const [weight,setWeight]=useState('')
  const [location,setLocation]=useState('')
  const [data,setdata]=useState({tripno:0})
  const [loading,setLoading]=useState(true)

   let socket=io('https://b-p-m-s.onrender.com/req_pend') 
   let socket2=io('https://b-p-m-s.onrender.com/collector-waste-confirm') 
    
   
   socket.on('requested',async ({id,username,loc,cords})=>{
    console.log(username,loc)
    
    function containsUsername(newList, username) {
      console.log(username)
      return newList.some(obj => obj.username === username);
      
  }
console.log(!containsUsername(newList,username))
  if(!containsUsername(newList,username)){
   await setNewList(prev=>[...prev,{id:newList.length+1,username:username,loc:loc,cords:cords}])
  }

  })
 
  socket2.on("waste_update",({username,weight})=>{
    console.log(username,weight)
     setWaste(username)
     setWeight(weight)
  })

  socket.on("reqaccept",({req,msg})=>{
    console.log(req,msg)
    setMessage(msg)
  }) 
 socket.on('joined',({req})=>{
  let newArray=[]
  if(req){
  for (let key in req) {
    if (req.hasOwnProperty(key)) {
       
        newArray.push({ username: key, location:req[key].location, coords:req[key].coords });
    }
}
    setNewList(newArray)
}
 })
 socket2.emit('collector_join', { id: '1234' });


 useEffect(() => {
  let k = async () => {
    await getcity();
  };
  socket.emit('collector_join', { id: '1234', city: 'Anakapalli' });
  

  setInterval(async () => {
    let m = await getCoordinates();
    socket2.emit('get_location_collector', { id: '1234', lat: m.latitude, lan: m.longitude });
  }, 1000);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://b-p-m-s.onrender.com/get-collector-info/1234');
      setdata(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []); 



 


 
  const [ongoingList, setOngoingList] = useState([]);

      if(loading){
        return(
          <View>
            <Text>Loading.....</Text>
          </View>
        )
      }
  return (
    <DataContext.Provider value={{ newList, setNewList, ongoingList, setOngoingList,waste_update,msg,location,setLocation,data,setdata,weight,setWeight,setWaste }}>
      {children}
    </DataContext.Provider>
  );
};