import React, { useState, useEffect } from 'react';
import { View, Image,Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ListaPaises = ({ navigation }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://65f9be823909a9a65b1942ac.mockapi.io/paises');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.countryCard} onPress={() => navigation.navigate('DetallePais', { country: item })}>
      <View style={styles.countryInfo}>
        <Image source={{ uri: item.bandera }} style={styles.flagImage} />
        <Text style={styles.countryName}>{item.nombre.espanol}</Text>
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
        numColumns={2} // Muestra dos países por fila
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  countryList: {
    padding: 10,
  },
  countryCard: {
    width: windowWidth / 2 - 15, // Ajusta el ancho para mostrar dos países por fila
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden', // Para que la bandera no sobresalga del borde de la tarjeta
  },
  countryInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  flagImage: {
    width: '100%',
    aspectRatio: 2, // Ajustar el aspecto de la bandera
    resizeMode: 'cover', // Ajustar la imagen para cubrir toda el área
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ListaPaises;
