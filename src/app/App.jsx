import { useContext, useEffect } from 'react';
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

      var t = new Date();

      let loginInfo = {
        access_token: params.get('access_token'),
        refresh_token: params.get('refresh_token'),
        expires_at: t.setSeconds(t.getSeconds() + params.get('expires_in')),
      };
      console.log(loginInfo);

      if (loginInfo.access_token)
        window.localStorage.setItem(
          'loginInfo',
          JSON.stringify(loginInfo)
        );
      setToken(loginInfo.access_token);
      setRefreshToken(loginInfo.refresh_token);
    }

    const loginInfo = JSON.parse(
      window.localStorage.getItem('loginInfo')
    );

    if (!loginInfo?.access_token) {
      getToken();
    } else {
      setToken(loginInfo.access_token);
      setRefreshToken(loginInfo.refresh_token);
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
