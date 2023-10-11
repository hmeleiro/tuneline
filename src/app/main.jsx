import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import AuthProvider from './context/AuthContext'
import GameProvider from './context/GameContext'
import WebPlayerProvider from './context/WebPlayerContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import './main.css'

const dark = '#232323'
const light = '#f8f5f2'

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode(light, dark)(props)
      }
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> </React.StrictMode>
  <AuthProvider>
    <GameProvider>
      <WebPlayerProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </WebPlayerProvider>
    </GameProvider>
  </AuthProvider>
)
