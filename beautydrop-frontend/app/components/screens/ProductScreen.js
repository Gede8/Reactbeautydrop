import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from 'expo-router';


const ProductScreen = ({ route }) => {
  const navigation = useNavigation();

    const { product } = route.params;
     return (
        <View style={{ padding: 20 }}>
            <Image source={{ uri: product.image }} style={{ width: '100%', height: 300 }} />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.name}</Text>
            <Text style={{ marginVertical: 10 }}>${product.price}</Text>
             <Text>{product.description}</Text>
            <Button title="Add to Cart" onPress={addToCart} />
        </View>
         );
        };   

    const addToCart = () => {
        // Add to cart functionality
        try {
            // Replace with your actual API endpoint
            axios.post('http://your-api-url/cart', {
              productId: product.id,
              quantity: 1,
            });
            alert('Added to cart!');
          } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart. Please try again.');
          }
        alert('Added to cart!');
    };




   
export default ProductScreen;