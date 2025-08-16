export type ConsoleLevel = 'log' | 'warn' | 'error';
export type ConsoleEntry = { level: ConsoleLevel; message: any[]; timestamp: number; };
export function installConsoleProxy(onEntry: (e: ConsoleEntry) => void) {
  const original = { log: console.log, warn: console.warn, error: console.error };
  (['log','warn','error'] as ConsoleLevel[]).forEach(level => {
    const orig = (original as any)[level];
    (console as any)[level] = (...args: any[]) => {
      try { onEntry({ level, message: args, timestamp: Date.now() }); } catch {}
      orig.apply(console, args);
    };
  });
  return () => { (console as any).log = original.log; (console as any).warn = original.warn; (console as any).error = original.error; };
}