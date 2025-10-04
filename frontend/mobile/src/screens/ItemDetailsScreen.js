import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { pickupService } from '../services/api';

export default function ItemDetailsScreen({ route, navigation }) {
  const { item, partners } = route.params;

  const schedulePickup = async (partnerId) => {
    try {
      await pickupService.schedulePickup(item._id, partnerId);
      Alert.alert('Success', 'Pickup scheduled successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule pickup');
    }
  };

  const renderPartner = ({ item: partner }) => (
    <View style={styles.partnerCard}>
      <Text style={styles.partnerName}>{partner.name}</Text>
      <Text style={styles.partnerType}>{partner.type.toUpperCase()}</Text>
      <Text style={styles.partnerDistance}>
        {Math.round(partner.distance || 5)}km away
      </Text>
      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => schedulePickup(partner._id)}
      >
        <Text style={styles.selectButtonText}>Select Partner</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>Item Classified!</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.condition}>Condition: {item.condition}</Text>
        <Text style={styles.value}>Estimated Value: ${item.estimatedValue}</Text>
      </View>

      <Text style={styles.partnersTitle}>Available Partners</Text>
      <FlatList
        data={partners}
        renderItem={renderPartner}
        keyExtractor={(partner) => partner._id}
        style={styles.partnersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  itemInfo: { backgroundColor: '#f8f9fa', padding: 20, borderRadius: 15, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#007AFF' },
  category: { fontSize: 18, marginBottom: 5, textTransform: 'capitalize' },
  condition: { fontSize: 16, marginBottom: 5, color: '#666' },
  value: { fontSize: 18, fontWeight: 'bold', color: '#34C759' },
  partnersTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  partnersList: { flex: 1 },
  partnerCard: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  partnerName: { fontSize: 16, fontWeight: 'bold' },
  partnerType: { fontSize: 14, color: '#007AFF', marginVertical: 5 },
  partnerDistance: { fontSize: 14, color: '#666', marginBottom: 10 },
  selectButton: { backgroundColor: '#34C759', padding: 10, borderRadius: 8, alignItems: 'center' },
  selectButtonText: { color: 'white', fontWeight: 'bold' },
});