import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Platform, Dimensions, PixelRatio } from 'react-native';
import { RingBuffer } from './store/buffer';
import { installConsoleProxy, ConsoleEntry } from './proxies/consoleProxy';
import { installFetchProxy, NetworkEntry } from './proxies/fetchProxy';
import { installAxiosProxy } from './proxies/axiosProxy';
import { useFps } from './perf/useFps';
import { useEventLoopLag } from './perf/useEventLoopLag';

type DebugContextType = {
  logs: ConsoleEntry[];
  requests: NetworkEntry[];
  jsFps: number;
  loopLagMs: number;
  device: Record<string, any>;
  clearLogs(): void;
  clearRequests(): void;
};

const DebugContext = createContext<DebugContextType | null>(null);
export const useDebug = () => {
  const ctx = useContext(DebugContext);
  if (!ctx) throw new Error('useDebug must be used within DebugProvider');
  return ctx;
};

interface DebugProviderProps {
  children: React.ReactNode;
  axios?: any;
  capacity?: number;
  enabled?: boolean;
}

export const DebugProvider = ({ children, axios, capacity = 300, enabled = typeof __DEV__ !== 'undefined' ? __DEV__ : true }: DebugProviderProps) => {
  const logBuf = useRef(new RingBuffer<ConsoleEntry>(capacity));
  const reqBuf = useRef(new RingBuffer<NetworkEntry>(capacity));
  const [, setTick] = useState(0);

  // Debounced state update to batch multiple rapid log calls
  const scheduleUpdate = useCallback(() => {
    setTimeout(() => setTick((t: number) => t + 1), 0);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    
    const restoreConsole = installConsoleProxy((e) => { 
      logBuf.current.push(e); 
      scheduleUpdate();
    });
    const restoreFetch = installFetchProxy((e) => { 
      reqBuf.current.push(e); 
      scheduleUpdate();
    });
    const restoreAxios = installAxiosProxy(axios, (e) => { 
      reqBuf.current.push(e); 
      scheduleUpdate();
    });
    
    return () => { restoreAxios?.(); restoreFetch(); restoreConsole(); };
  }, [enabled, axios, scheduleUpdate]);

  const jsFps = useFps(enabled);
  const loopLagMs = useEventLoopLag(enabled);

  const device = useMemo(() => ({
    platform: Platform.OS,
    version: Platform.Version,
    screen: Dimensions.get('window'),
    pixelRatio: PixelRatio.get(),
    hermes: !!(global as any).HermesInternal,
  }), []);

  const value: DebugContextType = {
    logs: logBuf.current.toArray(),
    requests: reqBuf.current.toArray(),
    jsFps, loopLagMs, device,
    clearLogs: () => { 
      logBuf.current.clear(); 
      setTimeout(() => setTick((t: number) => t + 1), 0);
    },
    clearRequests: () => { 
      reqBuf.current.clear(); 
      setTimeout(() => setTick((t: number) => t + 1), 0);
    },
  };

  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
};