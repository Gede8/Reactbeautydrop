import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const OrderTracking = ({ route }) => {
  const { deliveryTime, address } = route.params;

  const [driverLocation, setDriverLocation] = useState({
    latitude: 37.78825, // Mock location
    longitude: -122.4324,
  });

  const [orderStatus, setOrderStatus] = useState('Preparing your order...');

  useEffect(() => {
    // Simulate real-time order updates
    const statusUpdates = [
      'Order Confirmed',
      'Preparing your order...',
      'Driver is on the way!',
      'Driver has arrived!',
    ];

    let statusIndex = 0;
    const interval = setInterval(() => {
      if (statusIndex < statusUpdates.length) {
        setOrderStatus(statusUpdates[statusIndex]);
        statusIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5000); // Update every 5 seconds

    // Simulate driver location updates
    const locationInterval = setInterval(() => {
      setDriverLocation((prevLocation) => ({
        latitude: prevLocation.latitude + 0.0001,
        longitude: prevLocation.longitude + 0.0001,
      }));
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(locationInterval);
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Order Tracking</Text>

      <Text style={{ fontSize: 18, color: '#007BFF', textAlign: 'center', marginBottom: 15 }}>{orderStatus}</Text>

      <MapView
        style={{ height: 300, borderRadius: 10, marginVertical: 20 }}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={driverLocation}
          title="Driver Location"
          description="Your driver is here"
        />
      </MapView>

      <Text style={{ fontSize: 16,  marginTop: 10, textAlign: 'center' }}>
        Delivery Address: {address}
      </Text>
      <Text style={{ fontSize: 16, marginTop: 10, textAlign: 'center' }}>
        Delivery Time: {new Date(deliveryTime).toLocaleString()}
      </Text>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   status: {
//     fontSize: 18,
//     color: '#007BFF',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   map: {
//     height: 300,
//     borderRadius: 10,
//     marginVertical: 20,
//   },
//   details: {
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });

export default OrderTracking;
