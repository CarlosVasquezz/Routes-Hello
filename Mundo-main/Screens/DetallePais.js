import React from 'react';
import { View, Text, StyleSheet,Button, Image } from 'react-native';

const DetallePais = ({ route, navigation }) => {
  const { country } = route.params;
 

  return (

    <View style={styles.container}>
      <Text style={styles.heading}>Detalles del País</Text>
     
      <View style={styles.detailsContainer}>
       <Image source={{ uri: country.bandera }} style={styles.flagImage} />
        <Text><Text style={styles.label}>Nombre:</Text> {country.nombre.espanol} ({country.codigo_pais})</Text>
        <Text><Text style={styles.label}>Capital:</Text> {country.capital.espanol}</Text>
        <Text><Text style={styles.label}>Población:</Text> {country.poblacion}</Text>
        <Text><Text style={styles.label}>Región:</Text> {country.region.espanol}</Text>
        <Text><Text style={styles.label}>Moneda:</Text> {country.monedas[0].nombre.espanol}</Text>
      </View>
      <Button
        title="Volver"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
  },
   flagImage: {
    width: '100%',
    aspectRatio: 2, // Ajustar el aspecto de la bandera
    resizeMode: 'cover', // Ajustar la imagen para cubrir toda el área
    borderColor:'#000000'
  },
});

export default DetallePais;
