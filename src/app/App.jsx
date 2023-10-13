import React, { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext'
import { GameContext } from './context/GameContext'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/Homepage'
import Game from './components/Game'
import Cookies from 'js-cookie'

function App () {
  const { setRefreshToken, setToken } =
    useContext(AuthContext)
  const { screenSize, setScreenSize, getCurrentDimension } = useContext(GameContext)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/game',
      element: <Game />
    }
  ])

  useEffect(() => {
    const loginInfo = {
      access_token: Cookies.get('access_token'),
      refresh_token: Cookies.get('refresh_token')
    }

    setToken(loginInfo.access_token)
    setRefreshToken(loginInfo.refresh_token)
  }, [])

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension())
    }
    window.addEventListener('resize', updateDimension)

    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [screenSize])

  return <RouterProvider router={router} />
}

export default App
