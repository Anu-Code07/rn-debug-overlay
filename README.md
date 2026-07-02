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
npm install rn-debug-overlay
```

## 🚀 Usage

```tsx
import { DebugProvider, DebugOverlay, installEarlyConsoleProxy } from 'rn-debug-overlay';

// Optional: Capture logs from app startup
installEarlyConsoleProxy();

export default function App() {
  return (
    <DebugProvider enabled={__DEV__} axios={axios}> // provide the axiosInstace you are using for networklogs (optional, defaults to fetch)
      <YourAppContent />
      <DebugOverlay />
    </DebugProvider>
  );
}
```

Tap the ⚡ lightning bolt to open the debug overlay with 4 tabs: LOGS, NET, PERF, DEVICE.

## 🎨 Customizing the Overlay

`DebugOverlay` accepts optional props to control size, position, and appearance:

```tsx
<DebugOverlay
  fabSize={48}
  initialPosition={{ x: 300, y: 100 }}
  fabIcon="🐛"
  fabStyle={{ backgroundColor: '#6c5ce7' }}
  fabTextStyle={{ fontSize: 20 }}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fabSize` | `number` | `56` | Diameter of the floating button (px) |
| `initialPosition` | `{ x, y }` | top-left safe area | Starting screen position |
| `fabStyle` | `ViewStyle` | — | Extra styles merged onto the FAB |
| `fabTextStyle` | `TextStyle` | — | Extra styles for the icon text |
| `fabIcon` | `string` | `"⚡"` | Icon or emoji inside the FAB |

## 📴 Offline / Production Builds

When you bundle your app as an **offline package** or **release build**, `__DEV__` is `false`. If you use `enabled={__DEV__}`, the debug overlay will not capture any logs or network requests.

To debug offline or production builds, explicitly enable the provider:

```tsx
// Option A: always on (useful for internal QA builds)
<DebugProvider enabled={true}>
  <YourAppContent />
  <DebugOverlay />
</DebugProvider>

// Option B: toggle via your own flag (recommended)
const DEBUG = true; // or read from AsyncStorage / env config
<DebugProvider enabled={DEBUG}>
  <YourAppContent />
  {DEBUG && <DebugOverlay />}
</DebugProvider>
```

Also call `installEarlyConsoleProxy()` **before** your app mounts so startup logs are captured:

```tsx
import { installEarlyConsoleProxy } from 'rn-debug-overlay';
installEarlyConsoleProxy();
```

> **Note:** Some release bundlers strip `console.*` calls via Babel. If logs still don't appear, disable console removal in your Babel config (e.g. remove `transform-remove-console` plugin) for debug builds.