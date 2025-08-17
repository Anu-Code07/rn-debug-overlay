import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useDebug } from '../DebugProvider';
import { ConsoleEntry } from '../proxies/consoleProxy';

export const LogsTab = () => {
  const { logs, clearLogs } = useDebug();
  
  // console.log('LogsTab rendered with', logs.length, 'logs'); // Removed to prevent infinite loop
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Console Logs ({logs.length})</Text>
      </View>
      {logs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No logs yet</Text>
          <Text style={styles.emptySubText}>Console messages will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(_: ConsoleEntry, i: number) => String(i)}
          renderItem={({ item }: { item: ConsoleEntry }) => (
            <Text style={[styles.row, item.level==='error' && styles.err, item.level==='warn' && styles.warn]}>
              [{new Date(item.timestamp).toLocaleTimeString()}] {item.level.toUpperCase()}: {item.message.map(String).join(' ')}
            </Text>
          )}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 80 }}
          style={styles.list}
        />
      )}
      <TouchableOpacity style={styles.clearFab} onPress={clearLogs}>
        <Text style={styles.clearFabText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  row: { 
    padding: 12, 
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) as any 
  },
  err: { color: '#b00020' }, 
  warn: { color: '#9c6f00' },
  clearFab: { 
    position: 'absolute', 
    bottom: Platform.OS === 'ios' ? 100 : 20, 
    right: 20, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#ff4444', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1000,
  },
  clearFabText: { fontSize: 20, color: 'white' }
});