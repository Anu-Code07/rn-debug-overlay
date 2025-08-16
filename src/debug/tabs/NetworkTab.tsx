import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDebug } from '../DebugProvider';
import { NetworkEntry } from '../proxies/fetchProxy';

export const NetworkTab = () => {
  const { requests, clearRequests } = useDebug();
  return (
    <View style={{ flex:1 }}>
      <FlatList
        data={[...requests].reverse()}
        keyExtractor={(it: NetworkEntry) => it.id + String(it.endedAt || '')}
        renderItem={({ item }: { item: NetworkEntry }) => (
          <View style={styles.card}>
            <Text style={styles.url}>{item.method} {item.url}</Text>
            <Text>Status: {item.status ?? '—'} | ms: {item.durationMs ?? '—'} | in: {item.reqBytes ?? 0} | out: {item.resBytes ?? 0}</Text>
            {item.error && <Text style={{ color: '#b00020' }}>{item.error}</Text>}
          </View>
        )}
      />
      <Text style={styles.clear} onPress={clearRequests}>Clear</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: { padding: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  url: { fontWeight: '600' },
  clear: { textAlign:'center', padding: 8, color: '#007aff' }
});