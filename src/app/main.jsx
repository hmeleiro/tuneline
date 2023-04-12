import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import AuthProvider from './context/AuthContext';
import GameProvider from './context/GameContext';
import WebPlayerProvider from './context/WebPlayerContext';
import { ChakraProvider } from '@chakra-ui/react';

import './main.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  </React.StrictMode>
  <AuthProvider>
    <WebPlayerProvider>
      <GameProvider>
        <ChakraProvider>
          <App/>
        </ChakraProvider>
      </GameProvider>
    </WebPlayerProvider>
  </AuthProvider>
);
