import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Zyntrip Mobile</Text>
        <Text style={styles.title}>Expo workspace scaffold</Text>
        <Text style={styles.copy}>
          This app is the target home for rider and driver mobile flows: trip creation, live tracking,
          push notifications, and on-road operations.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef4ff',
  },
  card: {
    margin: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: 'white',
    shadowColor: '#0f172a',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  eyebrow: {
    marginBottom: 12,
    color: '#1e5eff',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 12,
    color: '#0f172a',
    fontSize: 32,
    fontWeight: '800',
  },
  copy: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
});
