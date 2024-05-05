import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './Screens/HomeScreen';
import PlacesScreen from './Screens/PlacesScreen';


export default function App() {
  const Tab = createBottomTabNavigator();

  const TabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: '#f48b28',
        tabBarActiveTintColor: '#633204',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Place') {
            iconName = Platform.OS === 'ios' ? 'home-outline' : 'home';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Places" component={PlacesScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

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
});