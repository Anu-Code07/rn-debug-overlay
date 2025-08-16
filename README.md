# ⚡ React Native Debug Overlay

**In-app debug overlay for React Native** (iOS, Android, Web) with zero native modules.

🔍 **Console Logs** • 🌐 **Network Monitoring** • ⚡ **Performance Metrics** • 📱 **Device Info** • 💾 **Export Data**

![Debug Overlay Demo](https://img.shields.io/badge/React%20Native-Debug%20Overlay-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-green) ![Zero Dependencies](https://img.shields.io/badge/Native%20Modules-Zero-orange)

## ✨ Features

- 📋 **Console Logs**: Capture all `console.log`, `console.warn`, `console.error` calls
- 🌐 **Network Monitoring**: Track fetch & axios requests with full request/response details
- ⚡ **Performance Metrics**: Real-time JS FPS and Event Loop Lag monitoring
- 📱 **Device Information**: Platform, screen size, Hermes detection
- 🎯 **Floating UI**: Draggable lightning bolt trigger, modern Material Design
- 💾 **Export Functionality**: Share debug data as JSON
- 🎨 **Dark/Light Theme**: Adapts to your app's theme
- 🔄 **Zero Setup**: Works automatically with existing code

## 📦 Installation

```bash
npm install @anurag/rn-debug-overlay
# or
yarn add @anurag/rn-debug-overlay
```

## 🚀 Quick Start

### Basic Setup
```tsx
import React from 'react';
import { DebugProvider, DebugOverlay } from '@anurag/rn-debug-overlay';

export default function App() {
  return (
    <DebugProvider enabled={__DEV__}>
      {/* Your app content */}
      <YourAppContent />
      <DebugOverlay />
    </DebugProvider>
  );
}
```

### Enhanced Setup (Capture All Logs)
```tsx
import { installEarlyConsoleProxy, DebugProvider, DebugOverlay } from '@anurag/rn-debug-overlay';
import axios from 'axios';

// Install early proxy to capture logs from app startup
installEarlyConsoleProxy();

export default function App() {
  console.log('This will be captured!'); // ✅ Captured from app start
  
  return (
    <DebugProvider 
      axios={axios}           // Track axios requests
      enabled={__DEV__}       // Only in development
      capacity={500}          // Buffer size (default: 300)
    >
      <YourAppContent />
      <DebugOverlay />
    </DebugProvider>
  );
}
```

### Expo Router Setup
```tsx
// app/_layout.tsx
import { installEarlyConsoleProxy, DebugProvider, DebugOverlay } from '@anurag/rn-debug-overlay';

installEarlyConsoleProxy();

export default function RootLayout() {
  return (
    <DebugProvider enabled={__DEV__}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <DebugOverlay />
    </DebugProvider>
  );
}
```

## 🎯 What You'll See

### 📋 LOGS Tab
- All console logs with timestamps
- Color-coded: red (errors), yellow (warnings), blue (logs)
- Floating trash button to clear logs

### 🌐 NETWORK Tab
**Tap any request to expand full details:**
```
GET https://api.example.com/users
Status: 200 | 245ms | ↑1.2kb | ↓3.4kb
▶ Show Details

📤 Request Headers:
   Authorization: Bearer xyz123
   Content-Type: application/json

📤 Request Body:
   { "userId": 123 }

📥 Response Headers:
   Content-Type: application/json
   
📥 Response Body:
   { "users": [...] }
```

### ⚡ PERF Tab
- **JS FPS**: JavaScript thread performance
- **Event Loop Lag**: Real-time latency metrics

### 📱 DEVICE Tab
- Platform info, screen dimensions, Hermes detection

## ⚙️ Configuration

```tsx
<DebugProvider
  enabled={__DEV__}        // Enable/disable overlay
  capacity={500}           // Log buffer size (default: 300)
  axios={axiosInstance}    // Axios instance to monitor (optional)
>
```

## 🛠️ API Reference

### Components
- `DebugProvider` - Context provider for debug functionality
- `DebugOverlay` - Floating debug trigger button

### Hooks
- `useDebug()` - Access debug context (logs, requests, device info)

### Functions
- `installEarlyConsoleProxy()` - Capture logs from app startup

## 🔧 Advanced Usage

### Custom Axios Instance
```tsx
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'Authorization': 'Bearer token' }
});

<DebugProvider axios={apiClient}>
  <App />
</DebugProvider>
```

### Multiple Network Libraries
```tsx
// Works with both fetch and axios simultaneously
fetch('/api/users');           // ✅ Tracked
axios.get('/api/posts');       // ✅ Tracked
apiClient.post('/api/data');   // ✅ Tracked
```

### Programmatic Access
```tsx
import { useDebug } from '@anurag/rn-debug-overlay';

function MyComponent() {
  const { logs, requests, clearLogs, clearRequests } = useDebug();
  
  // Access debug data programmatically
  console.log('Current logs:', logs.length);
  console.log('Network requests:', requests.length);
}
```

## 🎨 UI Features

- **⚡ Lightning Bolt**: Floating draggable trigger button
- **🗑️ Clear FABs**: Material Design floating action buttons
- **📱 Responsive**: Works on all screen sizes
- **🎯 Expandable Cards**: Tap network requests for full details
- **📜 Infinite Scroll**: Handles thousands of logs efficiently

## 🐛 Troubleshooting

### Missing Early Logs?
```tsx
// Make sure installEarlyConsoleProxy() is called FIRST
import { installEarlyConsoleProxy } from '@anurag/rn-debug-overlay';
installEarlyConsoleProxy(); // Must be first line!

// Then other imports...
import React from 'react';
```

### TypeScript Errors?
```bash
# Clear cache and reinstall
npm uninstall @anurag/rn-debug-overlay
rm -rf node_modules/.cache
npm install @anurag/rn-debug-overlay
```



## 🏗️ Development

```bash
# Clone and setup
git clone <repo>
cd rn-debug-overlay-vite
npm install

# Build library
npm run build

# Create package
npm pack
```

## 📄 License

MIT © [Anurag Singh]

---

**Made with ⚡ for React Native developers**
