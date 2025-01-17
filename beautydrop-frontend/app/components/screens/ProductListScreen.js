import React from 'react';
import { View, Text, FlatList, Image, Button} from 'react-native';

const products = [
  { id: '1', name: 'Shampoo', price: 10, image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Conditioner', price: 12, image: 'https://via.placeholder.com/100' },
];

const ProductListScreen = ({ navigation }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
          <Text>{item.name}</Text>
          <Text>${item.price}</Text>
          <Button
            title="View Details"
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          />
        </View>
      )}
    />
  );
};

// const styles = StyleSheet.create({
//   item: { padding: 10, borderBottomWidth: 1 },
//   image: { width: 100, height: 100 },
// });

export default ProductListScreen;
