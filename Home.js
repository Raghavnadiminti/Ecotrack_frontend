import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StatusBar,
  Button,
  Image,
  Modal,
  FlatList,
} from 'react-native';
// import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Scan from './Scan';
// import Profile from './Profile';
import { io } from 'socket.io-client';
import {getcity,getCoordinates} from './GetLocations';
import {setdata,getData} from './localstorage'


const NavItem = ({ name, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.navItemContainer}>
    <Icon name={name} size={28} color="#2196F3" />
    <Text style={styles.navItemText}>{label}</Text>
  </TouchableOpacity>
);

const FeatureButton = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.request}>{label}</Text>
  </TouchableOpacity>
);

const SettingsModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Settings</Text>
        <View style={styles.buttonContainer}>
          <Button title="Profile" onPress={() => alert('Profile clicked')} />
          <Button
            title="Notifications"
            onPress={() => alert('Notifications clicked')}
          />
          <Button title="Logout" onPress={() => alert('Logout clicked')} />
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const Home = ({ navigation }) => {
//   const [location, setLocation] = useState(null);
   const [modalVisible, setModalVisible] = useState(false);
   const [message,setMessage]= useState(null)
   
   let socket=io('https://b-p-m-s.onrender.com/req_pend') 
   socket.on('accepted',({id})=>{
    setMessage(`collector with ${id} accepted request`)
    console.log(msg) 
})
   useEffect(()=>{
    
     socket.emit('user_join',{username:"raghavendra"})
     
   },[])
   useEffect(()=>{console.log(message)},[message])



  const getLocation = async  () => {
     let k=await getcity()
     let m= await getCoordinates()
    
    console.log("ooo",k)
    console.log("hii2",m)
     socket.emit('user_req',{username:"raghavendra",loc:k,coords:m}) 
     
  };





  // const imageLinks = [
  //   require('./assets/suswastemngmt.jpg'),
  //   require('./assets/suswastemngmt.jpg'),
  //   require('./assets/suswastemngmt.jpg'),
  //   require('./assets/suswastemngmt.jpg'),
  //   require('./assets/suswastemngmt.jpg'),
  // ];

  return (
    <SafeAreaView style={styles.total}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

      <View style={styles.headBg}>
        <Text style={styles.appTitle}>Waste Management</Text>
      </View>

      
      <View style={styles.features}>
        <FeatureButton label="Book a Request" onPress={getLocation} />
        <FeatureButton label="Track Waste" onPress={()=>{navigation.navigate('location')}} />
        <FeatureButton label="Contact Us" onPress={getLocation} />
      </View>

      {/* <View style={styles.container}>
        <Text style={styles.text}>Your Location:</Text>
        {location ? (
          <Text style={styles.location}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        ) : (
          <Text style={styles.location}>Location not fetched yet.</Text>
        )}
        <Button title="Share Location" onPress={getLocation} />
      </View> */}
      <View style={styles.container}>
      <Button
        title="Go to Details"
        // onPress={() => navigation.navigate('Scan')}
      />
      </View>
  <Text>{message}</Text>
      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <View style={styles.nav}>
        <NavItem name="home" label="Home" onPress={() => Alert.alert('Home')} />
        <NavItem
          name="qr-code-scanner"
          label="Scan"
           onPress={() => navigation.navigate('Scan')}

        />
        <NavItem
          name="person"
          label="Profile"
        //   onPress={() => navigation.navigate('Profile')}
        />
        <NavItem
          name="settings"
          label="Settings"
        //   onPress={() => setModalVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headBg: {
    backgroundColor: '#2196F3',
    padding: 15,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '800',
  },
  imgGallery: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  request: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 5,
  },
  navItemContainer: {
    alignItems: 'center',
  },
  navItemText: {
    color: '#2196F3',
    fontSize: 10,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Home;