import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage';
import Game from './components/Game';

function App() {
  const { getToken, getRefreshedToken, setRefreshToken, setToken, setExpiresAt } =
    useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/game',
      element: <Game />,
    },
  ]);

  useEffect(() => {
    const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));

    var now = new Date();
    now = now[Symbol.toPrimitive]('number');

    if (!loginInfo?.access_token) {
      getToken();
    } else {
      if (now >= loginInfo?.expires_at) {
        getRefreshedToken(loginInfo.refresh_token);
      } else {
        setToken(loginInfo.access_token);
        setRefreshToken(loginInfo.refresh_token);
        setExpiresAt(loginInfo.expires_at);
      }
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
