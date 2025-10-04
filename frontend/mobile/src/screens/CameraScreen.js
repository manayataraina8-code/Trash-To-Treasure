import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { itemService } from '../services/api';

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const classifyItem = async () => {
    if (!image) return;

    try {
      setLoading(true);
      
      const location = await Location.getCurrentPositionAsync({});
      
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: 'item.jpg',
      });
      formData.append('location', JSON.stringify({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      }));

      const response = await itemService.classifyItem(formData);
      
      navigation.navigate('ItemDetails', { 
        item: response.data.item,
        partners: response.data.matchingPartners 
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to classify item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Your Item</Text>
      
      {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      
      {image && (
        <TouchableOpacity 
          style={[styles.button, styles.classifyButton]} 
          onPress={classifyItem}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Classifying...' : 'Classify Item'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 300, height: 200, marginVertical: 20, borderRadius: 10 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginVertical: 10, width: '80%' },
  classifyButton: { backgroundColor: '#34C759' },
  buttonText: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});