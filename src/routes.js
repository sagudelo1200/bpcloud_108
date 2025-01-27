import { useLocation, Redirect, Route } from 'react-router-dom'
import { useAuth } from 'contexts/authContext'

import Login from 'views/Login'
import Lock from 'views/Lock'

import Dashboard from 'views/Dashboard.js'
import Unidad from 'usuarios/views/Unidad.js'
import NewUser from 'usuarios/components/NewUser'
import Actividades from 'actividades/views/Actividades'
import Asistencia from 'actividades/views/Asistencia'

// DOCS
import IndexDocs from 'documentacion/views/Index'

const routes = [
  {
    path: '',
    name: 'DOCUMENTACIÓN',
    icon: 'fas fa-file-code',
    component: IndexDocs,
    layout: '/docs',
    hideFromMenu: true,
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    icon: 'fas fa-sign-in-alt',
    component: Login,
    layout: '/auth',
    hideFromMenu: true,
  },
  {
    path: '/bloqueo',
    name: 'Bloqueo',
    icon: 'fas fa-lock',
    component: Lock,
    layout: '/auth',
    hideFromMenu: true,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: 'fas fa-chart-pie',
    component: Dashboard,
    layout: '/admin',
  },
  {
    collapse: true,
    name: 'Integrantes',
    layout: '/admin',
    icon: 'fas fa-users',
    state: 'integrantesCollapse',
    views: [
      {
        path: '/familia',
        name: 'Familia',
        mini: 'F',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/manada',
        name: 'Manada',
        mini: 'M',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/scouts',
        name: 'Scouts',
        mini: 'S',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/sociedad',
        name: 'Sociedad',
        mini: 'S',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/clan',
        name: 'Clan',
        mini: 'C',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/adultos',
        name: 'Adultos',
        mini: 'A',
        component: Unidad,
        layout: '/admin',
      },
      {
        path: '/nuevo-integrante',
        name: 'Nuevo Integrante',
        icon: 'fas fa-user-plus',
        component: NewUser,
        layout: '/admin',
      },
    ],
  },
  {
    collapse: true,
    layout: '/admin',
    name: 'Actividades',
    icon: 'fas fa-calendar-alt',
    state: 'actividadesCollapse',
    views: [
      {
        path: '/actividades',
        name: 'Control Actividades',
        icon: 'fa-brands fa-buromobelexperte',
        component: Actividades,
        layout: '/admin',
      },
      {
        path: '/asistencia',
        name: 'Control Asistencia',
        icon: 'fas fa-user-check',
        component: Asistencia,
        layout: '/admin',
        hideFromMenu: true,
      },
    ],
  },
]

// Redirecciona al login, bloqueo o página anterior según corresponda
const PrivateRoute = (props) => {
  const { isAuthenticated } = useAuth()
  const { path } = props
  const location = useLocation()

  if (
    path === '/auth/ingresar' ||
    path === '/auth/bloqueo' ||
    path === '/auth/recuperar-contrasena' ||
    path === '/auth/cambiar-contrasena'
  ) {
    return isAuthenticated() ? (
      <Redirect to={location.state?.from ?? '/admin/dashboard'} />
    ) : (
      <Route {...props} />
    )
  }
  return isAuthenticated() ? (
    <Route {...props} />
  ) : localStorage.getItem('usuario') ? (
    <Redirect
      to={{
        pathname: '/auth/bloqueo',
        state: { from: location.pathname },
      }}
    />
  ) : (
    <Redirect
      to={{
        pathname: '/auth/ingresar',
        state: { from: location.pathname },
      }}
    />
  )
}

export default routes
export { PrivateRoute }
