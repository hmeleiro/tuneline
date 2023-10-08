import { createContext, useState } from 'react'

export const AuthContext = createContext('')

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [refreshToken, setRefreshToken] = useState(null)
  const [expiresAt, setExpiresAt] = useState(null)

  async function getToken () {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    setToken(accessToken)
    setRefreshToken(refreshToken)
  }

  async function getRefreshedToken (refreshToken) {
    const response = await fetch(
      '/api/auth/refresh_token?refresh_token=' + refreshToken
    )
    const json = await response.json()

    setToken(json.access_token)
    setRefreshToken(refreshToken)

    const now = new Date()
    const loginInfo = {
      access_token: json.access_token,
      refresh_token: refreshToken,
      expires_at: now.setSeconds(now.getSeconds() + 3600)
    }

    return loginInfo
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
        setExpiresAt
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
