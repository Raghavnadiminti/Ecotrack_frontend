
import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';

import usageStats from 'react-native-usage-stats';


export default function App() {
    return (
      <View>
        <usageStats/>
      </View>
    );
  }