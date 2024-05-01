import React, { useState, useEffect } from 'react';
import { View, Image,Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const ListaMaravillas = ({ navigation }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('https://65f9be823909a9a65b1942ac.mockapi.io/maravillas');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Consejos', { tips: item })}>
      <View style={styles.Lista}>
        <Image source={{ uri: item.imagen }} style={styles.ImagenM} />
        <View style={styles.ListaText}>
        <Text style={styles.TextNombre}>{item.nombre}</Text>
        <Text style={styles.TextPais}>{item.pais}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.countryList}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ImagenM:{
    width: 100,
    height: 50,
    marginRight: 10
  },
  Lista: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBlockEndColor:"#000000"
  },
  ListaText:{  
    alignItems: 'left',
    padding: 10
    },
    TextNombre:{
      fontSize:20,
    },
    TextPais:{
      fontSize:15,
      color:'gray'
    }

});
export default ListaMaravillas;
