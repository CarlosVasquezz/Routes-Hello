import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Paises from './Screens/Paises';
import Maravillas from './Screens/Maravillas';

export default function App() {

  const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarInactiveTintColor: "#f48b28",
          tabBarActiveTintColor: "#633204",
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Screen1') {
          iconName = Platform.OS === 'ios' ? 'home-outline' : 'home';
        } else if (route.name === 'Screen2') {
          iconName = Platform.OS === 'ios' ? 'list-outline' : 'list';
        }
        // Devolver el componente de icono correspondiente
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Paises" component={Paises} />
    <Tab.Screen name="Maravilla" component={Maravillas} />
  </Tab.Navigator>
);


  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
