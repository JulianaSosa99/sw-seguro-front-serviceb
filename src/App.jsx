import { useAuth } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import "./App.css" 

function App() {
  const { token, loading } = useAuth()

  if (loading) {
    return <div>Cargando...</div>
  }

  return token ? <Dashboard /> : <LoginPage />
}

export default App
