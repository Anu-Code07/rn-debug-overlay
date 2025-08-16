import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { useDebug } from '../DebugProvider';
import { ConsoleEntry } from '../proxies/consoleProxy';

export const LogsTab = () => {
  const { logs, clearLogs } = useDebug();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={logs}
        keyExtractor={(_: ConsoleEntry, i: number) => String(i)}
        renderItem={({ item }: { item: ConsoleEntry }) => (
          <Text style={[styles.row, item.level==='error' && styles.err, item.level==='warn' && styles.warn]}>
            [{new Date(item.timestamp).toLocaleTimeString()}] {item.level.toUpperCase()}: {item.message.map(String).join(' ')}
          </Text>
        )}
      />
      <Text style={styles.footer} onPress={clearLogs}>Clear</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  row: { padding: 8, fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) as any },
  err: { color: '#b00020' }, warn: { color: '#9c6f00' },
  footer: { textAlign: 'center', padding: 8, color: '#007aff' }
});