'use client'
import { createContext, useEffect, useState } from 'react'

const getCookieValue = (cookieName) => {
  try {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim())
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1)
      }
    }
  } catch (error) {
    return null
  }
}

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(getCookieValue('accessToken') || null)

  useEffect(() => {}, [token])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
