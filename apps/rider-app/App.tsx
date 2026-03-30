import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function RiderApp() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Rider App V1</Text>
        <Text style={styles.title}>Request, track, pay, and rate.</Text>
        <Text style={styles.copy}>
          This app is the dedicated rider mobile surface for map search, trip requests, live tracking,
          payments, and post-trip ratings.
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
