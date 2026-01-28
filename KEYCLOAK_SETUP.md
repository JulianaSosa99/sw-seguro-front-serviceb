# 🚀 INSTRUCCIONES PARA SERVICIO B

## 1️⃣ Instalar dependencias

```powershell
cd c:\Users\Danie\Documents\repos\sw-seguro-front-serviceb
npm install
```

## 2️⃣ Configurar Keycloak

Ve a http://localhost:8443/admin (admin/admin)

### Realm: CoreManager → Clients → coremanager-api → Settings

**Agregar estas URIs:**

Valid redirect URIs:
- http://localhost:5174/*

Web origins:
- http://localhost:5174

**Guardar cambios**

## 3️⃣ Iniciar el frontend

```powershell
npm run dev
```

El frontend correrá en: **http://localhost:5174**

## 4️⃣ Probar login

1. Abre http://localhost:5174
2. Click en "🔐 Iniciar Sesión con Keycloak (SSO)"
3. Usa: `admin@coremanager.com` / `Admin123!`
4. O usa: "Continuar con Google"

## ✅ Características implementadas

- ✅ Login con Keycloak SSO
- ✅ Login con Google OAuth
- ✅ Auto-refresh de tokens cada 60 segundos
- ✅ PKCE S256 para seguridad
- ✅ Protección contra doble inicialización (React 18)
- ✅ Roles: `hasRole()`, `isAdmin()`
- ✅ Logout con cierre de sesión en Keycloak

## 🔧 Funciones disponibles en useAuth()

```jsx
const { 
  token,           // Token JWT actual
  login,           // Login con Keycloak
  loginWithGoogle, // Login con Google OAuth
  logout,          // Cerrar sesión
  hasRole,         // Verificar si tiene un rol
  isAdmin,         // Verificar si es admin
  getToken         // Obtener token actual
} = useAuth()
```

## 📝 Ejemplo: Verificar roles

```jsx
import { useAuth } from './context/AuthContext'

function Dashboard() {
  const { hasRole, isAdmin } = useAuth()
  
  return (
    <div>
      {isAdmin() && <AdminPanel />}
      {hasRole('user') && <UserPanel />}
    </div>
  )
}
```
