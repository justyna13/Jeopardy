import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './index.css';
import { GameProvider } from '@/store/GameProvider/GameProvider.tsx';
import { StoreProvider } from '@/store/StoreProvider/StoreProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </StoreProvider>
  </StrictMode>
);
