import React, { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthContext'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/Homepage'
import Game from './components/Game'
import Cookies from 'js-cookie'

function App () {
  const { getToken, getRefreshedToken, setRefreshToken, setToken, setExpiresAt } =
    useContext(AuthContext)

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
    let loginInfo = {
      access_token: Cookies.get('access_token'),
      refresh_token: Cookies.get('refresh_token')
    }
    // let now = new Date()
    // now = now[Symbol.toPrimitive]('number')

    console.log(loginInfo)

    if (!loginInfo?.access_token && !loginInfo.refresh_token) {
      console.log('No hay ni access_token ni refresh_token...')
      getToken()
    }

    if (!loginInfo?.access_token && loginInfo.refresh_token) {
      console.log('No hay access_token pero sí refresh_token. Refrescamos el token...')
      loginInfo = getRefreshedToken(loginInfo.refresh_token)
    }

    setToken(loginInfo.access_token)
    setRefreshToken(loginInfo.refresh_token)
    setExpiresAt(loginInfo.expires_at)
  }, [])

  return <RouterProvider router={router} />
}

export default App
