export type ConsoleLevel = 'log' | 'warn' | 'error';
export type ConsoleEntry = { level: ConsoleLevel; message: any[]; timestamp: number; };

// Early buffer to capture logs before DebugProvider mounts
let earlyBuffer: ConsoleEntry[] = [];
let earlyProxyInstalled = false;
let currentOnEntry: ((e: ConsoleEntry) => void) | null = null;

// Install early proxy that buffers logs until real onEntry is available
export function installEarlyConsoleProxy() {
  if (earlyProxyInstalled) return;
  earlyProxyInstalled = true;
  
  const original = { log: console.log, warn: console.warn, error: console.error };
  (['log','warn','error'] as ConsoleLevel[]).forEach(level => {
    const orig = (original as any)[level];
    (console as any)[level] = (...args: any[]) => {
      const entry = { level, message: args, timestamp: Date.now() };
      
      if (currentOnEntry) {
        // Real onEntry is available, send directly
        try { currentOnEntry(entry); } catch {}
      } else {
        // Buffer for later
        earlyBuffer.push(entry);
      }
      
      orig.apply(console, args);
    };
  });
}

export function installConsoleProxy(onEntry: (e: ConsoleEntry) => void) {
  currentOnEntry = onEntry;
  
  // Send any buffered logs
  earlyBuffer.forEach(entry => {
    try { onEntry(entry); } catch {}
  });
  earlyBuffer = []; // Clear buffer
  
  // If early proxy wasn't installed, install it now
  if (!earlyProxyInstalled) {
    installEarlyConsoleProxy();
  }
  
  return () => { 
    currentOnEntry = null;
    // Don't restore console here, keep the proxy active for potential re-initialization
  };
}