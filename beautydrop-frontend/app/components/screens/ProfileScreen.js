import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from './firebaseConfig';



const ProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'You need to enable permissions to access the library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    Alert.alert('Theme Updated', isDarkTheme ? 'Light mode enabled' : 'Dark mode enabled');
  };

  const orderHistory = [
    { id: '1', name: 'Shampoo', price: '$10.99', date: '2024-12-01' },
    { id: '2', name: 'Hair Dryer', price: '$39.99', date: '2024-11-25' },
  ];

  const wishlist = [
    { id: '1', name: 'Hair Extensions', price: '$49.99' },
    { id: '2', name: 'Hair Serum', price: '$15.99' },
  ];

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#333' : '#fff' }]}>
      {/* Profile Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../../../assets/icons/IMG_3969.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={[styles.userName, { color: isDarkTheme ? '#fff' : '#333' }]}>John Doe</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>
          Account Settings
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.option}>
          <Text style={[styles.optionText, { color: isDarkTheme ? '#fff' : '#333' }]}>
            Theme
          </Text>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ManageAddresses')}
          style={styles.option}
        >
          <Text style={[styles.optionText, { color: isDarkTheme ? '#fff' : '#333' }]}>
            Manage Addresses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdatePersonalInfo')}
          style={styles.option}
        >
          <Text style={[styles.optionText, { color: isDarkTheme ? '#fff' : '#333' }]}>
            Update Personal Information
          </Text>
        </TouchableOpacity>
      </View>

      {/* Order History */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>
          Order History
        </Text>
        <FlatList
          data={orderHistory}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: 10 }}
        />
      </View>

      {/* Wishlist */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkTheme ? '#fff' : '#333' }]}>
          Wishlist
        </Text>
        <FlatList
          data={wishlist}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
          style={{ marginBottom: 10 }}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
  },
  listItemPrice: {
    fontSize: 16,
    color: '#888',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
    borderRadius: 8,
    margin: 15,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
