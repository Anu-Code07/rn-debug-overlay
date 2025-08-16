# @anurag/rn-debug-overlay (Vite build)

In-app debug overlay for React Native (iOS, Android, Web). Zero native modules.

## Install
```bash
npm i @anurag/rn-debug-overlay
# or
yarn add @anurag/rn-debug-overlay
```

## Usage
```tsx
import React from 'react';
import { DebugProvider, DebugOverlay } from '@anurag/rn-debug-overlay';
import axios from 'axios';

export default function App() {
  return (
    <DebugProvider axios={axios} enabled={__DEV__}>
      {/* your app */}
      <DebugOverlay />
    </DebugProvider>
  );
}
```

## Build (library mode with Vite)
```bash
npm run build
```

Outputs `dist/index.js` (ESM), `dist/index.cjs` (CJS), and `dist/index.d.ts` (types).
