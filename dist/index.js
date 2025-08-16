import require$$0, { useState, useRef, useEffect, useMemo, createContext, useContext } from "react";
import { PixelRatio, Dimensions, Platform, View, FlatList, Text, StyleSheet, Animated, PanResponder, TouchableOpacity, Modal, Share } from "react-native";
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
function installConsoleProxy(onEntry) {
  const original = { log: console.log, warn: console.warn, error: console.error };
  ["log", "warn", "error"].forEach((level) => {
    const orig = original[level];
    console[level] = (...args) => {
      try {
        onEntry({ level, message: args, timestamp: Date.now() });
      } catch {
      }
      orig.apply(console, args);
    };
  });
  return () => {
    console.log = original.log;
    console.warn = original.warn;
    console.error = original.error;
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
    let reqBytes = 0;
    try {
      const body = init == null ? void 0 : init.body;
      if (typeof body === "string") reqBytes = body.length;
      else if (body && "size" in body) reqBytes = body.size;
    } catch {
    }
    try {
      const res = await original(input, init);
      const clone = res.clone();
      let resBytes = 0;
      try {
        const text = await clone.text();
        resBytes = text.length;
      } catch {
      }
      const endedAt = Date.now();
      onEntry({ id, type: "fetch", method, url, startedAt, endedAt, status: res.status, ok: res.ok, durationMs: endedAt - startedAt, reqBytes, resBytes });
      return res;
    } catch (err) {
      const endedAt = Date.now();
      onEntry({ id, type: "fetch", method, url, startedAt, endedAt, durationMs: endedAt - startedAt, reqBytes, error: String((err == null ? void 0 : err.message) || err) });
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
    reqId.set(config, { id, startedAt: Date.now() });
    return config;
  });
  const resI = axios.interceptors.response.use(
    (response) => {
      const meta = reqId.get(response.config) || { id: Math.random().toString(36).slice(2), startedAt: Date.now() };
      onEntry({ id: meta.id, type: "axios", method: (response.config.method || "GET").toUpperCase(), url: response.config.url, startedAt: meta.startedAt, endedAt: Date.now(), status: response.status, durationMs: Date.now() - meta.startedAt });
      return response;
    },
    (error) => {
      const cfg = error.config || {};
      const meta = reqId.get(cfg) || { id: Math.random().toString(36).slice(2), startedAt: Date.now() };
      onEntry({ id: meta.id, type: "axios", method: (cfg.method || "GET").toUpperCase(), url: cfg.url, startedAt: meta.startedAt, endedAt: Date.now(), durationMs: Date.now() - meta.startedAt, error: String((error == null ? void 0 : error.message) || error) });
      return Promise.reject(error);
    }
  );
  return () => {
    axios.interceptors.request.eject(reqI);
    axios.interceptors.response.eject(resI);
  };
}
function useFps(enabled = true) {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const last = useRef(typeof performance !== "undefined" ? performance.now() : Date.now());
  const raf = useRef(null);
  useEffect(() => {
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
  const [lag, setLag] = useState(0);
  useEffect(() => {
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
const DebugContext = createContext(null);
const useDebug = () => {
  const ctx = useContext(DebugContext);
  if (!ctx) throw new Error("useDebug must be used within DebugProvider");
  return ctx;
};
const DebugProvider = ({ children, axios, capacity = 300, enabled = typeof __DEV__ !== "undefined" ? __DEV__ : true }) => {
  const logBuf = useRef(new RingBuffer(capacity));
  const reqBuf = useRef(new RingBuffer(capacity));
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const restoreConsole = installConsoleProxy((e) => {
      logBuf.current.push(e);
      setTick((t) => t + 1);
    });
    const restoreFetch = installFetchProxy((e) => {
      reqBuf.current.push(e);
      setTick((t) => t + 1);
    });
    const restoreAxios = installAxiosProxy(axios, (e) => {
      reqBuf.current.push(e);
      setTick((t) => t + 1);
    });
    return () => {
      restoreAxios == null ? void 0 : restoreAxios();
      restoreFetch();
      restoreConsole();
    };
  }, [enabled, axios]);
  const jsFps = useFps(enabled);
  const loopLagMs = useEventLoopLag(enabled);
  const device = useMemo(() => ({
    platform: Platform.OS,
    version: Platform.Version,
    screen: Dimensions.get("window"),
    pixelRatio: PixelRatio.get(),
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
      setTick((t) => t + 1);
    },
    clearRequests: () => {
      reqBuf.current.clear();
      setTick((t) => t + 1);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DebugContext.Provider, { value, children });
};
const LogsTab = () => {
  const { logs, clearLogs } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FlatList,
      {
        data: logs,
        keyExtractor: (_, i) => String(i),
        renderItem: ({ item }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: [styles$3.row, item.level === "error" && styles$3.err, item.level === "warn" && styles$3.warn], children: [
          "[",
          new Date(item.timestamp).toLocaleTimeString(),
          "] ",
          item.level.toUpperCase(),
          ": ",
          item.message.map(String).join(" ")
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles$3.footer, onPress: clearLogs, children: "Clear" })
  ] });
};
const styles$3 = StyleSheet.create({
  row: { padding: 8, fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }) },
  err: { color: "#b00020" },
  warn: { color: "#9c6f00" },
  footer: { textAlign: "center", padding: 8, color: "#007aff" }
});
const NetworkTab = () => {
  const { requests, clearRequests } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FlatList,
      {
        data: [...requests].reverse(),
        keyExtractor: (it) => it.id + String(it.endedAt || ""),
        renderItem: ({ item }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles$2.card, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: styles$2.url, children: [
            item.method,
            " ",
            item.url
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { children: [
            "Status: ",
            item.status ?? "—",
            " | ms: ",
            item.durationMs ?? "—",
            " | in: ",
            item.reqBytes ?? 0,
            " | out: ",
            item.resBytes ?? 0
          ] }),
          item.error && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { color: "#b00020" }, children: item.error })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles$2.clear, onPress: clearRequests, children: "Clear" })
  ] });
};
const styles$2 = StyleSheet.create({
  card: { padding: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  url: { fontWeight: "600" },
  clear: { textAlign: "center", padding: 8, color: "#007aff" }
});
const PerfTab = () => {
  const { jsFps, loopLagMs } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles$1.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "JS FPS", value: String(jsFps) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { label: "Event Loop Lag (ms)", value: String(loopLagMs) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles$1.note, children: "Note: This reports JS thread FPS, not UI thread FPS." })
  ] });
};
const Metric = ({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 12 }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontWeight: "600" }, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: value })
] });
const styles$1 = StyleSheet.create({ container: { padding: 12 }, note: { color: "#666", marginTop: 8 } });
const DeviceTab = () => {
  const { device } = useDebug();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { padding: 12 }, children: Object.entries(device).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { marginBottom: 6 }, children: [
    k,
    ": ",
    typeof v === "object" ? JSON.stringify(v) : String(v)
  ] }, k)) });
};
const DebugOverlay = () => {
  const [open, setOpen] = useState(false);
  const pos = useRef(new Animated.ValueXY({ x: 20, y: 100 })).current;
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pos.x, dy: pos.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
      }
    })
  ).current;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Animated.View, { style: [styles.fab, { transform: [{ translateX: pos.x }, { translateY: pos.y }] }], ...pan.panHandlers, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TouchableOpacity, { onPress: () => setOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.fabText, children: "⚡" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { visible: open, animationType: "slide", onRequestClose: () => setOpen(false), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.header, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.title, children: "Debug Overlay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TouchableOpacity, { onPress: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: styles.close, children: "Close" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, {})
    ] })
  ] });
};
const Tabs = () => {
  const [tab, setTab] = useState("logs");
  const { logs, requests } = useDebug();
  async function exportAll() {
    const payload = JSON.stringify({ logs, requests }, null, 2);
    try {
      await Share.share({ message: payload });
    } catch {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: styles.tabbar, children: [
      ["logs", "net", "perf", "device"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TouchableOpacity, { onPress: () => setTab(t), style: [styles.tab, tab === t && styles.activeTab], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: t.toUpperCase() }) }, t)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TouchableOpacity, { onPress: exportAll, style: styles.export, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Export" }) })
    ] }),
    tab === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsx(LogsTab, {}),
    tab === "net" && /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkTab, {}),
    tab === "perf" && /* @__PURE__ */ jsxRuntimeExports.jsx(PerfTab, {}),
    tab === "device" && /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceTab, {})
  ] });
};
const styles = StyleSheet.create({
  fab: { position: "absolute", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.7)", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  fabText: { color: "white", fontSize: 18 },
  header: { paddingTop: 48, paddingHorizontal: 16, paddingBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: StyleSheet.hairlineWidth },
  title: { fontSize: 18, fontWeight: "600" },
  close: { color: "#007aff" },
  tabbar: { flexDirection: "row", gap: 8, padding: 8, alignItems: "center", borderBottomWidth: StyleSheet.hairlineWidth },
  tab: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: "#eee" },
  activeTab: { backgroundColor: "#ddd" },
  export: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: "#eee" }
});
export {
  DebugOverlay,
  DebugProvider,
  useDebug
};
//# sourceMappingURL=index.js.map
