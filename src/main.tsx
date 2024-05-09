import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import './index.css'
import { StoreProvider } from "@/store/StoreProvider/StoreProvider.tsx";
import { GameProvider } from "@/store/GameProvider/GameProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </StoreProvider>
  </React.StrictMode>,
)
