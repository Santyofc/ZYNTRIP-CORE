import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DriverApp() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Driver app v1</Text>
          <Text style={styles.title}>Online, matching, navegación y cierre operativo.</Text>
          <Text style={styles.copy}>
            Esta vista ya representa el flujo mínimo del conductor: disponibilidad, oferta, mapa,
            actualización de ubicación y finalización del viaje.
          </Text>
        </View>

        <View style={styles.statusStrip}>
          <View style={styles.onlineDot} />
          <Text style={styles.statusTitle}>ONLINE</Text>
          <Text style={styles.statusMeta}>2 ofertas | aceptación 88% | ping 2s</Text>
        </View>

        <View style={styles.offerCard}>
          <Text style={styles.offerEyebrow}>Nueva oferta</Text>
          <Text style={styles.offerTitle}>Parque Central → Hospital Escalante</Text>
          <Text style={styles.offerMeta}>Pickup 1.2 km | ETA 4 min | Ganancia $7.90</Text>
        </View>

        <View style={styles.mapCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 9.3764,
              longitude: -83.6961,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker coordinate={{ latitude: 9.3764, longitude: -83.6961 }} title="Driver" pinColor="#fb7185" />
            <Marker coordinate={{ latitude: 9.3718, longitude: -83.702 }} title="Pickup" pinColor="#38bdf8" />
            <Marker coordinate={{ latitude: 9.3812, longitude: -83.6888 }} title="Destino" pinColor="#22c55e" />
          </MapView>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Trip lifecycle</Text>
          <Text style={styles.step}>DRIVER_ASSIGNED</Text>
          <Text style={styles.stepActive}>DRIVER_EN_ROUTE</Text>
          <Text style={styles.step}>ARRIVED</Text>
          <Text style={styles.step}>IN_PROGRESS</Text>
          <Text style={styles.step}>COMPLETED</Text>
        </View>

        <View style={styles.metrics}>
          <MetricCard label="Disponibilidad" value="ONLINE" />
          <MetricCard label="Modo de pago" value="Cash first" />
          <MetricCard label="Última ubicación" value="9.3764 / -83.6961" />
          <MetricCard label="Driver status" value="READY" />
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
  safeArea: { flex: 1, backgroundColor: '#120b20' },
  content: { padding: 20, gap: 18 },
  hero: { paddingTop: 8 },
  statusStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#1f1632',
    borderWidth: 1,
    borderColor: '#31224f',
  },
  onlineDot: { width: 12, height: 12, borderRadius: 999, backgroundColor: '#22c55e' },
  offerCard: { padding: 18, borderRadius: 24, backgroundColor: '#f97316' },
  mapCard: { borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: '#31224f' },
  map: { height: 260 },
  sectionCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: '#1f1632',
    borderWidth: 1,
    borderColor: '#31224f',
  },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: {
    width: '47%',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#1f1632',
    borderWidth: 1,
    borderColor: '#31224f',
  },
  eyebrow: {
    marginBottom: 12,
    color: '#fda4af',
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 12,
    color: '#fff7ed',
    fontSize: 32,
    fontWeight: '800',
  },
  copy: {
    color: '#d6bcfa',
    fontSize: 16,
    lineHeight: 24,
  },
  statusTitle: { color: '#fff7ed', fontSize: 18, fontWeight: '800' },
  statusMeta: { color: '#d6bcfa', fontSize: 14 },
  offerEyebrow: { color: '#7c2d12', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5 },
  offerTitle: { marginTop: 8, color: '#ffffff', fontSize: 22, fontWeight: '800' },
  offerMeta: { marginTop: 6, color: '#ffedd5', fontSize: 15, lineHeight: 22 },
  sectionTitle: { marginBottom: 10, color: '#fff7ed', fontSize: 18, fontWeight: '800' },
  step: { color: '#c4b5fd', fontSize: 14, lineHeight: 24 },
  stepActive: { color: '#fb7185', fontSize: 14, lineHeight: 24, fontWeight: '800' },
  metricLabel: { color: '#c4b5fd', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.2 },
  metricValue: { marginTop: 8, color: '#fff7ed', fontSize: 18, fontWeight: '800' },
});
