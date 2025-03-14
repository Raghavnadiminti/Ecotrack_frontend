import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { DataContext } from './context'
import { useContext } from 'react';


function TripScreen({ navigation, dueAmount, ordersCompleted, ordersPending }) {

   const { data,ongoingList} = useContext(DataContext);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; 
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoLabel}>
          <Icon name="dollar" size={20} color="#388E3C" style={styles.labelIcon} />
          <Text style={styles.infoText}>Due Amount: {data[0].amount}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoSquare}>
            <Icon name="check-circle" size={20} color="#388E3C" style={styles.labelIcon} />
            <Text style={styles.infoText}>Completed</Text>
            <Text style={styles.infoValue}> {data[0].tripno}</Text>
          </View>
          <View style={styles.infoSquare}>
            <Icon name="exclamation-circle" size={20} color="#388E3C" style={styles.labelIcon} />
            <Text style={styles.infoText}>Pending</Text>
            <Text style={styles.infoValue}> 0</Text>
          </View>
        </View>
      </View>

      <Image
        source={require('./R-removebg-preview-removebg-preview.png')}
        style={styles.deliveryImage}
      />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.new]}
          onPress={() => navigation.navigate('new')}
        >
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.ongoing]}
          onPress={() => navigation.navigate('ongoing')}
        >
          <Text style={styles.buttonText}>On going</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.complete]}
          onPress={() => navigation.navigate('complete')}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('qr')} style={styles.qrIconBottom}>
          <Icon name="qrcode" size={50} color="#16423C" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,
    width: '100%',
  },
  infoLabel: {
    backgroundColor: '#A5D6A7', 
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoSquare: {
    backgroundColor: '#A5D6A7', 
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '48%',
  },
  labelIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
    marginTop: 5,
  },
  qrIconBottom: {
    marginTop: 20,
  },
  deliveryImage: {
    width: 220,
    height: 200,
    marginVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  new: {
    backgroundColor: '#4CAF50',
  },
  ongoing: {
    backgroundColor: '#8BC34A', 
  },
  complete: {
    backgroundColor: '#388E3C', 
  },
});
export default TripScreen;