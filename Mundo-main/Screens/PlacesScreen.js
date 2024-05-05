import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Linking } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';

const PlacesScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const route = useRoute();
  const location = route.params?.location;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setSelectedLocation({
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      });
    }
  }, [location]);

  const getDirections = async () => {
    if (!currentLocation || !selectedLocation) {
      setErrorMsg('Current or selected location is missing');
      return;
    }

    const { latitude, longitude } = selectedLocation;
    const url = `https://router.project-osrm.org/route/v1/driving/${currentLocation.coords.longitude},${currentLocation.coords.latitude};${longitude},${latitude}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching directions: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      if (!data || !data.routes || data.routes.length === 0) {
        throw new Error('No routes found');
      }
      setDirections(data.routes[0]);
    } catch (error) {
      console.error('Error fetching directions:', error.message);
      setErrorMsg('There was an error fetching directions. Please try again later.');
    }
  };

  // Resto del código para mostrar el mapa y las indicaciones...

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="Mi ubicación"
            />
          )}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title={location.display_name}
            />
          )}
          {directions && (
            <Polyline
              coordinates={directions.geometry.coordinates.map(coord => ({
                latitude: coord[1],
                longitude: coord[0],
              }))}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>
      )}
      <Button title="Obtener indicaciones" onPress={getDirections} disabled={!selectedLocation} />
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default PlacesScreen;
