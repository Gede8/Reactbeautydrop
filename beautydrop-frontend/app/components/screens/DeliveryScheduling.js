import React, { useState } from 'react';
import { View, Text, TextInput, Button,  Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DeliveryScheduling = ({ navigation }) => {
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [address, setAddress] = useState('');

  const handleSchedule = () => {
    if (!address) {
      Alert.alert('Error', 'Please enter a delivery address.');
      return;
    }

    Alert.alert(
      'Delivery Scheduled',
      `Your delivery is scheduled for ${deliveryTime.toLocaleString()} at ${address}.`
    );

    // Navigate to Order Tracking or Confirmation Screen
    navigation.navigate('OrderTracking', { deliveryTime, address });
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Schedule Your Delivery</Text>

      <Text style={{ fontSize: 16, marginTop: 10 }}>Delivery Address:</Text>
      <TextInput
        style={{ height: 50,  borderColor: '#ccc',  borderWidth: 1,
          marginBottom: 15,
          borderRadius: 8,
          paddingHorizontal: 10 }}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={{ fontSize: 16, marginTop: 10 }}>Select Delivery Time:</Text>
      <Button title="Pick Time" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={deliveryTime}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDeliveryTime(selectedDate);
            }
          }}
        />
      )}

      <Text style={{ fontSize: 16, marginVertical: 10, textAlign: 'center' }}>
        Selected Time: {deliveryTime.toLocaleString()}
      </Text>

      <Button title="Schedule Delivery" onPress={handleSchedule} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//   },
//   timeDisplay: {
//     fontSize: 16,
//     marginVertical: 10,
//     textAlign: 'center',
//   },
// });

export default DeliveryScheduling;
