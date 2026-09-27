const C="antrenman-v3";
const FILES=["./","index.html","three.min.js","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
 const isPage=r.mode==="navigate"||r.url.endsWith("/")||r.url.endsWith("index.html");
 if(isPage){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match("index.html"))));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(x=>x||fetch(r).then(res=>{const u=r.url;if(u.startsWith(self.location.origin)||u.includes("fonts.g")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))});
