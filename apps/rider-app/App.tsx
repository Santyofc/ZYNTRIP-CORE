import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RiderApp() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Rider app v1</Text>
          <Text style={styles.title}>Mapa, solicitud, tracking, pago y rating en un solo flujo.</Text>
          <Text style={styles.copy}>
            La base visual ya representa el journey mínimo del rider: pickup, matching, ETA, seguimiento
            en tiempo real y cierre de pago.
          </Text>
        </View>

        <View style={styles.mapCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 9.3738,
              longitude: -83.7032,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={{ latitude: 9.3718, longitude: -83.702 }} title="Pickup" pinColor="#38bdf8" />
            <Marker coordinate={{ latitude: 9.3812, longitude: -83.6888 }} title="Destino" pinColor="#22c55e" />
            <Marker coordinate={{ latitude: 9.3764, longitude: -83.6961 }} title="Driver" pinColor="#fb7185" />
            <Polyline
              coordinates={[
                { latitude: 9.3718, longitude: -83.702 },
                { latitude: 9.3764, longitude: -83.6961 },
                { latitude: 9.3812, longitude: -83.6888 },
              ]}
              strokeColor="#60a5fa"
              strokeWidth={4}
            />
          </MapView>
        </View>

        <View style={styles.metrics}>
          <MetricCard label="Estado" value="DRIVER_EN_ROUTE" />
          <MetricCard label="ETA" value="4 min" />
          <MetricCard label="Tarifa" value="$7.90" />
          <MetricCard label="Pago" value="Cash first" />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Trip request</Text>
          <Text style={styles.routeLine}>Pickup: Parque Central de San Isidro</Text>
          <Text style={styles.routeLine}>Destino: Hospital Escalante Pradilla</Text>
          <Text style={styles.routeLine}>Pricing: base + distancia + tiempo</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>State machine</Text>
          <Text style={styles.step}>REQUESTED</Text>
          <Text style={styles.step}>SEARCHING_DRIVER</Text>
          <Text style={styles.stepActive}>DRIVER_EN_ROUTE</Text>
          <Text style={styles.step}>ARRIVED</Text>
          <Text style={styles.step}>IN_PROGRESS</Text>
          <Text style={styles.step}>PAYMENT_PENDING / PAID</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#07111f' },
  content: { padding: 20, gap: 18 },
  hero: { paddingTop: 8 },
  mapCard: { borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: '#1e293b' },
  map: { height: 280, backgroundColor: '#0f172a' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  sectionCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  eyebrow: {
    marginBottom: 12,
    color: '#38bdf8',
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 12,
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '800',
  },
  copy: {
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 24,
  },
  metricLabel: { color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.2 },
  metricValue: { marginTop: 8, color: '#f8fafc', fontSize: 20, fontWeight: '800' },
  sectionTitle: { marginBottom: 10, color: '#f8fafc', fontSize: 18, fontWeight: '800' },
  routeLine: { color: '#cbd5e1', fontSize: 15, lineHeight: 24 },
  step: { color: '#64748b', fontSize: 14, lineHeight: 24 },
  stepActive: { color: '#38bdf8', fontSize: 14, lineHeight: 24, fontWeight: '800' },
});
