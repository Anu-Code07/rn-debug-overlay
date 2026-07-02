import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, PanResponder, StyleSheet, Share, Dimensions, Platform, StatusBar, ViewStyle, TextStyle } from 'react-native';
import { useDebug } from './DebugProvider';
import { LogsTab } from './tabs/LogsTab';
import { NetworkTab } from './tabs/NetworkTab';
import { PerfTab } from './tabs/PerfTab';
import { DeviceTab } from './tabs/DeviceTab';

export interface DebugOverlayProps {
  /** Diameter of the floating action button in pixels. Default: 56 */
  fabSize?: number;
  /** Initial screen position of the FAB. Default: top-left area with safe offset */
  initialPosition?: { x: number; y: number };
  /** Custom styles merged onto the FAB container */
  fabStyle?: ViewStyle;
  /** Custom styles merged onto the FAB icon text */
  fabTextStyle?: TextStyle;
  /** Icon/emoji shown inside the FAB. Default: "⚡" */
  fabIcon?: string;
}

function getDefaultPosition(screenHeight: number): { x: number; y: number } {
  return {
    x: 20,
    y: Platform.OS === 'ios' ? (screenHeight > 800 ? 60 : 40) : 80,
  };
}

// Singleton to prevent multiple overlays
let overlayInstanceCount = 0;

export const DebugOverlay = ({
  fabSize = 56,
  initialPosition,
  fabStyle,
  fabTextStyle,
  fabIcon = '⚡',
}: DebugOverlayProps = {}) => {
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
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const defaultPosition = initialPosition ?? getDefaultPosition(screenHeight);

  const positionRef = useRef(defaultPosition);
  const [position, setPosition] = useState(defaultPosition);
  const isDragging = useRef(false);
  const dragStartTime = useRef(0);
  const startPosition = useRef(defaultPosition);
  const fabSizeRef = useRef(fabSize);
  fabSizeRef.current = fabSize;
  const screenRef = useRef({ width: screenWidth, height: screenHeight });
  screenRef.current = { width: screenWidth, height: screenHeight };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const threshold = Platform.OS === 'android' ? 3 : 5;
        return Math.abs(gestureState.dx) > threshold || Math.abs(gestureState.dy) > threshold;
      },
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,

      onPanResponderGrant: () => {
        dragStartTime.current = Date.now();
        isDragging.current = false;
        startPosition.current = { ...positionRef.current };
      },

      onPanResponderMove: (_, gestureState) => {
        const threshold = Platform.OS === 'android' ? 3 : 5;
        if (Math.abs(gestureState.dx) > threshold || Math.abs(gestureState.dy) > threshold) {
          isDragging.current = true;
        }

        if (isDragging.current) {
          const newX = startPosition.current.x + gestureState.dx;
          const newY = startPosition.current.y + gestureState.dy;
          const size = fabSizeRef.current;
          const { width, height } = screenRef.current;
          const maxX = width - size - 10;
          const maxY = height - size - (Platform.OS === 'android' ? 100 : 80);
          const minX = 10;
          const minY = Platform.OS === 'android' ? 50 : 60;
          const next = {
            x: Math.max(minX, Math.min(maxX, newX)),
            y: Math.max(minY, Math.min(maxY, newY)),
          };
          positionRef.current = next;
          setPosition(next);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const dragDuration = Date.now() - dragStartTime.current;
        const dragDistance = Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);

        const tapThreshold = Platform.OS === 'android' ? 15 : 10;
        const tapDuration = Platform.OS === 'android' ? 300 : 200;
        if (dragDuration < tapDuration && dragDistance < tapThreshold) {
          isDragging.current = false;
          setOpen(true);
        } else {
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
            width: fabSize,
            height: fabSize,
            borderRadius: fabSize / 2,
          },
          fabStyle,
        ]}
        {...pan.panHandlers}
      >
        <TouchableOpacity
          onPress={() => {
            if (!isDragging.current) {
              setOpen(true);
            }
          }}
          activeOpacity={0.8}
          style={[styles.fabTouchable, { borderRadius: fabSize / 2 }]}
        >
          <Text style={[styles.fabText, fabTextStyle]}>{fabIcon}</Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'ios' ? (
        <Modal 
          visible={open} 
          animationType="slide"
          onRequestClose={() => setOpen(false)}
          presentationStyle="pageSheet"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.title}>Debug Overlay</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.close}>Done</Text>
              </TouchableOpacity>
            </View>
            <Tabs />
          </View>
        </Modal>
      ) : (
        open && (
          <View style={styles.androidFullScreenOverlay}>
            <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />
            <View style={styles.androidModalContainer}>
              <View style={styles.androidModalHeader}>
                <Text style={styles.title}>Debug Overlay</Text>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Text style={styles.close}>✕ Close</Text>
                </TouchableOpacity>
              </View>
              <Tabs />
            </View>
          </View>
        )
      )}
    </>
  );
};

