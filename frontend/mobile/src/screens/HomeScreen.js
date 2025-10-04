import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../services/AuthContext';
import { itemService } from '../services/api';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await itemService.getUserItems();
      setItems(response.data);
    } catch (error) {
      console.error('Failed to load items:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemCategory}>{item.category}</Text>
      <Text style={styles.itemStatus}>Status: {item.status}</Text>
      <Text style={styles.itemValue}>Value: ${item.estimatedValue}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, {user?.name}!</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.cameraButton}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={styles.cameraButtonText}>📷 Add New Item</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Your Items</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 20, fontWeight: 'bold' },
  logoutButton: { padding: 10 },
  logoutText: { color: '#FF3B30' },
  cameraButton: { backgroundColor: '#007AFF', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  cameraButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  list: { flex: 1 },
  itemCard: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginBottom: 10 },
  itemCategory: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' },
  itemStatus: { fontSize: 14, color: '#666', marginTop: 5 },
  itemValue: { fontSize: 14, color: '#34C759', marginTop: 5 },
});