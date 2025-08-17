"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require$$0 = require("react");
const reactNative = require("react-native");
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  "production" !== process.env.NODE_ENV && function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
      self = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        self,
        source,
        getOwner(),
        maybeKey,
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = require$$0, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
      React,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = function(type, config, maybeKey, source, self) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        source,
        self,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_development.jsxs = function(type, config, maybeKey, source, self) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        source,
        self,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  }();
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
class RingBuffer {
  constructor(capacity) {
    this.capacity = capacity;
    this.idx = 0;
    this.filled = false;
    this.data = new Array(capacity);
  }
  push(item) {
    this.data[this.idx] = item;
    this.idx = (this.idx + 1) % this.capacity;
    if (this.idx === 0) this.filled = true;
  }
  toArray() {
    return (this.filled ? [...this.data.slice(this.idx), ...this.data.slice(0, this.idx)] : this.data.slice(0, this.idx)).filter(Boolean);
  }
  clear() {
    this.idx = 0;
    this.filled = false;
    this.data = new Array(this.capacity);
  }
}
let earlyBuffer = [];
let earlyProxyInstalled = false;
let currentOnEntry = null;
function installEarlyConsoleProxy() {
  if (earlyProxyInstalled) return;
  earlyProxyInstalled = true;
  const original = { log: console.log, warn: console.warn, error: console.error };
  ["log", "warn", "error"].forEach((level) => {
    const orig = original[level];
    console[level] = (...args) => {
      const entry = { level, message: args, timestamp: Date.now() };
      if (currentOnEntry) {
        try {
          currentOnEntry(entry);
        } catch {
        }
      } else {
        earlyBuffer.push(entry);
      }
      orig.apply(console, args);
    };
  });
}
function installConsoleProxy(onEntry) {
  currentOnEntry = onEntry;
  earlyBuffer.forEach((entry) => {
    try {
      onEntry(entry);
    } catch {
    }
  });
  earlyBuffer = [];
  if (!earlyProxyInstalled) {
    installEarlyConsoleProxy();
  }
  return () => {
    currentOnEntry = null;
  };
}
function installFetchProxy(onEntry) {
  if (typeof global.fetch !== "function") return () => {
  };
  const original = global.fetch.bind(global);
  global.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input.url;
    const method = ((init == null ? void 0 : init.method) || "GET").toUpperCase();
    const id = Math.random().toString(36).slice(2);
    const startedAt = Date.now();
    let requestBody = "";
    let reqBytes = 0;
    let requestHeaders = {};
    try {
      if (init == null ? void 0 : init.headers) {
        if (init.headers instanceof Headers) {
          init.headers.forEach((value, key) => {
            requestHeaders[key] = value;
          });
        } else {
          requestHeaders = { ...init.headers };
        }
      }
      const body = init == null ? void 0 : init.body;
      if (typeof body === "string") {
        requestBody = body;
        reqBytes = body.length;
      } else if (body && "size" in body) {
        reqBytes = body.size;
        requestBody = "[Binary Data]";
      } else if (body) {
        requestBody = String(body);
        reqBytes = requestBody.length;
      }
    } catch {
    }
    try {
      const res = await original(input, init);
      const clone = res.clone();
      let responseBody = "";
      let resBytes = 0;
      let responseHeaders = {};
      try {
        res.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        const text = await clone.text();
        responseBody = text;
        resBytes = text.length;
        try {
          const json = JSON.parse(text);
          responseBody = JSON.stringify(json, null, 2);
        } catch {
        }
      } catch {
      }
      const endedAt = Date.now();
      onEntry({
        id,
        type: "fetch",
        method,
        url,
        startedAt,
        endedAt,
        status: res.status,
        ok: res.ok,
        durationMs: endedAt - startedAt,
        reqBytes,
        resBytes,
        requestHeaders,
        requestBody,
        responseHeaders,
        responseBody
      });
      return res;
    } catch (err) {
      const endedAt = Date.now();
      onEntry({
        id,
        type: "fetch",
        method,
        url,
        startedAt,
        endedAt,
        durationMs: endedAt - startedAt,
        reqBytes,
        requestHeaders,
        requestBody,
        error: String((err == null ? void 0 : err.message) || err)
      });
      throw err;
    }
  };
  return () => {
    global.fetch = original;
  };
}
function installAxiosProxy(axios, onEntry) {
  if (!(axios == null ? void 0 : axios.interceptors)) return;
  const reqId = /* @__PURE__ */ new WeakMap();
  const reqI = axios.interceptors.request.use((config) => {
    const id = Math.random().toString(36).slice(2);
    let requestBody = "";
    try {
      if (config.data) {
        if (typeof config.data === "string") {
          requestBody = config.data;
        } else {
          requestBody = JSON.stringify(config.data, null, 2);
        }
      }
    } catch {
      requestBody = "[Unable to serialize]";
    }
    const requestData = {
      requestHeaders: config.headers || {},
      requestBody
    };
    reqId.set(config, { id, startedAt: Date.now(), requestData });
    return config;
  });
  const resI = axios.interceptors.response.use(
    (response) => {
      const meta = reqId.get(response.config) || {
        id: Math.random().toString(36).slice(2),
        startedAt: Date.now(),
        requestData: { requestHeaders: {}, requestBody: "" }
      };
      let responseBody = "";
      try {
        if (response.data) {
          if (typeof response.data === "string") {
            responseBody = response.data;
          } else {
            responseBody = JSON.stringify(response.data, null, 2);
          }
        }
      } catch {
        responseBody = "[Unable to serialize]";
      }
      onEntry({
        id: meta.id,
        type: "axios",
        method: (response.config.method || "GET").toUpperCase(),
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
    (error) => {
      const cfg = error.config || {};
      const meta = reqId.get(cfg) || {
        id: Math.random().toString(36).slice(2),
        startedAt: Date.now(),
        requestData: { requestHeaders: {}, requestBody: "" }
      };
      onEntry({
        id: meta.id,
        type: "axios",
        method: (cfg.method || "GET").toUpperCase(),
        url: cfg.url,
        startedAt: meta.startedAt,
        endedAt: Date.now(),
        durationMs: Date.now() - meta.startedAt,
        requestHeaders: meta.requestData.requestHeaders,
        requestBody: meta.requestData.requestBody,
        error: String((error == null ? void 0 : error.message) || error)
      });
      return Promise.reject(error);
    }
  );
  return () => {
    axios.interceptors.request.eject(reqI);
    axios.interceptors.response.eject(resI);
  };
}
function useFps(enabled = true) {
  const [fps, setFps] = require$$0.useState(0);
  const frames = require$$0.useRef(0);
  const last = require$$0.useRef(typeof performance !== "undefined" ? performance.now() : Date.now());
  const raf = require$$0.useRef(null);
  require$$0.useEffect(() => {
    if (!enabled || typeof requestAnimationFrame === "undefined") return;
    const loop = (t) => {
      frames.current++;
      if (t - last.current >= 1e3) {
        setFps(frames.current);
        frames.current = 0;
        last.current = t;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);
  return fps;
}
function useEventLoopLag(enabled = true, interval = 200) {
  const [lag, setLag] = require$$0.useState(0);
  require$$0.useEffect(() => {
    if (!enabled) return;
    let expected = Date.now() + interval;
    const id = setInterval(() => {
      const now = Date.now();
      const drift = now - expected;
      expected = now + interval;
      setLag(Math.max(0, drift));
    }, interval);
    return () => clearInterval(id);
  }, [enabled, interval]);
  return lag;
}
const DebugContext = require$$0.createContext(null);
const useDebug = () => {
  const ctx = require$$0.useContext(DebugContext);
  if (!ctx) throw new Error("useDebug must be used within DebugProvider");
  return ctx;
};
const DebugProvider = ({ children, axios, capacity = 300, enabled = typeof __DEV__ !== "undefined" ? __DEV__ : true }) => {
  const logBuf = require$$0.useRef(new RingBuffer(capacity));
  const reqBuf = require$$0.useRef(new RingBuffer(capacity));
  const [, setTick] = require$$0.useState(0);
  const scheduleUpdate = require$$0.useCallback(() => {
    setTimeout(() => setTick((t) => t + 1), 0);
  }, []);
  require$$0.useEffect(() => {
    if (!enabled) return;
    const restoreConsole = installConsoleProxy((e) => {
      logBuf.current.push(e);
      scheduleUpdate();
    });
    const restoreFetch = installFetchProxy((e) => {
      reqBuf.current.push(e);
      scheduleUpdate();
    });
    const restoreAxios = installAxiosProxy(axios, (e) => {
      reqBuf.current.push(e);
      scheduleUpdate();
    });
    return () => {
      restoreAxios == null ? void 0 : restoreAxios();
      restoreFetch();
      restoreConsole();
    };
  }, [enabled, axios, scheduleUpdate]);
  const jsFps = useFps(enabled);
  const loopLagMs = useEventLoopLag(enabled);
  const device = require$$0.useMemo(() => ({
    platform: reactNative.Platform.OS,
    version: reactNative.Platform.Version,
    screen: reactNative.Dimensions.get("window"),
    pixelRatio: reactNative.PixelRatio.get(),
    hermes: !!global.HermesInternal
  }), []);
  const value = {
    logs: logBuf.current.toArray(),
    requests: reqBuf.current.toArray(),
    jsFps,
    loopLagMs,
    device,
    clearLogs: () => {
      logBuf.current.clear();
      setTimeout(() => setTick((t) => t + 1), 0);
    },
    clearRequests: () => {
      reqBuf.current.clear();
      setTimeout(() => setTick((t) => t + 1), 0);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DebugContext.Provider, { value, children });
};
const LogsTab = () => {
  const { logs, clearLogs } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$3.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.View, { style: styles$3.header, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$3.headerText, children: [
      "Console Logs (",
      logs.length,
      ")"
    ] }) }),
    logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$3.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$3.emptyText, children: "No logs yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$3.emptySubText, children: "Console messages will appear here" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      reactNative.FlatList,
      {
        data: logs,
        keyExtractor: (_, i) => String(i),
        renderItem: ({ item }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: [styles$3.row, item.level === "error" && styles$3.err, item.level === "warn" && styles$3.warn], children: [
          "[",
          new Date(item.timestamp).toLocaleTimeString(),
          "] ",
          item.level.toUpperCase(),
          ": ",
          item.message.map(String).join(" ")
        ] }),
        contentContainerStyle: { paddingBottom: reactNative.Platform.OS === "ios" ? 140 : 80 },
        style: styles$3.list
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.TouchableOpacity, { style: styles$3.clearFab, onPress: clearLogs, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$3.clearFabText, children: "🗑️" }) })
  ] });
};
const styles$3 = reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef"
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500"
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center"
  },
  list: {
    flex: 1
  },
  row: {
    padding: 12,
    borderBottomWidth: reactNative.StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
    fontFamily: reactNative.Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" })
  },
  err: { color: "#b00020" },
  warn: { color: "#9c6f00" },
  clearFab: {
    position: "absolute",
    bottom: reactNative.Platform.OS === "ios" ? 100 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1e3
  },
  clearFabText: { fontSize: 20, color: "white" }
});
const NetworkRequestItem = ({ item }) => {
  const [expanded, setExpanded] = require$$0.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.TouchableOpacity, { onPress: () => setExpanded(!expanded), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$2.url, children: [
        item.method,
        " ",
        item.url
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$2.summary, children: [
        "Status: ",
        item.status ?? "—",
        " | ",
        item.durationMs ?? "—",
        "ms | ↑",
        item.reqBytes ?? 0,
        "b | ↓",
        item.resBytes ?? 0,
        "b"
      ] }),
      item.error && /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.error, children: item.error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$2.expandIcon, children: [
        expanded ? "▼" : "▶",
        " ",
        expanded ? "Hide" : "Show",
        " Details"
      ] })
    ] }),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.ScrollView, { style: styles$2.details, nestedScrollEnabled: true, children: [
      item.requestHeaders && Object.keys(item.requestHeaders).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.sectionTitle, children: "Request Headers:" }),
        Object.entries(item.requestHeaders).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$2.headerItem, children: [
          key,
          ": ",
          value
        ] }, key))
      ] }),
      item.requestBody && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.sectionTitle, children: "Request Body:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.bodyText, children: item.requestBody })
      ] }),
      item.responseHeaders && Object.keys(item.responseHeaders).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.sectionTitle, children: "Response Headers:" }),
        Object.entries(item.responseHeaders).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$2.headerItem, children: [
          key,
          ": ",
          value
        ] }, key))
      ] }),
      item.responseBody && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.sectionTitle, children: "Response Body:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.ScrollView, { style: styles$2.responseBodyContainer, nestedScrollEnabled: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.bodyText, children: item.responseBody }) })
      ] })
    ] })
  ] });
};
const NetworkTab = () => {
  const { requests, clearRequests } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.View, { style: styles$2.headerContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: styles$2.headerText, children: [
      "Network Requests (",
      requests.length,
      ")"
    ] }) }),
    requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$2.emptyContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.emptyText, children: "No network requests yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.emptySubText, children: "Network calls will appear here" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      reactNative.FlatList,
      {
        data: [...requests].reverse(),
        keyExtractor: (it) => it.id + String(it.endedAt || ""),
        renderItem: ({ item }) => /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkRequestItem, { item }),
        contentContainerStyle: { paddingBottom: reactNative.Platform.OS === "ios" ? 140 : 80 },
        style: { flex: 1 }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.TouchableOpacity, { style: styles$2.clearFab, onPress: clearRequests, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$2.clearFabText, children: "🗑️" }) })
  ] });
};
const styles$2 = reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerContainer: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef"
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500"
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center"
  },
  card: { padding: 12, borderBottomWidth: reactNative.StyleSheet.hairlineWidth, borderColor: "#e0e0e0" },
  url: { fontWeight: "600", fontSize: 14, marginBottom: 4 },
  summary: { fontSize: 12, color: "#666", marginBottom: 4 },
  error: { color: "#b00020", fontSize: 12, marginBottom: 4 },
  expandIcon: { fontSize: 12, color: "#007aff", marginTop: 4 },
  details: { marginTop: 8, maxHeight: 300, backgroundColor: "#f8f8f8", borderRadius: 4, padding: 8 },
  section: { marginBottom: 12 },
  sectionTitle: { fontWeight: "600", fontSize: 13, marginBottom: 4, color: "#333" },
  headerItem: { fontSize: 11, fontFamily: "monospace", marginBottom: 2, color: "#555" },
  bodyText: { fontSize: 11, fontFamily: "monospace", color: "#333", lineHeight: 14 },
  responseBodyContainer: { maxHeight: 120 },
  clearFab: {
    position: "absolute",
    bottom: reactNative.Platform.OS === "ios" ? 100 : 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 1e3
  },
  clearFabText: { fontSize: 20, color: "white" }
});
const PerfTab = () => {
  const { jsFps, loopLagMs } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles$1.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "JS FPS", value: String(jsFps) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Event Loop Lag (ms)", value: String(loopLagMs) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles$1.note, children: "Note: This reports JS thread FPS, not UI thread FPS." })
  ] });
};
const Metric = ({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: { marginBottom: 12 }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: { fontWeight: "600" }, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { children: value })
] });
const styles$1 = reactNative.StyleSheet.create({ container: { padding: 12 }, note: { color: "#666", marginTop: 8 } });
const DeviceTab = () => {
  const { device } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.View, { style: { padding: 12 }, children: Object.entries(device).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: { marginBottom: 6 }, children: [
    k,
    ": ",
    typeof v === "object" ? JSON.stringify(v) : String(v)
  ] }, k)) });
};
let overlayInstanceCount = 0;
const DebugOverlay = () => {
  const [instanceId] = require$$0.useState(() => ++overlayInstanceCount);
  require$$0.useEffect(() => {
    if (overlayInstanceCount > 1) {
      console.warn(`DebugOverlay: Multiple instances detected (${overlayInstanceCount}). Only one overlay should be rendered.`);
    }
    return () => {
      overlayInstanceCount--;
    };
  }, []);
  if (instanceId > 1) {
    return null;
  }
  const [open, setOpen] = require$$0.useState(false);
  const { width: screenWidth, height: screenHeight } = reactNative.Dimensions.get("window");
  const [position, setPosition] = require$$0.useState({
    x: 20,
    y: reactNative.Platform.OS === "ios" ? screenHeight > 800 ? 60 : 40 : 80
  });
  const isDragging = require$$0.useRef(false);
  const dragStartTime = require$$0.useRef(0);
  const startPosition = require$$0.useRef({
    x: 20,
    y: reactNative.Platform.OS === "ios" ? screenHeight > 800 ? 60 : 40 : 80
  });
  const fabSize = 56;
  const pan = require$$0.useRef(
    reactNative.PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const threshold = reactNative.Platform.OS === "android" ? 3 : 5;
        return Math.abs(gestureState.dx) > threshold || Math.abs(gestureState.dy) > threshold;
      },
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderGrant: () => {
        dragStartTime.current = Date.now();
        isDragging.current = false;
        startPosition.current = { x: position.x, y: position.y };
      },
      onPanResponderMove: (_, gestureState) => {
        const threshold = reactNative.Platform.OS === "android" ? 3 : 5;
        if (Math.abs(gestureState.dx) > threshold || Math.abs(gestureState.dy) > threshold) {
          isDragging.current = true;
        }
        if (isDragging.current) {
          const newX = startPosition.current.x + gestureState.dx;
          const newY = startPosition.current.y + gestureState.dy;
          const maxX = screenWidth - fabSize - 10;
          const maxY = screenHeight - fabSize - (reactNative.Platform.OS === "android" ? 100 : 80);
          const minX = 10;
          const minY = reactNative.Platform.OS === "android" ? 50 : 60;
          const constrainedX = Math.max(minX, Math.min(maxX, newX));
          const constrainedY = Math.max(minY, Math.min(maxY, newY));
          setPosition({ x: constrainedX, y: constrainedY });
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const dragDuration = Date.now() - dragStartTime.current;
        const dragDistance = Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
        const tapThreshold = reactNative.Platform.OS === "android" ? 15 : 10;
        const tapDuration = reactNative.Platform.OS === "android" ? 300 : 200;
        if (dragDuration < tapDuration && dragDistance < tapThreshold) {
          isDragging.current = false;
          setOpen(true);
        } else {
          setTimeout(() => {
            isDragging.current = false;
          }, 100);
        }
      }
    })
  ).current;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      reactNative.View,
      {
        style: [
          styles.fab,
          {
            left: position.x,
            top: position.y
          }
        ],
        ...pan.panHandlers,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          reactNative.TouchableOpacity,
          {
            onPress: () => {
              if (!isDragging.current) {
                setOpen(true);
              }
            },
            activeOpacity: 0.8,
            style: styles.fabTouchable,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles.fabText, children: "⚡" })
          }
        )
      }
    ),
    reactNative.Platform.OS === "ios" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      reactNative.Modal,
      {
        visible: open,
        animationType: "slide",
        onRequestClose: () => setOpen(false),
        presentationStyle: "pageSheet",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.modalContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.modalHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles.title, children: "Debug Overlay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.TouchableOpacity, { onPress: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles.close, children: "Done" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, {})
        ] })
      }
    ) : open && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.androidFullScreenOverlay, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.StatusBar, { backgroundColor: "#f8f9fa", barStyle: "dark-content" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.androidModalContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.androidModalHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles.title, children: "Debug Overlay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.TouchableOpacity, { onPress: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles.close, children: "✕ Close" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, {})
      ] })
    ] })
  ] });
};
const Tabs = () => {
  const [tab, setTab] = require$$0.useState("logs");
  const { logs, requests } = useDebug();
  async function exportAll() {
    const payload = JSON.stringify({ logs, requests }, null, 2);
    try {
      await reactNative.Share.share({ message: payload });
    } catch {
    }
  }
  const renderTabContent = () => {
    switch (tab) {
      case "logs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(LogsTab, {});
      case "net":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkTab, {});
      case "perf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PerfTab, {});
      case "device":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceTab, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.Text, { style: { padding: 20, color: "#000" }, children: [
          "Unknown tab: ",
          tab
        ] });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.tabsContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(reactNative.View, { style: styles.tabbar, children: [
      ["logs", "net", "perf", "device"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        reactNative.TouchableOpacity,
        {
          onPress: () => {
            setTab(t);
          },
          style: [styles.tab, tab === t && styles.activeTab],
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: [styles.tabText, tab === t && styles.activeTabText], children: t.toUpperCase() })
        },
        t
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.TouchableOpacity, { onPress: exportAll, style: styles.export, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.Text, { style: styles.exportText, children: "Export" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactNative.View, { style: styles.tabContent, children: renderTabContent() })
  ] });
};
const styles = reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%"
  },
  fab: {
    position: "absolute",
    zIndex: 999999,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: reactNative.Platform.OS === "android" ? "#FF6B35" : "#007AFF",
    elevation: reactNative.Platform.OS === "android" ? 20 : 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: reactNative.Platform.OS === "ios" ? 8 : 8 },
    shadowOpacity: reactNative.Platform.OS === "ios" ? 0.8 : 0.8,
    shadowRadius: reactNative.Platform.OS === "ios" ? 16 : 15,
    borderWidth: reactNative.Platform.OS === "android" ? 3 : 3,
    borderColor: reactNative.Platform.OS === "android" ? "#FFFFFF" : "#FFFFFF"
  },
  fabTouchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  title: { fontSize: 18, fontWeight: "600" },
  close: {
    color: "#007aff",
    fontSize: 18,
    fontWeight: "bold"
  },
  tabbar: {
    flexDirection: "row",
    gap: 4,
    padding: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    minHeight: 50,
    flexWrap: "wrap"
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: 50,
    alignItems: "center",
    flex: 1
  },
  activeTab: {
    backgroundColor: "#007aff",
    borderColor: "#007aff"
  },
  export: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#28a745",
    borderWidth: 1,
    borderColor: "#28a745",
    minWidth: 50,
    alignItems: "center"
  },
  tabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333333"
  },
  activeTabText: {
    color: "#ffffff"
  },
  exportText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff"
  },
  tabsContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  tabContent: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  modalHeader: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: reactNative.StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa"
  },
  androidFullScreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    backgroundColor: "#ffffff"
  },
  androidModalContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  androidModalHeader: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: reactNative.StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
    elevation: 4
  }
});
exports.DebugOverlay = DebugOverlay;
exports.DebugProvider = DebugProvider;
exports.installEarlyConsoleProxy = installEarlyConsoleProxy;
exports.useDebug = useDebug;
//# sourceMappingURL=index.cjs.map
