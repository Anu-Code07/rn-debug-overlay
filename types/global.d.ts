declare global {
  var __DEV__: boolean;
  var global: typeof globalThis;
  
  namespace globalThis {
    var HermesInternal: any;
    var fetch: typeof fetch;
  }
}

export {};
