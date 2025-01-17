import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: product.image }} style={{ width: '100%', height: 200 }} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.name}</Text>
      <Text>${product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => {/* Add to Cart logic */}} />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   image: { width: '100%', height: 200 },
//   name: { fontSize: 20, fontWeight: 'bold' },
// });

export default ProductDetailsScreen;
