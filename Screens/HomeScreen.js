import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  const handleQueryChange = async (text) => {
    setQuery(text);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${text}, El Salvador`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectPlace = (place) => {
    navigation.navigate('Places', { location: place });
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectPlace(item)}>
      <Text style={styles.suggestionText}>{item.display_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.question}>¿A dónde te gustaría ir hoy?</Text>
      <Image source={require('../img/mapa.jpg')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del lugar"
        value={query}
        onChangeText={handleQueryChange}
      />
      <FlatList
        data={suggestions}
        renderItem={renderSuggestionItem}
        keyExtractor={(item) => item.place_id.toString()}
        style={styles.suggestionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  suggestionsList: {
    maxHeight: 200,
    width: '100%',
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;
