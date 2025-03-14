// ProfilePage.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import { Card, Button, Icon } from 'react-native-elements';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      {/* <Card>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require('./image-removebg-preview.png')}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        <Button
          icon={<Icon name='edit' color='#ffffff' />}
          buttonStyle={styles.button}
          title='Edit Profile'
        />
      </Card> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
  },
  bio: {
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#03A9F4',
  },
});
export default ProfilePage;