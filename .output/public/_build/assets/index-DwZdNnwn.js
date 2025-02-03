import{s as h,i as j,a as g,b,e as y,j as e}from"./client-C9K3naXO.js";function k(t){return t instanceof Headers?new Headers(t):Array.isArray(t)?new Headers(t):typeof t=="object"?new Headers(t):new Headers}function N(...t){return t.reduce((s,n)=>{const r=k(n);for(const[a,o]of r.entries())s.set(a,o);return s},new Headers)}const M=[];function f(t,s){const n=s||t||{};return typeof n.method>"u"&&(n.method="GET"),{options:n,middleware:r=>f(void 0,Object.assign(n,{middleware:r})),validator:r=>f(void 0,Object.assign(n,{validator:r})),handler:(...r)=>{const[a,o]=r;Object.assign(n,{...a,extractedFn:a,serverFn:o}),a.url||console.warn(a);const i=[...n.middleware||[],F(n)];return Object.assign(async l=>w(i,"client",{...a,method:n.method,data:l?.data,headers:l?.headers,context:{}}).then(d=>{if(d.error)throw d.error;return d.result}),{...a,__executeServer:async l=>{const d=l instanceof FormData?_(l):l;return await w(i,"server",{...a,...d}).then(c=>({result:c.result,error:c.error,context:c.sendContext}))}})}}}function _(t){const s=t.get("__TSR_CONTEXT");if(t.delete("__TSR_CONTEXT"),typeof s!="string")return{context:{},data:t};try{return{context:h.parse(s),data:t}}catch{return{data:t}}}function C(t){const s=new Set,n=[],r=a=>{a.forEach(o=>{o.options.middleware&&r(o.options.middleware),s.has(o)||(s.add(o),n.push(o))})};return r(t),n}const p=async(t,s,n)=>t({...s,next:async(r={})=>n({...s,...r,context:{...s.context,...r.context},sendContext:{...s.sendContext,...r.sendContext??{}},headers:N(s.headers,r.headers),result:r.result!==void 0?r.result:s.result,error:r.error??s.error})});function T(t,s){if(t==null)return{};if("~standard"in t){const n=t["~standard"].validate(s);if(n instanceof Promise)throw new Error("Async validation not supported");if(n.issues)throw new Error(JSON.stringify(n.issues,void 0,2));return n.value}if("parse"in t)return t.parse(s);if(typeof t=="function")return t(s);throw new Error("Invalid validator type!")}async function w(t,s,n){const r=C([...M,...t]),a=async o=>{const i=r.shift();if(!i)return o;i.options.validator&&(s!=="client"||i.options.validateClient)&&(o.data=await T(i.options.validator,o.data));const l=s==="client"?i.options.client:i.options.server;return l?p(l,o,async d=>{const x=i.options.clientAfter;if(s==="client"&&x){const c=await a(d);return p(x,{...d,...c},m=>m)}return a(d).catch(c=>{if(j(c)||g(c))return{...d,error:c};throw c})}):a(o)};return a({...n,headers:n.headers||{},sendContext:n.sendContext||{},context:n.context||{}})}function F(t){return{_types:void 0,options:{validator:t.validator,validateClient:t.validateClient,client:async({next:s,sendContext:n,...r})=>{var a;const o=await((a=t.extractedFn)==null?void 0:a.call(t,{...r,context:n}));return s(o)},server:async({next:s,...n})=>{var r;const a=await((r=t.serverFn)==null?void 0:r.call(t,n));return s({...n,result:a})}}}}async function H(t,s,n){var r;const a=s[0];if(b(a)&&a.method){const l=a,d=l.data instanceof FormData?"formData":"payload",x=new Headers({...d==="payload"?{"content-type":"application/json",accept:"application/json"}:{},...l.headers instanceof Headers?Object.fromEntries(l.headers.entries()):l.headers});if(l.method==="GET"){const u=y({payload:h.stringify({data:l.data,context:l.context})});u&&(t.includes("?")?t+=`&${u}`:t+=`?${u}`)}const c=await n(t,{method:l.method,headers:x,...E(l)}),m=await v(c);if((r=m.headers.get("content-type"))!=null&&r.includes("application/json")){const u=h.decode(await m.json());if(j(u)||g(u)||u instanceof Error)throw u;return u}return m}const o=await v(await n(t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(s)})),i=o.headers.get("content-type");return i&&i.includes("application/json")?h.decode(await o.json()):o.text()}function E(t){return t.method==="POST"?t.data instanceof FormData?(t.data.set("__TSR_CONTEXT",h.stringify(t.context)),{body:t.data}):{body:h.stringify({data:t.data??null,context:t.context})}:{}}async function v(t){if(!t.ok){const s=t.headers.get("content-type");throw s&&s.includes("application/json")?h.decode(await t.json()):new Error(await t.text())}return t}function O(t){return t.replace(/^\/|\/$/g,"")}const L=(t,s)=>{const n=`/${O(s)}/${t}`;return Object.assign((...a)=>H(n,a,fetch),{url:n,functionId:t})},S=()=>e.jsx("form",{children:e.jsxs("div",{className:"mb-4 w-full max-w-3xl rounded-lg bg-slate-200 dark:bg-slate-900",children:[e.jsxs("div",{className:"rounded-lg rounded-b-none border border-slate-300 bg-slate-50 px-2 py-2 dark:border-slate-700 dark:bg-slate-800",children:[e.jsx("label",{htmlFor:"prompt-input",className:"sr-only",children:"Enter your prompt"}),e.jsx("textarea",{id:"prompt-input",rows:4,className:"w-full border-0 bg-slate-50 px-0 text-base text-slate-900 focus:outline-none dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400",placeholder:"Enter your prompt",required:!0})]}),e.jsxs("div",{className:"flex items-center justify-between px-2 py-2",children:[e.jsxs("button",{type:"button",className:"inline-flex cursor-pointer justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-50",children:[e.jsx("span",{className:"sr-only",children:"Attach file"}),e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"})]}),e.jsx("span",{className:"px-2 text-sm",children:"Attach a file"})]}),e.jsxs("button",{type:"submit",className:"mr-1 inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-slate-50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 sm:text-base",children:["Generate",e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M10 14l11 -11"}),e.jsx("path",{d:"M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"})]})]})]})]})}),z=()=>e.jsxs("div",{className:"flex h-[97vh] w-full flex-col",children:[e.jsxs("div",{className:"flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7",children:[e.jsxs("div",{className:"flex items-start",children:[e.jsx("img",{className:"mr-2 h-8 w-8 rounded-full",src:"https://dummyimage.com/128x128/363536/ffffff&text=J"}),e.jsx("div",{className:"flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl",children:e.jsx("p",{children:"Explain quantum computing in simple terms"})})]}),e.jsxs("div",{className:"flex flex-row-reverse items-start",children:[e.jsx("img",{className:"ml-2 h-8 w-8 rounded-full",src:"https://dummyimage.com/128x128/354ea1/ffffff&text=G"}),e.jsx("div",{className:"flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl",children:e.jsxs("p",{children:["Certainly! Quantum computing is a new type of computing that relies on the principles of quantum physics. Traditional computers, like the one you might be using right now, use bits to store and process information. These bits can represent either a 0 or a 1. In contrast, quantum computers use quantum bits, or qubits.",e.jsx("br",{}),e.jsx("br",{}),"Unlike bits, qubits can represent not only a 0 or a 1 but also a superposition of both states simultaneously. This means that a qubit can be in multiple states at once, which allows quantum computers to perform certain calculations much faster and more efficiently"]})}),e.jsxs("div",{className:"mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row",children:[e.jsx("button",{className:"hover:text-blue-600",type:"button",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"}),e.jsx("path",{d:"M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"})]})}),e.jsx("button",{className:"hover:text-blue-600",type:"button",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"})]})}),e.jsx("button",{className:"hover:text-blue-600",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"})]})})]})]}),e.jsxs("div",{className:"flex items-start",children:[e.jsx("img",{className:"mr-2 h-8 w-8 rounded-full",src:"https://dummyimage.com/128x128/363536/ffffff&text=J"}),e.jsx("div",{className:"flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl",children:e.jsx("p",{children:"What are three great applications of quantum computing?"})})]}),e.jsxs("div",{className:"flex flex-row-reverse items-start",children:[e.jsx("img",{className:"ml-2 h-8 w-8 rounded-full",src:"https://dummyimage.com/128x128/354ea1/ffffff&text=G"}),e.jsx("div",{className:"flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl",children:e.jsx("p",{children:"Three great applications of quantum computing are: Optimization of complex problems, Drug Discovery and Cryptography."})}),e.jsxs("div",{className:"mr-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row",children:[e.jsx("button",{className:"hover:text-blue-600",type:"button",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"}),e.jsx("path",{d:"M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"})]})}),e.jsx("button",{className:"hover:text-blue-600",type:"button",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"})]})}),e.jsx("button",{className:"hover:text-blue-600",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.jsx("path",{d:"M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"})]})})]})]})]}),e.jsx(S,{})]}),q=L("app_routes_index_tsx--getCount_createServerFn_handler","/_server"),B=f({method:"GET"}).handler(q),W=function(){return e.jsx(z,{})},A=async()=>await B();export{W as component,A as loader};
