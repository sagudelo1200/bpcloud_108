import React from 'react'
import { Switch, Redirect, useLocation } from 'react-router-dom'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'

// core components
import Footer from 'components/Footer/Footer.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js'
import AdminNavbar from 'components/Navbars/AdminNavbar'

import { useAuth } from 'contexts/authContext'

import routes from 'routes'
import { PrivateRoute } from 'routes'

import logo from 'assets/img/favicon.png'

var ps

const Docs = (props) => {
  const { currentUserData } = useAuth()

  const colors = {
    familia: 'primary',
    manada: 'orange',
    tropa: 'green',
    sociedad: 'blue',
    clan: 'red',
  }

  const [activeColor, setActiveColor] = React.useState('red')
  const [sidebarMini, setSidebarMini] = React.useState(
    localStorage.getItem('sidebarMini') === 'true'
      ? true
      : localStorage.getItem('sidebarMini') === 'false'
      ? false
      : true
  )
  const [opacity, setOpacity] = React.useState(0)
  const [sidebarOpened, setSidebarOpened] = React.useState(false)
  const mainPanelRef = React.useRef(null)
  const location = useLocation()
  React.useEffect(() => {
    // TODO: subir scroll al cambiar de "Paso" al crear usuario
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0
    }
  }, [location, currentUserData])
  React.useEffect(() => {
    setActiveColor(
      localStorage.getItem('activeColor') ||
        colors[currentUserData.jefeDe] ||
        colors[currentUserData.unidad] ||
        'red'
    )
    // eslint-disable-next-line
  }, [currentUserData])
  React.useEffect(() => {
    let innerMainPanelRef = mainPanelRef
    if (navigator.platform.indexOf('Win') > -1) {
      document.documentElement.classList.add('perfect-scrollbar-on')
      document.documentElement.classList.remove('perfect-scrollbar-off')
      ps = new PerfectScrollbar(mainPanelRef.current)
      mainPanelRef.current &&
        mainPanelRef.current.addEventListener('ps-scroll-y', showNavbarButton)
      let tables = document.querySelectorAll('.table-responsive')
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i])
      }
    }
    window.addEventListener('scroll', showNavbarButton)
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.documentElement.classList.add('perfect-scrollbar-off')
        document.documentElement.classList.remove('perfect-scrollbar-on')
        innerMainPanelRef.current &&
          innerMainPanelRef.current.removeEventListener(
            'ps-scroll-y',
            showNavbarButton
          )
      }
      window.removeEventListener('scroll', showNavbarButton)
    }
  }, [])
  const showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      (mainPanelRef.current && mainPanelRef.current.scrollTop > 50)
    ) {
      setOpacity(1)
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      (mainPanelRef.current && mainPanelRef.current.scrollTop <= 50)
    ) {
      setOpacity(0)
    }
  }
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views)
      }
      if (prop.layout === '/docs') {
        return (
          <PrivateRoute
            exact={prop.exact}
            id={key}
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
    let activeRoute = '108'
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
  const handleActiveClick = (color) => {
    setActiveColor(color)
    localStorage.setItem('activeColor', color)
  }
  const handleMiniClick = () => {
    if (document.body.classList.contains('sidebar-mini')) {
      setSidebarMini(false)
      localStorage.setItem('sidebarMini', false)
    } else {
      setSidebarMini(true)
      localStorage.setItem('sidebarMini', true)
    }
    document.body.classList.toggle('sidebar-mini')
  }
  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened)
    document.documentElement.classList.toggle('nav-open')
  }
  const closeSidebar = () => {
    setSidebarOpened(false)
    document.documentElement.classList.remove('nav-open')
  }
  React.useEffect(() => {
    if (
      localStorage.getItem('sidebarMini') === 'false' &&
      document.body.classList.contains('sidebar-mini')
    ) {
      setSidebarMini(false)
      document.body.classList.toggle('sidebar-mini')
    }
  }, [])
  return (
    <div className='wrapper'>
      <div className='navbar-minimize-fixed' style={{ opacity: opacity }}>
        <button
          className='minimize-sidebar btn btn-link btn-just-icon'
          onClick={handleMiniClick}
        >
          <i className='tim-icons icon-align-center visible-on-sidebar-regular text-muted' />
          <i className='tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted' />
        </button>
      </div>
      <Sidebar
        {...props}
        layout='/docs'
        routes={routes}
        activeColor={activeColor}
        logo={{
          outterLink: '/docs',
          text: 'DOCUMENTACIÓN',
          imgSrc: logo,
        }}
        closeSidebar={closeSidebar}
      />
      <div className='main-panel' ref={mainPanelRef} data={activeColor}>
        <AdminNavbar
          {...props}
          layout='/docs'
          handleMiniClick={handleMiniClick}
          brandText={getActiveRoute(routes)}
          sidebarOpened={sidebarOpened}
          toggleSidebar={toggleSidebar}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from='*' to='/docs' />
        </Switch>
        {
          // we don't want the Footer to be rendered on full screen maps page
          props.location.pathname.indexOf('full-screen-map') !== -1 ? null : (
            <Footer fluid />
          )
        }
      </div>
      <FixedPlugin
        activeColor={activeColor}
        sidebarMini={sidebarMini}
        handleActiveClick={handleActiveClick}
        handleMiniClick={handleMiniClick}
      />
    </div>
  )
}

export default Docs
