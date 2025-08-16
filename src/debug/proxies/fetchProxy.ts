export type NetworkEntry = {
  id: string; type: 'fetch' | 'axios'; method: string; url: string; startedAt: number;
  endedAt?: number; status?: number; ok?: boolean; durationMs?: number; reqBytes?: number; resBytes?: number; error?: string;
  requestHeaders?: Record<string, string>; requestBody?: string; responseHeaders?: Record<string, string>; responseBody?: string;
};
export function installFetchProxy(onEntry: (e: NetworkEntry) => void) {
  if (typeof (global as any).fetch !== 'function') return () => {};
  const original = (global as any).fetch.bind(global);
  (global as any).fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : (input as any).url;
    const method = (init?.method || 'GET').toUpperCase();
    const id = Math.random().toString(36).slice(2);
    const startedAt = Date.now();
    
    // Capture request data
    let requestBody = '';
    let reqBytes = 0;
    let requestHeaders: Record<string, string> = {};
    
    try {
      // Capture request headers
      if (init?.headers) {
        if (init.headers instanceof Headers) {
          init.headers.forEach((value: string, key: string) => { requestHeaders[key] = value; });
        } else {
          requestHeaders = { ...init.headers as Record<string, string> };
        }
      }
      
      // Capture request body
      const body = init?.body as any;
      if (typeof body === 'string') {
        requestBody = body;
        reqBytes = body.length;
      } else if (body && 'size' in body) {
        reqBytes = (body as any).size as number;
        requestBody = '[Binary Data]';
      } else if (body) {
        requestBody = String(body);
        reqBytes = requestBody.length;
      }
    } catch {}
    
    try {
      const res = await original(input as any, init as any);
      const clone = res.clone();
      
      // Capture response data
      let responseBody = '';
      let resBytes = 0;
      let responseHeaders: Record<string, string> = {};
      
      try {
        // Capture response headers
        res.headers.forEach((value: string, key: string) => { responseHeaders[key] = value; });
        
        // Capture response body
        const text = await clone.text();
        responseBody = text;
        resBytes = text.length;
        
        // Try to pretty-print JSON
        try {
          const json = JSON.parse(text);
          responseBody = JSON.stringify(json, null, 2);
        } catch {
          // Not JSON, keep as text
        }
      } catch {}
      
      const endedAt = Date.now();
      onEntry({ 
        id, type: 'fetch', method, url, startedAt, endedAt, 
        status: res.status, ok: res.ok, durationMs: endedAt - startedAt, 
        reqBytes, resBytes, requestHeaders, requestBody, responseHeaders, responseBody
      });
      return res;
    } catch (err: any) {
      const endedAt = Date.now();
      onEntry({ 
        id, type: 'fetch', method, url, startedAt, endedAt, 
        durationMs: endedAt - startedAt, reqBytes, requestHeaders, requestBody,
        error: String(err?.message || err) 
      });
      throw err;
    }
  };
  return () => { (global as any).fetch = original; };
}