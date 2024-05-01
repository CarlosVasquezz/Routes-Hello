import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaPaises from './ListaPaises';
import DetallePais from './DetallePais';

const Stack = createStackNavigator();

const Paises = () => {
  return (
      <Stack.Navigator initialRouteName="Paises">
        <Stack.Screen name="Paises" component={ListaPaises}  options={{ headerShown: false }} />
        <Stack.Screen name="DetallePais" component={DetallePais}  options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default Paises;