const Tabs = () => {
  const [tab, setTab] = useState<'logs'|'net'|'perf'|'device'>('logs');
  const { logs, requests } = useDebug();
  
  // Debug logging for Android (removed to prevent infinite loop)
  
  async function exportAll() { const payload = JSON.stringify({ logs, requests }, null, 2); try { await Share.share({ message: payload }); } catch {} }
  
  const renderTabContent = () => {
    switch(tab) {
      case 'logs':
        return <LogsTab />;
      case 'net':
        return <NetworkTab />;
      case 'perf':
        return <PerfTab />;
      case 'device':
        return <DeviceTab />;
      default:
        return <Text style={{padding: 20, color: '#000'}}>Unknown tab: {tab}</Text>;
    }
  };
  
  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabbar}>
        {(['logs','net','perf','device'] as const).map(t => (
          <TouchableOpacity 
            key={t} 
            onPress={() => {
              setTab(t);
            }} 
            style={[styles.tab, tab===t && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab===t && styles.activeTabText]}>{t.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={exportAll} style={styles.export}>
          <Text style={styles.exportText}>Export</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabContent}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  fab: { 
    position: 'absolute', 
    zIndex: 999999,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Platform.OS === 'android' ? '#FF6B35' : '#007AFF', 
    elevation: Platform.OS === 'android' ? 20 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: Platform.OS === 'ios' ? 8 : 8 },
    shadowOpacity: Platform.OS === 'ios' ? 0.8 : 0.8,
    shadowRadius: Platform.OS === 'ios' ? 16 : 15,
    borderWidth: Platform.OS === 'android' ? 3 : 3,
    borderColor: Platform.OS === 'android' ? '#FFFFFF' : '#FFFFFF'
  },
  fabTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  fabText: { 
    color: '#FFFFFF', 
    fontSize: 24, 
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },

  title: { fontSize: 18, fontWeight: '600' },
  close: { 
    color: '#007aff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  tabbar: { 
    flexDirection: 'row', 
    gap: 4, 
    padding: 8, 
    alignItems:'center', 
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    minHeight: 50,
    flexWrap: 'wrap',
  },
  tab: { 
    paddingHorizontal: 8, 
    paddingVertical: 6, 
    borderRadius: 6, 
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 50,
    alignItems: 'center',
    flex: 1,
  },
  activeTab: { 
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  export: { 
    paddingHorizontal: 8, 
    paddingVertical: 6, 
    borderRadius: 6, 
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
    minWidth: 50,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333333',
  },
  activeTabText: {
    color: '#ffffff',
  },
  exportText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  tabsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: { 
    paddingTop: 20, 
    paddingHorizontal: 16, 
    paddingBottom: 12, 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
  },
  androidFullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    backgroundColor: '#ffffff',
  },
  androidModalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  androidModalHeader: { 
    paddingTop: 50, 
    paddingHorizontal: 16, 
    paddingBottom: 12, 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f8f9fa',
    elevation: 4,
  }
});