import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Image, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext'; // Ensure this path is correct

const CartScreen = () => {
    const navigation = useNavigation();

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { cart, dispatch } = useContext(CartContext); // Ensure these match the context

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await axios.get('http://your-api-url/cart');
            setCartItems(response.data);
            calculateTotal(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            // Replace with your actual API endpoint
            await axios.put(`http://your-api-url/cart/${itemId}`, { quantity: newQuantity });
            const updatedItems = cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            // Replace with your actual API endpoint
            await axios.delete(`http://your-api-url/cart/${itemId}`);
            const updatedItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={{ flexDirection: 'row', padding: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ fontSize: 14, color: '#888' }}>${item.price}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={{ justifyContent: 'center' }}>
                <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>My Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id.toString()}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'right' }}>Total: ${totalPrice.toFixed(2)}</Text>
        </View>
    );
};

export default CartScreen;
