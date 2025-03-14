import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { NativeModules, Platform } from 'react-native';

const { UsageStats } = NativeModules;

const Usage = () => {
  const [usageData, setUsageData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      fetchUsageData();
    } else {
      setError('This feature is only available on Android.');
    }
  }, []);

  const fetchUsageData = async () => {
    try {
      const data = await UsageStats.getUsageStats();
      setUsageData(data);
    } catch (err) {
      setError('Failed to retrieve usage statistics: ' + err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mobile Usage Statistics</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        usageData.length > 0 ? (
          usageData.map((app, index) => (
            <View key={index} style={styles.appContainer}>
              <Text style={styles.appName}>App Name: {app.appName}</Text>
              <Text style={styles.usage}>Usage Time: {app.usageTime} ms</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No usage data available.</Text>
        )
      )}
      <Button title="Refresh Data" onPress={fetchUsageData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  noData: {
    fontSize: 16,
    color: '#999',
  },
  appContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usage: {
    fontSize: 16,
    color: '#666',
  },
});

export default Usage;
