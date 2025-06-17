// ===========================================================
// 🌿 Agroverso | Service Worker regenerativo v2025.06
// 📁 Responsável por: cache, offline e desempenho PWA
// ===========================================================

const CACHE_VERSION = 'v2025.06.01';
const CACHE_NAME = `agroverso-cache-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// 📦 Lista completa de arquivos estáticos essenciais para pré-cache
const URLS_TO_CACHE = [
  '/',                       // Página raiz
  '/index.html',             // Landing principal
  '/produto-irrigacao.html', // Página de produto
  '/produto-hidroponia.html',
  '/produto-energia.html',
  '/offline.html',           // Página de fallback
  '/style.css',
  '/manifest.json',

  // 🎯 Scripts modulares
  '/scripts/carrossel.js',
  '/scripts/formulario.js',
  '/scripts/utils.js',
  '/scripts/includes.js',

  // 🔖 Logos e ícones
  '/assets/logo-192.png',
  '/assets/logo-512.png',
  '/assets/logo-monochrome.svg',
  '/assets/favicon.ico',

  // 🌊 Imagens de produtos (para funcionamento offline completo)
  '/assets/irrigacao-1.jpg',
  '/assets/irrigacao-2.jpg',
  '/assets/irrigacao-3.jpg',
  '/assets/hidroponia-1.jpg',
  '/assets/hidroponia-2.jpg',
  '/assets/hidroponia-3.jpg',
  '/assets/energia-1.jpg',
  '/assets/energia-2.jpg',
  '/assets/energia-3.jpg'
];

// ===========================================================
// 📦 Instalação – Pré-carrega todos os arquivos essenciais
// ===========================================================
self.addEventListener('install', event => {
  self.skipWaiting(); // ⚡ Ativa o service worker imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// ===========================================================
// 🔄 Ativação – Limpa caches antigos e assume controle das abas
// ===========================================================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 🧹 Remove versões antigas
          }
        })
      )
    )
  );
  self.clients.claim(); // 🛠️ Assume o controle imediatamente sem recarregar
});

// ===========================================================
// 🌐 Intercepta requisições GET e aplica lógica de resposta
// ===========================================================
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // 🚫 Ignora POST, PUT etc.

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // ✅ Futuro: salvar cópia no cache dinamicamente se desejado
        return response;
      })
      .catch(() => 
        // 🔁 Tenta usar o cache, senão exibe página offline
        caches.match(event.request).then(cached =>
          cached || caches.match(OFFLINE_URL)
        )
      )
  );
});
