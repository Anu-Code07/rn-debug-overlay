export function installAxiosProxy(axios: any, onEntry: (e: any) => void) {
  if (!axios?.interceptors) return;
  const reqId = new WeakMap<object, { id: string; startedAt: number; requestData: any }>();
  
  const reqI = axios.interceptors.request.use((config: any) => {
    const id = Math.random().toString(36).slice(2);
    
    // Capture request data
    let requestBody = '';
    try {
      if (config.data) {
        if (typeof config.data === 'string') {
          requestBody = config.data;
        } else {
          requestBody = JSON.stringify(config.data, null, 2);
        }
      }
    } catch {
      requestBody = '[Unable to serialize]';
    }
    
    const requestData = {
      requestHeaders: config.headers || {},
      requestBody
    };
    
    reqId.set(config, { id, startedAt: Date.now(), requestData });
    return config;
  });
  
  const resI = axios.interceptors.response.use(
    (response: any) => {
      const meta = reqId.get(response.config) || { 
        id: Math.random().toString(36).slice(2), 
        startedAt: Date.now(),
        requestData: { requestHeaders: {}, requestBody: '' }
      };
      
      // Capture response data
      let responseBody = '';
      try {
        if (response.data) {
          if (typeof response.data === 'string') {
            responseBody = response.data;
          } else {
            responseBody = JSON.stringify(response.data, null, 2);
          }
        }
      } catch {
        responseBody = '[Unable to serialize]';
      }
      
      onEntry({ 
        id: meta.id, 
        type: 'axios', 
        method: (response.config.method || 'GET').toUpperCase(), 
        url: response.config.url, 
        startedAt: meta.startedAt, 
        endedAt: Date.now(), 
        status: response.status, 
        durationMs: Date.now() - meta.startedAt,
        requestHeaders: meta.requestData.requestHeaders,
        requestBody: meta.requestData.requestBody,
        responseHeaders: response.headers || {},
        responseBody
      });
      return response;
    },
    (error: any) => {
      const cfg = error.config || {};
      const meta = reqId.get(cfg) || { 
        id: Math.random().toString(36).slice(2), 
        startedAt: Date.now(),
        requestData: { requestHeaders: {}, requestBody: '' }
      };
      
      onEntry({ 
        id: meta.id, 
        type: 'axios', 
        method: (cfg.method || 'GET').toUpperCase(), 
        url: cfg.url, 
        startedAt: meta.startedAt, 
        endedAt: Date.now(), 
        durationMs: Date.now() - meta.startedAt,
        requestHeaders: meta.requestData.requestHeaders,
        requestBody: meta.requestData.requestBody,
        error: String(error?.message || error) 
      });
      return Promise.reject(error);
    }
  );
  return () => { axios.interceptors.request.eject(reqI); axios.interceptors.response.eject(resI); };
}