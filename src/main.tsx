import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuditorProvider } from './lib/AuditorContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuditorProvider>
        <App />
      </AuditorProvider>
    </BrowserRouter>
  </StrictMode>
);
