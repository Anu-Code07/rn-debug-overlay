export type NetworkEntry = {
  id: string; type: 'fetch' | 'axios'; method: string; url: string; startedAt: number;
  endedAt?: number; status?: number; ok?: boolean; durationMs?: number; reqBytes?: number; resBytes?: number; error?: string;
};
export function installFetchProxy(onEntry: (e: NetworkEntry) => void) {
  if (typeof (global as any).fetch !== 'function') return () => {};
  const original = (global as any).fetch.bind(global);
  (global as any).fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : (input as any).url;
    const method = (init?.method || 'GET').toUpperCase();
    const id = Math.random().toString(36).slice(2);
    const startedAt = Date.now();
    let reqBytes = 0;
    try { const body = init?.body as any; if (typeof body === 'string') reqBytes = body.length; else if (body && 'size' in body) reqBytes = (body as any).size as number; } catch {}
    try {
      const res = await original(input as any, init as any);
      const clone = res.clone();
      let resBytes = 0; try { const text = await clone.text(); resBytes = text.length; } catch {}
      const endedAt = Date.now();
      onEntry({ id, type: 'fetch', method, url, startedAt, endedAt, status: res.status, ok: res.ok, durationMs: endedAt - startedAt, reqBytes, resBytes });
      return res;
    } catch (err: any) {
      const endedAt = Date.now();
      onEntry({ id, type: 'fetch', method, url, startedAt, endedAt, durationMs: endedAt - startedAt, reqBytes, error: String(err?.message || err) });
      throw err;
    }
  };
  return () => { (global as any).fetch = original; };
}