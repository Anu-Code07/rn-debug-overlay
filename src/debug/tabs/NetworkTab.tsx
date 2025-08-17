import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useDebug } from '../DebugProvider';
import { NetworkEntry } from '../proxies/fetchProxy';

const NetworkRequestItem = ({ item }: { item: NetworkEntry }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.url}>{item.method} {item.url}</Text>
        <Text style={styles.summary}>
          Status: {item.status ?? '—'} | {item.durationMs ?? '—'}ms | ↑{item.reqBytes ?? 0}b | ↓{item.resBytes ?? 0}b
        </Text>
        {item.error && <Text style={styles.error}>{item.error}</Text>}
        <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'} {expanded ? 'Hide' : 'Show'} Details</Text>
      </TouchableOpacity>
      
      {expanded && (
        <ScrollView style={styles.details} nestedScrollEnabled>
          {/* Request Headers */}
          {item.requestHeaders && Object.keys(item.requestHeaders).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Request Headers:</Text>
              {Object.entries(item.requestHeaders).map(([key, value]) => (
                <Text key={key} style={styles.headerItem}>{key}: {value}</Text>
              ))}
            </View>
          )}
          
          {/* Request Body */}
          {item.requestBody && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Request Body:</Text>
              <Text style={styles.bodyText}>{item.requestBody}</Text>
            </View>
          )}
          
          {/* Response Headers */}
          {item.responseHeaders && Object.keys(item.responseHeaders).length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Response Headers:</Text>
              {Object.entries(item.responseHeaders).map(([key, value]) => (
                <Text key={key} style={styles.headerItem}>{key}: {value}</Text>
              ))}
            </View>
          )}
          
          {/* Response Body */}
          {item.responseBody && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Response Body:</Text>
              <ScrollView style={styles.responseBodyContainer} nestedScrollEnabled>
                <Text style={styles.bodyText}>{item.responseBody}</Text>
              </ScrollView>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export const NetworkTab = () => {
  const { requests, clearRequests } = useDebug();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Network Requests ({requests.length})</Text>
      </View>
      {requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No network requests yet</Text>
          <Text style={styles.emptySubText}>Network calls will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={[...requests].reverse()}
          keyExtractor={(it: NetworkEntry) => it.id + String(it.endedAt || '')}
          renderItem={({ item }: { item: NetworkEntry }) => <NetworkRequestItem item={item} />}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 140 : 80 }}
          style={{ flex: 1 }}
        />
      )}
      <TouchableOpacity style={styles.clearFab} onPress={clearRequests}>
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
  headerContainer: {
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
  emptyContainer: {
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
  card: { padding: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#e0e0e0' },
  url: { fontWeight: '600', fontSize: 14, marginBottom: 4 },
  summary: { fontSize: 12, color: '#666', marginBottom: 4 },
  error: { color: '#b00020', fontSize: 12, marginBottom: 4 },
  expandIcon: { fontSize: 12, color: '#007aff', marginTop: 4 },
  details: { marginTop: 8, maxHeight: 300, backgroundColor: '#f8f8f8', borderRadius: 4, padding: 8 },
  section: { marginBottom: 12 },
  sectionTitle: { fontWeight: '600', fontSize: 13, marginBottom: 4, color: '#333' },
  headerItem: { fontSize: 11, fontFamily: 'monospace', marginBottom: 2, color: '#555' },
  bodyText: { fontSize: 11, fontFamily: 'monospace', color: '#333', lineHeight: 14 },
  responseBodyContainer: { maxHeight: 120 },
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