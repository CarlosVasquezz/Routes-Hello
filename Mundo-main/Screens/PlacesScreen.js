import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PlacesScreen = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('https://662321fd3e17a3ac846ea730.mockapi.io/api/tarjetas/HelloBus');
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.placeContainer}>
      <Image source={{ uri: item.imagen }} style={styles.placeImage} />
      <View style={styles.placeDetails}>
        <Text style={styles.placeTitle}>{item.pais}</Text>
        <Text style={styles.placeCoordinates}>Latitud: {item.latitud}, Longitud: {item.longitud}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={places}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.placeList}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.716033633821791,
          longitude: -89.15373002155887,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitud,
              longitude: place.longitud,
            }}
            title={place.pais}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  placeList: {
    padding: 24,
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  placeImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 8,
  },
  placeDetails: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#444444',
  },
  placeCoordinates: {
    fontSize: 16,
    color: '#666666',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '80%',
    backgroundColor: '#f0f0f0',
  },
  mapContainer: {
    marginTop: 24,
  },
  map :{
    width:'100%',
    height: '75%',
  }
});

export default PlacesScreen;