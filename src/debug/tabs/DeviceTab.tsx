import React from 'react';
import { View, Text } from 'react-native';
import { useDebug } from '../DebugProvider';
export const DeviceTab = () => {
  const { device } = useDebug();
  return (
    <View style={{ padding: 12 }}>
      {Object.entries(device).map(([k,v]) => (
        <Text key={k} style={{ marginBottom: 6 }}>{k}: {typeof v === 'object' ? JSON.stringify(v) : String(v)}</Text>
      ))}
    </View>
  );
};