import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import MapView, { Marker } from 'react-native-maps';

const WorkerScreen = ({ navigation }) => {
  const [workerName, setWorkerName] = useState('');
  const [shiftActive, setShiftActive] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ deliveries: 0, earnings: 0, hoursWorked: 0 });

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const user = auth.currentUser;
        if (user) {
          setWorkerName(user.displayName || 'Worker');
        }

        // Fetch assigned orders from Firebase
        const q = query(
          collection(db, 'orders'),
          where('assignedWorkerId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        const ordersList = [];
        querySnapshot.forEach((doc) => {
          ordersList.push({ id: doc.id, ...doc.data() });
        });

        setOrders(ordersList);

        // Save orders locally for offline access
        await AsyncStorage.setItem('orders', JSON.stringify(ordersList));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);

        // Load orders from local storage if online fetch fails
        const savedOrders = await AsyncStorage.getItem('orders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        } else {
          Alert.alert('Error', 'Unable to load orders. Please try again later.');
        }
      }
    };

    fetchWorkerData();
    registerForPushNotifications();

    // Mock performance stats
    setStats({
      deliveries: 45,
      earnings: 1230,
      hoursWorked: 120,
    });
  }, []);

  const registerForPushNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Push notifications will not work.');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Notification Token:', token);
  };

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const handleStartShift = () => {
    setShiftActive(true);
    Alert.alert('Shift Started', 'Your shift is now active.');
  };

  const handleEndShift = () => {
    setShiftActive(false);
    Alert.alert('Shift Ended', 'You have ended your shift.');
  };

  const handleOrderStatus = async (order, status) => {
    try {
      const orderRef = doc(db, 'orders', order.id);
      await updateDoc(orderRef, { status });
      Alert.alert('Success', `Order marked as ${status}`);
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? { ...o, status } : o))
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Unable to update order status.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Logged Out', 'You have been logged out.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Unable to log out. Please try again.');
    }
  };

  const handleSupport = () => {
    Alert.alert(
      'Contact Support',
      'For support, call 1-800-BEAUTY or email support@beautydrop.com.'
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetchOrdersFromFirebase(); // Mock this function
        setOrders(orders);
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        const savedOrders = await AsyncStorage.getItem('orders');
        if (savedOrders) setOrders(JSON.parse(savedOrders));
      }
    };
  
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Welcome, {workerName} {shiftActive ? '(On Shift)' : '(Off Shift)'}
      </Text>

      <View style={styles.actions}>
        {!shiftActive ? (
          <TouchableOpacity style={styles.button} onPress={handleStartShift}>
            <Text style={styles.buttonText}>Start Shift</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleEndShift}>
            <Text style={styles.buttonText}>End Shift</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <Text>Deliveries: {stats.deliveries}</Text>
        <Text>Earnings: ${stats.earnings}</Text>
        <Text>Hours Worked: {stats.hoursWorked}</Text>
      </View>

      <Text style={styles.subheader}>Assigned Orders:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6f61" />
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.orderCard}
              onPress={() => navigation.navigate('OrderDetails', { order: item })}
            >
              <Text style={styles.orderTitle}>Order #{item.id}</Text>
              <Text>Delivery Address: {item.deliveryAddress}</Text>
              <Text>Products: {item.products.map((p) => p.name).join(', ')}</Text>
              <Text>Status: {item.status}</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  }}
                  title="Delivery Location"
                />
              </MapView>
              {item.status === 'Assigned' && (
                <TouchableOpacity
                  style={styles.statusButton}
                  onPress={() => handleOrderStatus(item, 'Picked Up')}
                >
                  <Text style={styles.statusButtonText}>Mark as Picked Up</Text>
                </TouchableOpacity>
              )}
              {item.status === 'Picked Up' && (
                <TouchableOpacity
                  style={styles.statusButton}
                  onPress={() => handleOrderStatus(item, 'Delivered')}
                >
                  <Text style={styles.statusButtonText}>Mark as Delivered</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            

          )}
        />
      ) : (
        <Text style={styles.noOrders}>No orders assigned yet.</Text>
      )}

      <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
        <Text style={styles.supportText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  /* Add your styles here */
});

export default WorkerScreen;
