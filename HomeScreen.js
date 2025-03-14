import * as React from 'react';
import { useState,useEffect,useContext } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { DataContext } from './context'
function HomeScreen({ navigation, totalTrips, totalEarnings, completedOrders }) {
  const { data } = useContext(DataContext);
  console.log(data)

  return (
    <View style={styles.container}>
      <Text style={styles.totalTripsText}>Total Trips:1</Text>
      <Text style={styles.totalEarningsText}>Total Earnings: {data[0].amount}</Text>
      <Text style={styles.completedOrdersText}>Completed Orders: {data[0].pending.length}</Text>
      
      <TouchableOpacity
        style={[styles.iconContainer, styles.profile]}
        onPress={() => navigation.navigate('Profile')}
      >
        <View style={styles.iconBackground}>
          <Icon name="user" size={30} color="#007AFF" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.iconContainer, styles.settings]}
        onPress={() => navigation.navigate('Settings')}
      >
        <View style={styles.iconBackground}>
          <Icon name="cog" size={30} color="#000006" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.iconContainer, styles.location]}
        onPress={() => navigation.navigate('location')}
      >
        <View>
          <Icon name="map-marker" size={60} color="#FF6500" />
        </View>
      </TouchableOpacity>

      <Image
        source={require('./image-removebg-preview.jpeg')}
        style={styles.deliveryImage}
      />

      <TouchableOpacity
        style={styles.startTripButton}
        onPress={() => navigation.navigate('trip')}
      >
        <Text style={styles.startTripButtonText}>Start Trip</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingTop: 50,
  },
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  iconBackground: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
  },
  settings: {
    top: 10,
    right: 10,
  },
  location: {
    bottom: 50,
    left: 175,
  },
  profile: {
    top: 10,
    left: 10,
  },
  totalTripsText: {
    position: 'absolute',
    top: 95,
    width: '90%',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  totalEarningsText: {
    position: 'absolute',
    top: 150,
    width: '90%',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  completedOrdersText: {
    position: 'absolute',
    top: 205,
    width: '90%',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deliveryImage: {
    marginTop: 120,
    width: 300,
    height: 210,
  },
  startTripButton: {
    marginTop: 40,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#16C47F',
    borderRadius: 10,
  },
  startTripButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;