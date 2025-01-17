import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function WorkerScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}></Text>
      <View style={{ marginVertical: 30, height: 1, width: '80%' }} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="../components/screens/WorkerScreen" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
