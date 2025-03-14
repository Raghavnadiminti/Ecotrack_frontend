import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { DataContext } from './context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { io } from 'socket.io-client';

const NewScreen = () => {
   let socket=io('https://b-p-m-s.onrender.com/req_pend') 
  const { newList, setNewList, ongoingList, setOngoingList } = useContext(DataContext);

  const handleConfirm = (item) => {
    const updatedNewList = newList.filter((listItem) => listItem.id !== item.id);
    socket.emit('accept_req',{id:"1234",username:item.username})
    setNewList(updatedNewList);
    setOngoingList([...ongoingList, item]);
     
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={newList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.block}>
            <Text style={styles.text}>User name : {item.username}</Text>
            <Text style={styles.text}>Location : {item.loc}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleConfirm(item)}>
              <Icon name="check" size={20} color="#fff" />
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:"#EEEEEE",
  },
  block: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#15B392',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width:120,
    left:190,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
export default NewScreen;