import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from './context';
import Icon from 'react-native-vector-icons/FontAwesome';

const OngoingScreen = () => {
  const { ongoingList } = useContext(DataContext);
  const navigation = useNavigation();

  const handleMore = (item) => {
    navigation.navigate('more', { item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ongoingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.block}>
            
            <Text style={styles.text}>User Name: {item.username}</Text>
            <Text style={styles.text}>Location: {item.loc}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleMore(item)}>
              <Icon name="info-circle" size={30} color="#1A4D2E" />
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
    backgroundColor: '#f0f0f0',
  },
  block: {
    padding: 20,
    height: 120, 
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#BC7AF9',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Arial', // Change font family
    color: '#333333', // Change font color
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 1,
    top: 1,
  },
  buttonText: {
    color: '#1A4D2E',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default OngoingScreen;