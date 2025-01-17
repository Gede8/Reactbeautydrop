import { Link, Stack } from 'expo-router';


import { Text, View } from '@/components/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'BeautyDrop' }} />
      <View style={{  flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No more waiting .</Text>

        <Link href="/" style={{  marginTop: 15, paddingVertical: 15 }}>
          <Text style={{ fontSize: 14, color: '#2e78b7' }}>Find what you need and fast!</Text>
        </Link>
      </View>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
//   linkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
// });
