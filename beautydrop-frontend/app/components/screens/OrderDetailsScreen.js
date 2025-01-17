import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const OrderDetailsScreen = ({ route, navigation }) => {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order #{order.id}</Text>
      <Text>Delivery Address: {order.deliveryAddress}</Text>
      <Text>Products:</Text>
      {order.products.map((product, index) => (
        <Text key={index}>
          {product.name} - {product.quantity} x ${product.price}
        </Text>
      ))}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: order.location.latitude,
          longitude: order.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: order.location.latitude,
            longitude: order.location.longitude,
          }}
          title="Delivery Location"
        />
      </MapView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  map: {
    height: 200,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderDetailsScreen;
