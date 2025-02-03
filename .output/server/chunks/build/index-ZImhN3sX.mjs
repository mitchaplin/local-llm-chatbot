import { jsx, jsxs } from 'react/jsx-runtime';
import { warning, isPlainObject, encode, isRedirect, isNotFound } from '@tanstack/react-router';
import { P as P$1, o as oe, H as H3Event, g as getHeaders } from '../nitro/nitro.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'react';
import 'react-dom/server';
import 'node:stream/web';

function O(e = {}) {
  let t, n = false;
  const a = (o) => {
    if (t && t !== o) throw new Error("Context conflict");
  };
  let s;
  if (e.asyncContext) {
    const o = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    o ? s = new o() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const l = () => {
    if (s) {
      const o = s.getStore();
      if (o !== undefined) return o;
    }
    return t;
  };
  return { use: () => {
    const o = l();
    if (o === undefined) throw new Error("Context is not available");
    return o;
  }, tryUse: () => l(), set: (o, i) => {
    i || a(o), t = o, n = true;
  }, unset: () => {
    t = undefined, n = false;
  }, call: (o, i) => {
    a(o), t = o;
    try {
      return s ? s.run(o, i) : i();
    } finally {
      n || (t = undefined);
    }
  }, async callAsync(o, i) {
    t = o;
    const d = () => {
      t = o;
    }, f = () => t === o ? d : undefined;
    b.add(f);
    try {
      const u = s ? s.run(o, i) : i();
      return n || (t = void 0), await u;
    } finally {
      b.delete(f);
    }
  } };
}
function A(e = {}) {
  const t = {};
  return { get(n, a = {}) {
    return t[n] || (t[n] = O({ ...e, ...a })), t[n];
  } };
}
const x = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, g = "__unctx__", z = x[g] || (x[g] = A()), P = (e, t = {}) => z.get(e, t), y = "__unctx_async_handlers__", b = x[y] || (x[y] = /* @__PURE__ */ new Set()), q = [];
function w(e, t) {
  const n = t || e || {};
  return typeof n.method > "u" && (n.method = "GET"), { options: n, middleware: (a) => w(undefined, Object.assign(n, { middleware: a })), validator: (a) => w(undefined, Object.assign(n, { validator: a })), handler: (...a) => {
    const [s, l] = a;
    Object.assign(n, { ...s, extractedFn: s, serverFn: l }), s.url || (console.warn(s), warning(false, "createServerFn must be called with a function that has a 'url' property. Ensure that the @tanstack/start-plugin is ordered **before** the @tanstack/server-functions-plugin."));
    const o = [...n.middleware || [], $(n)];
    return Object.assign(async (i) => _(o, "client", { ...s, method: n.method, data: i == null ? undefined : i.data, headers: i == null ? undefined : i.headers, context: {} }).then((d) => {
      if (d.error) throw d.error;
      return d.result;
    }), { ...s, __executeServer: async (i) => {
      const d = i instanceof FormData ? B(i) : i;
      return await _(o, "server", { ...s, ...d }).then((u) => ({ result: u.result, error: u.error, context: u.sendContext }));
    } });
  } };
}
function B(e) {
  const t = e.get("__TSR_CONTEXT");
  if (e.delete("__TSR_CONTEXT"), typeof t != "string") return { context: {}, data: e };
  try {
    return { context: P$1.parse(t), data: e };
  } catch {
    return { data: e };
  }
}
function W(e) {
  const t = /* @__PURE__ */ new Set(), n = [], a = (s) => {
    s.forEach((l) => {
      l.options.middleware && a(l.options.middleware), t.has(l) || (t.add(l), n.push(l));
    });
  };
  return a(e), n;
}
const k = async (e, t, n) => e({ ...t, next: async (a = {}) => {
  var _a, _b;
  return n({ ...t, ...a, context: { ...t.context, ...a.context }, sendContext: { ...t.sendContext, ...(_a = a.sendContext) != null ? _a : {} }, headers: oe(t.headers, a.headers), result: a.result !== undefined ? a.result : t.result, error: (_b = a.error) != null ? _b : t.error });
} });
function R(e, t) {
  if (e == null) return {};
  if ("~standard" in e) {
    const n = e["~standard"].validate(t);
    if (n instanceof Promise) throw new Error("Async validation not supported");
    if (n.issues) throw new Error(JSON.stringify(n.issues, undefined, 2));
    return n.value;
  }
  if ("parse" in e) return e.parse(t);
  if (typeof e == "function") return e(t);
  throw new Error("Invalid validator type!");
}
async function _(e, t, n) {
  const a = W([...q, ...e]), s = async (l) => {
    const o = a.shift();
    if (!o) return l;
    o.options.validator && (t !== "client" || o.options.validateClient) && (l.data = await R(o.options.validator, l.data));
    const i = t === "client" ? o.options.client : o.options.server;
    return i ? k(i, l, async (d) => {
      const f = o.options.clientAfter;
      if (t === "client" && f) {
        const u = await s(d);
        return k(f, { ...d, ...u }, (p) => p);
      }
      return s(d).catch((u) => {
        if (isRedirect(u) || isNotFound(u)) return { ...d, error: u };
        throw u;
      });
    }) : s(l);
  };
  return s({ ...n, headers: n.headers || {}, sendContext: n.sendContext || {}, context: n.context || {} });
}
function $(e) {
  return { _types: undefined, options: { validator: e.validator, validateClient: e.validateClient, client: async ({ next: t, sendContext: n, ...a }) => {
    var s;
    const l = await ((s = e.extractedFn) == null ? undefined : s.call(e, { ...a, context: n }));
    return t(l);
  }, server: async ({ next: t, ...n }) => {
    var a;
    const s = await ((a = e.serverFn) == null ? undefined : a.call(e, n));
    return t({ ...n, result: s });
  } } };
}
function G() {
  return I();
}
const S = Symbol("$HTTPEvent");
function J(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? undefined : e[S]) instanceof H3Event || (e == null ? undefined : e.__is_event__) === true);
}
function D(e) {
  return function(...t) {
    var n;
    let a = t[0];
    if (J(a)) t[0] = a instanceof H3Event || a.__is_event__ ? a : a[S];
    else {
      if (!((n = globalThis.app.config.server.experimental) != null && n.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (a = G(), !a) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      t.unshift(a);
    }
    return e(...t);
  };
}
const U = D(getHeaders);
function X() {
  var e;
  return P("nitro-app", { asyncContext: !!((e = globalThis.app.config.server.experimental) != null && e.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function I() {
  return X().use().event;
}
async function K(e, t, n) {
  var a;
  const s = t[0];
  if (isPlainObject(s) && s.method) {
    const i = s, d = i.data instanceof FormData ? "formData" : "payload", f = new Headers({ ...d === "payload" ? { "content-type": "application/json", accept: "application/json" } : {}, ...i.headers instanceof Headers ? Object.fromEntries(i.headers.entries()) : i.headers });
    if (i.method === "GET") {
      const h = encode({ payload: P$1.stringify({ data: i.data, context: i.context }) });
      h && (e.includes("?") ? e += `&${h}` : e += `?${h}`);
    }
    const u = await n(e, { method: i.method, headers: f, ...Q(i) }), p = await N(u);
    if ((a = p.headers.get("content-type")) != null && a.includes("application/json")) {
      const h = P$1.decode(await p.json());
      if (isRedirect(h) || isNotFound(h) || h instanceof Error) throw h;
      return h;
    }
    return p;
  }
  const l = await N(await n(e, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(t) })), o = l.headers.get("content-type");
  return o && o.includes("application/json") ? P$1.decode(await l.json()) : l.text();
}
function Q(e) {
  var _a;
  return e.method === "POST" ? e.data instanceof FormData ? (e.data.set("__TSR_CONTEXT", P$1.stringify(e.context)), { body: e.data }) : { body: P$1.stringify({ data: (_a = e.data) != null ? _a : null, context: e.context }) } : {};
}
async function N(e) {
  if (!e.ok) {
    const t = e.headers.get("content-type");
    throw t && t.includes("application/json") ? P$1.decode(await e.json()) : new Error(await e.text());
  }
  return e;
}
function V(e) {
  return e.replace(/^\/|\/$/g, "");
}
const Y = (e, t) => {
  const n = `/${V(t)}/${e}`;
  return Object.assign((...s) => K(n, s, async (l, o) => (o.headers = oe(U(), o.headers), $fetch.native(l, o))), { url: n, functionId: e });
}, Z = () => jsx("form", { children: jsxs("div", { className: "mb-4 w-full max-w-3xl rounded-lg bg-slate-200 dark:bg-slate-900", children: [jsxs("div", { className: "rounded-lg rounded-b-none border border-slate-300 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-800", children: [jsx("label", { htmlFor: "prompt-input", className: "sr-only", children: "Enter your prompt" }), jsx("textarea", { id: "prompt-input", rows: 4, className: "w-full border-0 bg-slate-50 px-0 text-base text-slate-900 focus:outline-none dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400", placeholder: "Enter your prompt", required: true })] }), jsxs("div", { className: "flex items-center justify-between px-2 py-2", children: [jsxs("button", { type: "button", className: "inline-flex cursor-pointer justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-50", children: [jsx("span", { className: "sr-only", children: "Attach file" }), jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" })] }), jsx("span", { className: "px-2 text-sm", children: "Attach a file" })] }), jsxs("button", { type: "submit", className: "mr-1 inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-slate-50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 sm:text-base", children: ["Generate", jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M10 14l11 -11" }), jsx("path", { d: "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" })] })] })] })] }) }), ee = () => jsxs("div", { className: "flex h-[97vh] w-full flex-col", children: [jsxs("div", { className: "flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7", children: [jsxs("div", { className: "flex items-start", children: [jsx("img", { className: "mr-2 h-8 w-8 rounded-full", src: "https://dummyimage.com/128x128/363536/ffffff&text=J" }), jsx("div", { className: "flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl", children: jsx("p", { children: "Explain quantum computing in simple terms" }) })] }), jsxs("div", { className: "flex flex-row-reverse items-start", children: [jsx("img", { className: "ml-2 h-8 w-8 rounded-full", src: "https://dummyimage.com/128x128/354ea1/ffffff&text=G" }), jsx("div", { className: "flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl", children: jsxs("p", { children: ["Certainly! Quantum computing is a new type of computing that relies on the principles of quantum physics. Traditional computers, like the one you might be using right now, use bits to store and process information. These bits can represent either a 0 or a 1. In contrast, quantum computers use quantum bits, or qubits.", jsx("br", {}), jsx("br", {}), "Unlike bits, qubits can represent not only a 0 or a 1 but also a superposition of both states simultaneously. This means that a qubit can be in multiple states at once, which allows quantum computers to perform certain calculations much faster and more efficiently"] }) }), jsxs("div", { className: "mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row", children: [jsx("button", { className: "hover:text-blue-600", type: "button", children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" }), jsx("path", { d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" })] }) }), jsx("button", { className: "hover:text-blue-600", type: "button", children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" })] }) }), jsx("button", { className: "hover:text-blue-600", children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" })] }) })] })] }), jsxs("div", { className: "flex items-start", children: [jsx("img", { className: "mr-2 h-8 w-8 rounded-full", src: "https://dummyimage.com/128x128/363536/ffffff&text=J" }), jsx("div", { className: "flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl", children: jsx("p", { children: "What are three great applications of quantum computing?" }) })] }), jsxs("div", { className: "flex flex-row-reverse items-start", children: [jsx("img", { className: "ml-2 h-8 w-8 rounded-full", src: "https://dummyimage.com/128x128/354ea1/ffffff&text=G" }), jsx("div", { className: "flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl", children: jsx("p", { children: "Three great applications of quantum computing are: Optimization of complex problems, Drug Discovery and Cryptography." }) }), jsxs("div", { className: "mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row", children: [jsx("button", { className: "hover:text-blue-600", type: "button", children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" }), jsx("path", { d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" })] }) }), jsx("button", { className: "hover:text-blue-600", type: "button", children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" })] }) }), jsx("button", { className: "hover:text-blue-600", children: jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }), jsx("path", { d: "M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" })] }) })] })] })] }), jsx(Z, {})] }), te = Y("app_routes_index_tsx--getCount_createServerFn_handler", "/_server"), ne = w({ method: "GET" }).handler(te), he = function() {
  return jsx(ee, {});
}, fe = async () => await ne();

export { he as component, fe as loader };
//# sourceMappingURL=index-ZImhN3sX.mjs.map
