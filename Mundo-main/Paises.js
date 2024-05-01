import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaPaises from './Screens/ListaPaises';
import DetallePais from './Screens/DetallePais';

const Stack = createStackNavigator();

const Paises = () => {
  return (
      <Stack.Navigator initialRouteName="PaisesL">
        <Stack.Screen name="PaisesL" component={ListaPaises}  options={{ headerShown: false }} />
        <Stack.Screen name="DetallePais" component={DetallePais}  options={{ headerShown: false }} />
      </Stack.Navigator>
  );
};

export default Paises;
