import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import "./LoginPage.css"

function LoginPage() {
  const { setToken } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    // Aquí vendrá la integración con Keycloak
    // Por ahora simulamos que obtuvimos un token
    const mockToken = "token_from_keycloak_" + Date.now()
    localStorage.setItem("token", mockToken)
    setToken(mockToken)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Admin – Servicio B</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
