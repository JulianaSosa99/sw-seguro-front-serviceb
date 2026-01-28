import "./LoginSuccessPage.css"

function LoginSuccessPage() {
  return (
    <div className="login-success-container">
      <div className="login-success-card">
        <div className="login-success-checkmark">✓</div>
        <h1 className="login-success-title">Login Exitoso</h1>
        <p className="login-success-message">Has iniciado sesión correctamente</p>
      </div>
    </div>
  )
}

export default LoginSuccessPage
