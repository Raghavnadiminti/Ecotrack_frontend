import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from './context';
const Complete = () => {
  
    const { waste_update,weight,setWaste,setWeight,ongoingList,setOngoingList } = useContext(DataContext);
    const navigation=useNavigation()

  const handlepress = () => {
    const updatedNewList = ongoingList.filter((listItem) => listItem.username !== waste_update);
    setWaste('')
    setWeight('')
    navigation.navigate('trip')
  };

    if(waste_update.length<=1){
         return(
            <View></View>
         )
    }
  return (
    <View style={styles.container}>
      <View style={styles.detailBackground}>
        <Text style={styles.text}>user name: {waste_update}</Text>
        <Text style={styles.text}>weight:{weight}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} >
            <Icon name="qrcode" size={30} color="#4CAF50" />
            <Text style={styles.buttonText}>QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlepress}>
            <Icon name="check" size={30} color="#2196F3" />
            <Text style={styles.buttonText}>confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background color for details section
    padding: 45,
    borderRadius: 10,
    width:300,
  },
  text: {
    fontSize: 18,
    color: '#000', // Black text color
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)', // Light background for buttons
    borderRadius: 5,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    color: '#000', // Black text color for buttons
  },
});

export default Complete;