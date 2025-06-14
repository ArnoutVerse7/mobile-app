// Import React en alle benodigde componenten en navigatie-tools
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';
import { CartProvider, CartContext } from './components/CartContext';

// Import alle schermen
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';
import BlogScreen from './screens/BlogScreen';
import BlogDetails from './screens/BlogDetails';
import AboutUsScreen from './screens/AboutUsScreen';
import ProfileScreen from './screens/ProfileScreen';

// Maak navigators aan
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// CartIcon component toont het winkelmandje met het aantal producten in de header
function CartIcon({ navigation }) {
  const { cartItems } = useContext(CartContext);
  // Tel het totaal aantal stuks in de cart
  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <TouchableOpacity style={{ marginRight: 8 }} onPress={() => navigation.navigate('Cart')}>
      <View>
        <Ionicons name="cart" size={28} color="white" />
        {totalQuantity > 0 && (
          <View style={{
            position: 'absolute',
            right: -3,
            top: -2,
            backgroundColor: 'red',
            borderRadius: 10,
            minWidth: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 3,
          }}>
            <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold', textAlign: 'center' }}>
              {totalQuantity}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Standaard opties voor de header van elk scherm
const defaultScreenOptions = ({ navigation }) => ({
  title: 'Football Shirt Shop',
  headerStyle: {
    backgroundColor: '#6A1B9A',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

// HomeStack bevat alleen HomeScreen en ProductDetails (geen winkelmandje in header)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="HomeS" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

// ProductStack bevat ProductScreen, ProductDetails en CartScreen
// Alleen hier tonen we het winkelmandje in de header
function ProductStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={({ navigation }) => ({
          headerRight: () => <CartIcon navigation={navigation} />
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({ navigation }) => ({
          headerRight: () => <CartIcon navigation={navigation} />
        })}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

// BlogStack bevat BlogScreen en BlogDetails (geen winkelmandje in header)
function BlogStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="BlogScreen" component={BlogScreen} />
      <Stack.Screen name="BlogDetails" component={BlogDetails} />
    </Stack.Navigator>
  );
}

// AboutUsStack bevat alleen AboutUsScreen
function AboutUsStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
    </Stack.Navigator>
  );
}

// ProfileStack bevat alleen ProfileScreen
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

// De hoofd-app: bevat de Tab Navigator met alle stacks
export default function App() {
  return (
    // CartProvider zorgt dat winkelmandje overal beschikbaar is via context
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false, // Verberg de header van de tab zelf
            tabBarIcon: ({ focused, color, size }) => {
              // Kies het juiste icoon voor elke tab
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Products':
                  iconName = focused ? 'shirt' : 'shirt-outline';
                  break;
                case 'Blogs':
                  iconName = focused ? 'book' : 'book-outline';
                  break;
                case 'About Us':
                  iconName = focused ? 'information-circle' : 'information-circle-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                default:
                  iconName = 'help-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6A1B9A',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {/* Elke tab verwijst naar een eigen stack */}
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Products" component={ProductStack} />
          <Tab.Screen name="Blogs" component={BlogStack} />
          <Tab.Screen name="About Us" component={AboutUsStack} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}