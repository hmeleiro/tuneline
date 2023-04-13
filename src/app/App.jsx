import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/Homepage';
import Game from './components/Game';

function App() {
  const { setToken, setRefreshToken } = useContext(AuthContext);

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
    async function getToken() {
      let search = window.location.search;
      let params = new URLSearchParams(search);

      const now = new Date();

      let loginInfo = {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
        expires_at: now.setSeconds(now.getSeconds() + 3600),
      };

      if (loginInfo.access_token)
        window.localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
      setToken(loginInfo.access_token);
      setRefreshToken(loginInfo.refresh_token);
    }

    const loginInfo = JSON.parse(window.localStorage.getItem('loginInfo'));

    var now = new Date();
    now = now[Symbol.toPrimitive]('number');

    if (!loginInfo?.access_token) {
      getToken();
    } else {
      if (now >= loginInfo?.expires_at) {
        refreshToken(loginInfo.refresh_token);
      } else {
        setToken(loginInfo.access_token);
        setRefreshToken(loginInfo.refresh_token);
      }
    }
  }, []);

  return <RouterProvider router={router} />;

  async function refreshToken(refresh_token) {
    const response = await fetch(
      '/api/auth/refresh_token?refresh_token=' + refresh_token
    );
    const json = await response.json();
    console.log(json);

    setToken(json.access_token);
    setRefreshToken(refresh_token);

    const now = new Date();
    let loginInfo = {
      access_token: json.access_token,
      refresh_token: refresh_token,
      expires_at: now.setSeconds(now.getSeconds() + 3600),
    };

    if (loginInfo.access_token)
      window.localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
  }
}

export default App;
