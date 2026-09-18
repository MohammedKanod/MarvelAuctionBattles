import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Analytics } from '@vercel/analytics/react';
import './index.css';

// Render React App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);

// Smoothly dismiss the instant HTML splash screen
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => {
    const splash = document.getElementById('pwa-splash');
    if (splash) {
      splash.style.opacity = '0';
      splash.style.transition = 'opacity 0.35s ease-out';
      setTimeout(() => {
        splash.remove();
      }, 380);
    }
  });
}

// Register PWA Service Worker in production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker registered with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });
  });
}
