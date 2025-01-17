import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, FlatList } from 'react-native';

const HelpScreen = ({ navigation }) => {
  const helpTopics = [
    { id: '1', title: 'How to Place an Order', route: 'ProductList' },
    { id: '2', title: 'How to View Your Cart', route: 'Cart' },
    { id: '3', title: 'How to Check Order Status', route: 'OrderTracking' },
    { id: '4', title: 'How to Update Your Profile', route: 'Profile' },
    { id: '5', title: 'How to Logout', route: 'Logout' },
  ];

  const handleOpenSupportEmail = () => {
    const email = 'support@beautydrop.com';
    const subject = 'Technical Assistance Required';
    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    Linking.openURL(mailUrl).catch(() => {
      Alert.alert('Error', 'Unable to open email client.');
    });
  };

  const handleOpenSupportCall = () => {
    const phoneNumber = 'tel:+1234567890';
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'Unable to place a call.');
    });
  };

  const renderHelpTopic = ({ item }) => (
    <TouchableOpacity
      style={styles.topicItem}
      onPress={() => navigation.navigate(item.route)}
    >
      <Text style={styles.topicTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.subtitle}>
        Browse common issues, or contact support for assistance.
      </Text>

      {/* Help Topics */}
      <FlatList
        data={helpTopics}
        renderItem={renderHelpTopic}
        keyExtractor={(item) => item.id}
        style={styles.topicsList}
      />

      {/* Support Options */}
      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>Contact Support</Text>
        <TouchableOpacity style={styles.supportButton} onPress={handleOpenSupportEmail}>
          <Text style={styles.supportButtonText}>Email Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportButton} onPress={handleOpenSupportCall}>
          <Text style={styles.supportButtonText}>Call Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  topicsList: {
    marginBottom: 20,
  },
  topicItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  supportSection: {
    marginTop: 20,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  supportButton: {
    padding: 15,
    backgroundColor: '#ff6f61',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  supportButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HelpScreen;
