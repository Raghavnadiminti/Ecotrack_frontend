import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Location_ from './locations';
import QRGenerator from './QrCode';
import Scanner from './Scanner';

// import Scan from './Scan';
// import Profile from './Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="qr" component={QRGenerator} />
        {/* <Stack.Screen name="Profile" component={Profile} />  */}
        <Stack.Screen name="location" component={Location_} options={{ headerShown: false }} />
        <Stack.Screen name="Scan" component={Scanner} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}