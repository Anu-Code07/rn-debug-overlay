export function installAxiosProxy(axios: any, onEntry: (e: any) => void) {
  if (!axios?.interceptors) return;
  const reqId = new WeakMap<object, { id: string; startedAt: number }>();
  const reqI = axios.interceptors.request.use((config: any) => {
    const id = Math.random().toString(36).slice(2);
    reqId.set(config, { id, startedAt: Date.now() });
    return config;
  });
  const resI = axios.interceptors.response.use(
    (response: any) => {
      const meta = reqId.get(response.config) || { id: Math.random().toString(36).slice(2), startedAt: Date.now() };
      onEntry({ id: meta.id, type: 'axios', method: (response.config.method || 'GET').toUpperCase(), url: response.config.url, startedAt: meta.startedAt, endedAt: Date.now(), status: response.status, durationMs: Date.now() - meta.startedAt });
      return response;
    },
    (error: any) => {
      const cfg = error.config || {};
      const meta = reqId.get(cfg) || { id: Math.random().toString(36).slice(2), startedAt: Date.now() };
      onEntry({ id: meta.id, type: 'axios', method: (cfg.method || 'GET').toUpperCase(), url: cfg.url, startedAt: meta.startedAt, endedAt: Date.now(), durationMs: Date.now() - meta.startedAt, error: String(error?.message || error) });
      return Promise.reject(error);
    }
  );
  return () => { axios.interceptors.request.eject(reqI); axios.interceptors.response.eject(resI); };
}