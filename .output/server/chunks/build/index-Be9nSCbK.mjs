import * as node_fs from 'node:fs';
import { U, u } from '../nitro/nitro.mjs';
import { warning, isRedirect, isNotFound } from '@tanstack/react-router';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:path';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:async_hooks';
import 'react/jsx-runtime';
import 'react';
import 'react-dom/server';
import 'node:stream/web';

function x(e) {
  return e instanceof Headers ? new Headers(e) : Array.isArray(e) ? new Headers(e) : typeof e == "object" ? new Headers(e) : new Headers();
}
function F(...e) {
  return e.reduce((t, r) => {
    const n = x(r);
    for (const [a, s] of n.entries()) t.set(a, s);
    return t;
  }, new Headers());
}
const S = [];
function l(e, t) {
  const r = t || e || {};
  return typeof r.method > "u" && (r.method = "GET"), { options: r, middleware: (n) => l(undefined, Object.assign(r, { middleware: n })), validator: (n) => l(undefined, Object.assign(r, { validator: n })), handler: (...n) => {
    const [a, s] = n;
    Object.assign(r, { ...a, extractedFn: a, serverFn: s }), a.url || (console.warn(a), warning(false, "createServerFn must be called with a function that has a 'url' property. Ensure that the @tanstack/start-plugin is ordered **before** the @tanstack/server-functions-plugin."));
    const i = [...r.middleware || [], E(r)];
    return Object.assign(async (o) => h(i, "client", { ...a, method: r.method, data: o == null ? undefined : o.data, headers: o == null ? undefined : o.headers, context: {} }).then((d) => {
      if (d.error) throw d.error;
      return d.result;
    }), { ...a, __executeServer: async (o) => {
      const d = o instanceof FormData ? O(o) : o;
      return await h(i, "server", { ...a, ...d }).then((c) => ({ result: c.result, error: c.error, context: c.sendContext }));
    } });
  } };
}
function O(e) {
  const t = e.get("__TSR_CONTEXT");
  if (e.delete("__TSR_CONTEXT"), typeof t != "string") return { context: {}, data: e };
  try {
    return { context: u.parse(t), data: e };
  } catch {
    return { data: e };
  }
}
function b(e) {
  const t = /* @__PURE__ */ new Set(), r = [], n = (a) => {
    a.forEach((s) => {
      s.options.middleware && n(s.options.middleware), t.has(s) || (t.add(s), r.push(s));
    });
  };
  return n(e), r;
}
const f = async (e, t, r) => e({ ...t, next: async (n = {}) => {
  var _a, _b;
  return r({ ...t, ...n, context: { ...t.context, ...n.context }, sendContext: { ...t.sendContext, ...(_a = n.sendContext) != null ? _a : {} }, headers: F(t.headers, n.headers), result: n.result !== undefined ? n.result : t.result, error: (_b = n.error) != null ? _b : t.error });
} });
function C(e, t) {
  if (e == null) return {};
  if ("~standard" in e) {
    const r = e["~standard"].validate(t);
    if (r instanceof Promise) throw new Error("Async validation not supported");
    if (r.issues) throw new Error(JSON.stringify(r.issues, undefined, 2));
    return r.value;
  }
  if ("parse" in e) return e.parse(t);
  if (typeof e == "function") return e(t);
  throw new Error("Invalid validator type!");
}
async function h(e, t, r) {
  const n = b([...S, ...e]), a = async (s) => {
    const i = n.shift();
    if (!i) return s;
    i.options.validator && (t !== "client" || i.options.validateClient) && (s.data = await C(i.options.validator, s.data));
    const o = t === "client" ? i.options.client : i.options.server;
    return o ? f(o, s, async (d) => {
      const u = i.options.clientAfter;
      if (t === "client" && u) {
        const c = await a(d);
        return f(u, { ...d, ...c }, (w) => w);
      }
      return a(d).catch((c) => {
        if (isRedirect(c) || isNotFound(c)) return { ...d, error: c };
        throw c;
      });
    }) : a(s);
  };
  return a({ ...r, headers: r.headers || {}, sendContext: r.sendContext || {}, context: r.context || {} });
}
function E(e) {
  return { _types: undefined, options: { validator: e.validator, validateClient: e.validateClient, client: async ({ next: t, sendContext: r, ...n }) => {
    var a;
    const s = await ((a = e.extractedFn) == null ? undefined : a.call(e, { ...n, context: r }));
    return t(s);
  }, server: async ({ next: t, ...r }) => {
    var n;
    const a = await ((n = e.serverFn) == null ? undefined : n.call(e, r));
    return t({ ...r, result: a });
  } } };
}
function T(e) {
  return e.replace(/^\/|\/$/g, "");
}
const H = (e, t, r) => {
  U(r);
  const n = `/${T(t)}/${e}`;
  return Object.assign(r, { url: n, functionId: e });
}, M = "count.txt";
async function j() {
  return parseInt(await node_fs.promises.readFile(M, "utf-8").catch(() => "0"));
}
const A = H("app_routes_index_tsx--getCount_createServerFn_handler", "/_server", (e) => N.__executeServer(e)), N = l({ method: "GET" }).handler(A, () => j());

export { A as getCount_createServerFn_handler };
//# sourceMappingURL=index-Be9nSCbK.mjs.map
