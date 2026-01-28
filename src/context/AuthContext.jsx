import { createContext, useContext, useState, useEffect, useRef } from "react"
import keycloak from "../../keycloak"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const initRef = useRef(false)

  useEffect(() => {
    // Evitar doble inicialización en React 18 StrictMode
    if (initRef.current) return
    initRef.current = true

    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          pkceMethod: 'S256',
          checkLoginIframe: false
        })

        if (authenticated) {
          setToken(keycloak.token)
          localStorage.setItem('token', keycloak.token)
          
          // Auto-refresh token cada 60 segundos
          setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
              if (refreshed) {
                setToken(keycloak.token)
                localStorage.setItem('token', keycloak.token)
              }
            }).catch(() => {
              console.error('Failed to refresh token')
            })
          }, 60000)
        }

        setIsAuthReady(true)
        setLoading(false)
      } catch (error) {
        console.error('Error inicializando Keycloak:', error)
        setIsAuthReady(true)
        setLoading(false)
      }
    }

    initKeycloak()
  }, [])

  const login = () => {
    keycloak.login({
      redirectUri: window.location.origin
    })
  }

  const loginWithGoogle = () => {
    keycloak.login({
      idpHint: 'google',
      redirectUri: window.location.origin
    })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    keycloak.logout({
      redirectUri: window.location.origin
    })
  }

  const hasRole = (role) => {
    return keycloak.tokenParsed?.realm_access?.roles?.includes(role) || false
  }

  const isAdmin = () => {
    return hasRole('admin')
  }

  const getToken = () => {
    return keycloak.token || localStorage.getItem('token')
  }

  return (
    <AuthContext.Provider value={{ 
      token, 
      setToken, 
      logout, 
      loading, 
      isAuthReady,
      login,
      loginWithGoogle,
      hasRole,
      isAdmin,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
