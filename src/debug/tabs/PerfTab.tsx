import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDebug } from '../DebugProvider';
export const PerfTab = () => {
  const { jsFps, loopLagMs } = useDebug();
  return (
    <View style={styles.container}>
      <Metric label="JS FPS" value={String(jsFps)} />
      <Metric label="Event Loop Lag (ms)" value={String(loopLagMs)} />
      <Text style={styles.note}>Note: This reports JS thread FPS, not UI thread FPS.</Text>
    </View>
  );
};
const Metric = ({ label, value }: { label: string; value: string }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ fontWeight: '600' }}>{label}</Text>
    <Text>{value}</Text>
  </View>
);
const styles = StyleSheet.create({ container: { padding: 12 }, note: { color: '#666', marginTop: 8 } });