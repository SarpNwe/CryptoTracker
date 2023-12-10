import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';

const domNode = document.getElementById('root');
if(domNode) {
  const root = createRoot(domNode);
  root.render(
    <React.StrictMode>
      <CryptoContext>
        <App />
      </CryptoContext>
    </React.StrictMode>
  );
}