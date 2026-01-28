import { useAuth } from "../context/AuthContext"
import "./Dashboard.css"

function Dashboard() {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <h1 className="dashboard-title">Admin – Servicio B</h1>
        <button className="dashboard-logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="dashboard-content"></div>
    </div>
  )
}

export default Dashboard
