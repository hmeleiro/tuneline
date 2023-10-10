import { createContext, useState } from 'react'

export const AuthContext = createContext('')

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [refreshToken, setRefreshToken] = useState(null)

  async function getRefreshedToken (refreshToken) {
    const response = await fetch(
      '/api/auth/refresh_token?refresh_token=' + refreshToken
    )
    const json = await response.json()
    setToken(json.access_token)
    setRefreshToken(refreshToken)
  }

  return (
    <AuthContext.Provider
      value={{
        getRefreshedToken,
        token,
        setToken,
        refreshToken,
        setRefreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
