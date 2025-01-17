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
import { auth, db } from '../components/screens/firebaseConfig';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';




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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subheader: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  orderList: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  noOrders: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statusButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  supportButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  supportText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  contactButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




export default WorkerScreen;

