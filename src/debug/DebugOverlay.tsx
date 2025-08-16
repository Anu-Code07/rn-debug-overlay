import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, PanResponder, Animated, StyleSheet, Share, Dimensions } from 'react-native';
import { useDebug } from './DebugProvider';
import { LogsTab } from './tabs/LogsTab';
import { NetworkTab } from './tabs/NetworkTab';
import { PerfTab } from './tabs/PerfTab';
import { DeviceTab } from './tabs/DeviceTab';

// Singleton to prevent multiple overlays
let overlayInstanceCount = 0;

export const DebugOverlay = () => {
  const [instanceId] = useState(() => ++overlayInstanceCount);
  
  // Prevent multiple instances
  useEffect(() => {
    if (overlayInstanceCount > 1) {
      console.warn(`DebugOverlay: Multiple instances detected (${overlayInstanceCount}). Only one overlay should be rendered.`);
    }
    return () => {
      overlayInstanceCount--;
    };
  }, []);

  // Only render the first instance
  if (instanceId > 1) {
    return null;
  }
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const isDragging = useRef(false);
  const dragStartTime = useRef(0);
  const startPosition = useRef({ x: 20, y: 100 });
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const fabSize = 56;
  
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        dragStartTime.current = Date.now();
        isDragging.current = false;
        // Store the starting position when drag begins
        startPosition.current = { x: position.x, y: position.y };
      },
      
      onPanResponderMove: (_, gestureState) => {
        // Mark as dragging if moved enough
        if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
          isDragging.current = true;
        }
        
        // Update position during drag (use start position + gesture delta)
        if (isDragging.current) {
          const newX = startPosition.current.x + gestureState.dx;
          const newY = startPosition.current.y + gestureState.dy;
          
          // Apply boundaries
          const maxX = screenWidth - fabSize - 10;
          const maxY = screenHeight - fabSize - 80;
          const minX = 10;
          const minY = 40;
          
          const constrainedX = Math.max(minX, Math.min(maxX, newX));
          const constrainedY = Math.max(minY, Math.min(maxY, newY));
          
          setPosition({ x: constrainedX, y: constrainedY });
        }
      },
      
      onPanResponderRelease: (_, gestureState) => {
        const dragDuration = Date.now() - dragStartTime.current;
        const dragDistance = Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
        
        // If it was a short duration and small distance, treat as tap
        if (dragDuration < 200 && dragDistance < 10) {
          isDragging.current = false;
          setOpen(true);
        } else {
          // It was a drag, finalize position (already updated in onPanResponderMove)
          // Reset dragging flag after delay
          setTimeout(() => {
            isDragging.current = false;
          }, 100);
        }
      },
    })
  ).current;
  
  return (
    <>
      <View 
        style={[
          styles.fab, 
          { 
            left: position.x,
            top: position.y,
          }
        ]} 
        {...pan.panHandlers}
      >
        <TouchableOpacity 
          onPress={() => !isDragging.current && setOpen(true)} 
          activeOpacity={0.8}
          style={styles.fabTouchable}
        >
          <Text style={styles.fabText}>⚡</Text>
        </TouchableOpacity>
      </View>
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
  fab: { 
    position: 'absolute', 
    zIndex: 9999, 
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.85)', 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,215,0,0.3)'
  },
  fabTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  fabText: { 
    color: '#FFD700', 
    fontSize: 24, 
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth: StyleSheet.hairlineWidth },
  title: { fontSize: 18, fontWeight: '600' },
  close: { color: '#007aff' },
  tabbar: { flexDirection: 'row', gap: 8, padding: 8, alignItems:'center', borderBottomWidth: StyleSheet.hairlineWidth },
  tab: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#eee' },
  activeTab: { backgroundColor: '#ddd' },
  export: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#eee' }
});