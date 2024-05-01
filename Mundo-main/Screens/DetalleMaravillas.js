import { View, StyleSheet,Text, Button, Image, ScrollView } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';


const DetalleMaravillas = ({ route, navigation }) => {
  const { tips } = route.params;
  console.log(tips);

  return (
    <ScrollView>
    <View style={styles.container}>
     
       <Text style={styles.heading}>{tips.nombre}</Text>
       <Image source={{ uri: tips.imagen }} style={styles.imagen} />
        <Text style={styles.tipTitle}>Consejos para Viajar</Text>
        <View  style={styles.tipContainer}>
          {tips.Consejos.map((tip, tipIndex) => (
            <Text style={styles.tip} key={tipIndex}>{`${tipIndex + 1}. ${tip}`}</Text>
          ))}
        </View>

         <MapView
        style={styles.map}
        initialRegion={{
          latitude: tips.latitud,
          longitude: tips.longitud,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: tips.latitud,
            longitude: tips.longitud,
          }}
          title={tips.nombre}
          description="Aquí está actualmente"
        />
      </MapView>
        <Button
        title="Volver"
        onPress={() => navigation.goBack()}
      />  
    </View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tipContainer: {
    marginBottom: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagen: {
    width: '100%',
    aspectRatio: 2, // Ajustar el aspecto de la bandera
    resizeMode: 'cover', // Ajustar la imagen para cubrir toda el área
    borderColor:'#000000'
  },
    map: {
    flex: 1,
    height:300,
  },
});

export default DetalleMaravillas;
