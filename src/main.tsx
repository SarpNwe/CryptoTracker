import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);