import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

// Import Firebase Auth Config and Screens
import {
  DeliveryScheduling,
  CartScreen,
  ProductScreen,
  OrderTracking,
  CheckoutScreen,
  CartContext,
  ProductDetailsScreen,
  ProductListScreen,
  LoginScreen,
  Logout,
  Search,
} from '../components';

const HomeScreen = () => {
  const navigation = useNavigation();

  const products = [
    { id: '1', name: 'Shampoo', image: 'https://via.placeholder.com/100', price: '$10.99' },
    { id: '2', name: 'Conditioner', image: 'https://via.placeholder.com/100', price: '$12.99' },
    { id: '3', name: 'Hair Extensions', image: 'https://via.placeholder.com/100', price: '$49.99' },
    { id: '2', name: 'Oils', image: 'https://via.placeholder.com/100', price: '$12.99' },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1, margin: 10,  backgroundColor: '#fff',  borderRadius: 8,  shadowColor: '#000', shadowOpacity: 0.1,
        shadowRadius: 10, elevation: 3,
        padding: 10,
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <Text
        style={{fontSize: 16,fontWeight: 'bold',  color: '#333',  marginVertical: 5 }}
      >
        {item.name}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#888' }}>
        {item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: '#f8f8f8', padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>BeautyDrop</Text>
        <TextInput
          style={{ backgroundColor: '#eee', borderRadius: 8, padding: 10,  fontSize: 16 }}
          placeholder="Search for beauty products..."
        />
      </View>

    
      <View style={{ flex: 1}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#ddd', padding: 15, backgroundColor: '#f8f8f8', flex: '1'}}>
        <Button onPress={() => navigation.navigate('Cart')}>Cart</Button>
        <Button onPress={() => navigation.navigate('ProductList')}>Product</Button>
        <Button onPress={() => navigation.navigate('Checkout')}>Checkout</Button>
        {/* <Button onPress={() => navigation.navigate('ProductDetails')}> Search</Button> */}
        {/* <Button onPress={() => navigation.navigate('Logout')}>Logout</Button> */}
      </View> 
      
       <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
      />
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name=" " component={HomeScreen} options={{ title: ' ' }} />
      <Tab.Screen name="Search" component={Search} />
     
      <Tab.Screen name="ProductList" component={ProductListScreen} />
      <Tab.Screen name="DeliveryScheduling" component={DeliveryScheduling} />
       <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={MyTabs} options={{ title: ' ' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: '' }} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Delivery" component={DeliveryScheduling} />
      <Stack.Screen name="OrderTracking" component={OrderTracking} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="CartContext" component={CartContext} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
