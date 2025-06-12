import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetails from './screens/ProductDetails';
import BlogScreen from './screens/BlogScreen';
import BlogDetails from './screens/BlogDetails';
import ProfileScreen from './screens/ProfileScreen';
import AboutUsScreen from './screens/AboutUsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  title: 'Football Shirt Shop',
  headerStyle: {
    backgroundColor: '#6A1B9A',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

// Stack voor Products
function ProductStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="Producten" component={ProductScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

// Stack voor Blogs
function BlogStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="BlogOverview" component={BlogScreen} />
      <Stack.Screen name="BlogDetails" component={BlogDetails} />
    </Stack.Navigator>
  );
}

function AboutUsStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="About Us" component={AboutUsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Products" component={ProductStack} />
        <Tab.Screen name="Blogs" component={BlogStack} />
        <Tab.Screen name="About Us" component={AboutUsStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
