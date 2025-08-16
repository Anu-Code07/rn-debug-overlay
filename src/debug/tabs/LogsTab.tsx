import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
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
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity style={styles.clearFab} onPress={clearLogs}>
        <Text style={styles.clearFabText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: { padding: 8, fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) as any },
  err: { color: '#b00020' }, 
  warn: { color: '#9c6f00' },
  clearFab: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#ff4444', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  clearFabText: { fontSize: 20, color: 'white' }
});