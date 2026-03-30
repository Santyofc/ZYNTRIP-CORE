import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function DriverApp() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Driver App V1</Text>
        <Text style={styles.title}>Go online, accept, navigate, complete.</Text>
        <Text style={styles.copy}>
          This app is the dedicated driver mobile surface for availability, trip offers, live location,
          navigation handoff, and trip completion.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#eef4ff' },
  card: {
    margin: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'white',
  },
  eyebrow: {
    marginBottom: 12,
    color: '#1e5eff',
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 12,
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
  },
  copy: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
});
