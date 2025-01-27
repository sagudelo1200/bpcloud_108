import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { PrivateRoute } from 'routes'

import AuthNavbar from 'components/Navbars/AuthNavbar.js'
import Footer from 'components/Footer/Footer.js'

import routes from 'routes.js'

const AuthLayout = (props) => {
  React.useEffect(() => {
    document.documentElement.classList.remove('nav-open')
  })
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/auth') {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text'
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        if (
          window.location.pathname.indexOf(
            routes[i].layout + routes[i].path
          ) !== -1
        ) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }
  const getFullPageName = (routes) => {
    let pageName = getActiveRoute(routes)
    switch (pageName) {
      case 'Ingresar':
        return 'Ingreso'
      case 'Bloqueo':
        return 'Bloqueo'
      default:
        return 'Default Brand Text'
    }
  }
  return (
    <>
      <AuthNavbar brandText={getActiveRoute(routes)} />
      <div className='wrapper wrapper-full-page'>
        <div className={'full-page ' + getFullPageName(routes)}>
          <Switch>
            {getRoutes(routes)}
            {localStorage.getItem('usuario') ? (
              <Redirect from='*' to='/auth/bloqueo' />
            ) : (
              <Redirect from='*' to='/auth/ingresar' />
            )}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
