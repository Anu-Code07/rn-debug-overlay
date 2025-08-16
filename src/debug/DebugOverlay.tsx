import React, { useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, PanResponder, Animated, StyleSheet, Share } from 'react-native';
import { useDebug } from './DebugProvider';
import { LogsTab } from './tabs/LogsTab';
import { NetworkTab } from './tabs/NetworkTab';
import { PerfTab } from './tabs/PerfTab';
import { DeviceTab } from './tabs/DeviceTab';

export const DebugOverlay = () => {
  const [open, setOpen] = useState(false);
  const pos = useRef(new Animated.ValueXY({ x: 20, y: 100 })).current;
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pos.x, dy: pos.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {},
    })
  ).current;
  return (
    <>
      <Animated.View style={[styles.fab, { transform: [{ translateX: pos.x }, { translateY: pos.y }] }]} {...pan.panHandlers}>
        <TouchableOpacity onPress={() => setOpen(true)}><Text style={styles.fabText}>⚡</Text></TouchableOpacity>
      </Animated.View>
      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={styles.header}>
          <Text style={styles.title}>Debug Overlay</Text>
          <TouchableOpacity onPress={() => setOpen(false)}><Text style={styles.close}>Close</Text></TouchableOpacity>
        </View>
        <Tabs />
      </Modal>
    </>
  );
};

const Tabs = () => {
  const [tab, setTab] = useState<'logs'|'net'|'perf'|'device'>('logs');
  const { logs, requests } = useDebug();
  async function exportAll() { const payload = JSON.stringify({ logs, requests }, null, 2); try { await Share.share({ message: payload }); } catch {} }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabbar}>
        {(['logs','net','perf','device'] as const).map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab===t && styles.activeTab]}><Text>{t.toUpperCase()}</Text></TouchableOpacity>
        ))}
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={exportAll} style={styles.export}><Text>Export</Text></TouchableOpacity>
      </View>
      {tab === 'logs' && <LogsTab />}
      {tab === 'net' && <NetworkTab />}
      {tab === 'perf' && <PerfTab />}
      {tab === 'device' && <DeviceTab />}
    </View>
  );
};

const styles = StyleSheet.create({
  fab: { position: 'absolute', zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  fabText: { color: 'white', fontSize: 18 },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth: StyleSheet.hairlineWidth },
  title: { fontSize: 18, fontWeight: '600' },
  close: { color: '#007aff' },
  tabbar: { flexDirection: 'row', gap: 8, padding: 8, alignItems:'center', borderBottomWidth: StyleSheet.hairlineWidth },
  tab: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#eee' },
  activeTab: { backgroundColor: '#ddd' },
  export: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#eee' }
});