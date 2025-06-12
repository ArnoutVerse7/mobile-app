import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import BlogScreen from './screens/BlogScreen';
import BlogDetails from './screens/BlogDetails';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack voor producten
function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Football Shirt Shop"
        component={HomeScreen}
        options={{
          title: 'Football Shirt Shop',
          headerStyle: {
            backgroundColor: '#6A1B9A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          title: 'Productdetails',
          headerStyle: {
            backgroundColor: '#6A1B9A',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// Stack voor blogs
function BlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Blogs"
        component={BlogScreen}
        options={{
          title: 'Blogoverzicht',
          headerStyle: {
            backgroundColor: '#6A1B9A',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogDetails}
        options={{
          title: 'Lees artikel',
          headerStyle: {
            backgroundColor: '#6A1B9A',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        
        <Tab.Screen name="Producten" component={ProductStack} />
        <Tab.Screen name="Blogs" component={BlogStack} />
        <Tab.Screen name="Profiel" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}