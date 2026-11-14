const C='javapad-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
const nav=e.request.mode==='navigate'||e.request.url.endsWith('/index.html');
if(nav){e.respondWith(fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp));return res;}).catch(()=>caches.match('./index.html')));return;}
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();if(res.ok)caches.open(C).then(c=>c.put(e.request,cp));return res;})));});
