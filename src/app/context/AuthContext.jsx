import { createContext, useState } from 'react';

export const AuthContext = createContext('');

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

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
    setExpiresAt(loginInfo.expires_at);
  }

  async function getRefreshedToken(refresh_token) {
    const response = await fetch(
      '/api/auth/refresh_token?refresh_token=' + refresh_token
    );
    const json = await response.json();

    setToken(json.access_token);
    setRefreshToken(refresh_token);
    
    const now = new Date();
    let loginInfo = {
      access_token: json.access_token,
      refresh_token: refresh_token,
      expires_at: now.setSeconds(now.getSeconds() + 3600),
    };

    setExpiresAt(loginInfo.expires_at);


    if (loginInfo.access_token)
      window.localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
  }

  return (
    <AuthContext.Provider
      value={{
        getToken,
        getRefreshedToken,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        expiresAt,
        setExpiresAt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
