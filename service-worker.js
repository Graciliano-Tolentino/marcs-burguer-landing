// ===========================================================
// 🍔 Marc’s Burguer | Service Worker PWA v1.0
// 📦 Gerenciamento de cache, funcionamento offline e desempenho
// ===========================================================

const CACHE_VERSION = 'marcs-burguer-v1.0';
const CACHE_NAME = `marcs-burguer-cache-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// 📦 Arquivos essenciais para pré-cache completo
const URLS_TO_CACHE = [
  '/',                        
  '/index.html',              
  '/combo-picanha.html',      
  '/combo-frango.html',       
  '/combo-xtudo.html',        
  '/offline.html',            
  '/manifest.json',           

  // 🎯 Arquivos CSS
  '/assets/css/base.css',
  '/assets/css/carrossel.css',
  '/assets/css/home.css',
  '/assets/css/layout.css',
  '/assets/css/produtos.css',
  '/assets/css/responsivo.css',

  // 🔖 Scripts JS
  '/scripts/carrossel.js',
  '/scripts/footer-loader.js',
  '/scripts/includes.js',

  // 🔥 Ícones e imagens
  '/assets/images/logo-192.png',
  '/assets/images/logo-512.png',
  '/assets/images/logo-monochrome.svg',
  '/assets/images/favicon.ico',

  // 🍔 Imagens dos combos
  '/assets/images/combo-picanha.jpg',
  '/assets/images/combo-picanha-1.jpg',
  '/assets/images/combo-picanha-2.jpg',
  '/assets/images/combo-picanha-3.jpg',
  '/assets/images/combo-frango.jpg',
  '/assets/images/combo-frango-1.jpg',
  '/assets/images/combo-frango-2.jpg',
  '/assets/images/combo-frango-3.jpg',
  '/assets/images/combo-xtudo.jpg',
  '/assets/images/combo-xtudo-1.jpg',
  '/assets/images/combo-xtudo-2.jpg',
  '/assets/images/combo-xtudo-3.jpg'
];

// ===========================================================
// 📦 Instalação – Pré-carrega arquivos essenciais no cache
// ===========================================================
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// ===========================================================
// 🔄 Ativação – Limpa caches antigos
// ===========================================================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// ===========================================================
// 🌐 Intercepta requisições e entrega cache ou offline.html
// ===========================================================
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match(OFFLINE_URL))
      )
  );
});
