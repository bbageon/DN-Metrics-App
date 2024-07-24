import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';
import Router from '../routes';

export default function App() {
  return (
    // <Router/>
    <WebView
      source={{ uri : 'https://dnmetrics.co.kr/'}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});