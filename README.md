# ⚡ React Native Debug Overlay

In-app debug overlay for React Native (iOS, Android, Web) with zero native modules.

## ✨ Core Features

- **📋 Console Logs**: Capture all console.log/warn/error calls with timestamps
- **🌐 Network Monitoring**: Track fetch & axios requests with full request/response details  
- **⚡ Performance**: Real-time JS FPS and Event Loop Lag metrics
- **📱 Device Info**: Platform, screen size, Hermes detection
- **💾 Export**: Share debug data as JSON

## 📦 Installation

```bash
npm install @anurag/rn-debug-overlay
```

## 🚀 Usage

```tsx
import { DebugProvider, DebugOverlay, installEarlyConsoleProxy } from '@anurag/rn-debug-overlay';

// Optional: Capture logs from app startup
installEarlyConsoleProxy();

export default function App() {
  return (
    <DebugProvider enabled={__DEV__} axios={axios}>
      <YourAppContent />
      <DebugOverlay />
    </DebugProvider>
  );
}
```

Tap the ⚡ lightning bolt to open the debug overlay with 4 tabs: LOGS, NET, PERF, DEVICE.