import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import CartContext from './CartContext.js';

const CheckoutScreen = () => {
    const { cart } = useContext(CartContext);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const handlePayment = async () => {
        // Fetch payment intent client secret from your server
        const response = await fetch('your-server-endpoint/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: calculateTotal(cart) }),
        });
        const { clientSecret } = await response.json();

        const { error } = await initPaymentSheet({ paymentIntentClientSecret: clientSecret });

        if (!error) {
            const { error: paymentError } = await presentPaymentSheet();
            if (paymentError) {
                alert(`Error: ${paymentError.message}`);
            } else {
                alert('Payment successful!');
            }
        }
    };

    const calculateTotal = (cart) => {
        return cart.reduce((total, item) => total + item.price, 0) * 100; // Convert to cents
    };

    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>Checkout</Text>
            <Button title="Pay Now" onPress={handlePayment} />
        </View>
    );
};

export default CheckoutScreen;