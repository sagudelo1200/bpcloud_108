/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  UncontrolledTooltip,
} from 'reactstrap'

import { useAuth } from 'contexts/authContext'
import { Link } from 'react-router-dom'

const AdminNavbar = (props) => {
  const { logoutAndRememberUser, logout, currentUser, userData } = useAuth()
  const [collapseOpen, setCollapseOpen] = React.useState(false)
  const [modalSearch, setModalSearch] = React.useState(false)
  const [color, setColor] = React.useState('navbar-transparent')
  React.useEffect(() => {
    window.addEventListener('resize', updateColor)
    return function cleanup() {
      window.removeEventListener('resize', updateColor)
    }
  })
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor('bg-white')
    } else {
      setColor('navbar-transparent')
    }
  }
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor('navbar-transparent')
    } else {
      setColor('bg-white')
    }
    setCollapseOpen(!collapseOpen)
  }
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setModalSearch(!modalSearch)
  }
  return (
    <>
      <Navbar
        className={classNames('navbar-absolute', {
          [color]: props.location.pathname.indexOf('full-screen-map') === -1,
        })}
        expand='lg'
      >
        <Container fluid>
          <div className='navbar-wrapper'>
            <div className='navbar-minimize d-inline'>
              <Button
                className='minimize-sidebar btn-just-icon'
                color='link'
                id='tooltip209599'
                onClick={props.handleMiniClick}
              >
                <i className='tim-icons icon-align-center visible-on-sidebar-regular' />
                <i className='tim-icons icon-bullet-list-67 visible-on-sidebar-mini' />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target='tooltip209599'
                placement='right'
              >
                Alternar barra lateral
              </UncontrolledTooltip>
            </div>
            <div
              className={classNames('navbar-toggle d-inline', {
                toggled: props.sidebarOpened,
              })}
            >
              <button
                className='navbar-toggler'
                type='button'
                onClick={props.toggleSidebar}
              >
                <span className='navbar-toggler-bar bar1' />
                <span className='navbar-toggler-bar bar3' />
                <span className='navbar-toggler-bar bar3' />
              </button>
            </div>
            <NavbarBrand href='' onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navigation'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={toggleCollapse}
          >
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className='ml-auto' navbar>
              <InputGroup className='search-bar d-none' tag='li'>
                <Button
                  color='link'
                  data-target='#searchModal'
                  data-toggle='modal'
                  id='search-button'
                  onClick={toggleModalSearch}
                >
                  <i className='tim-icons icon-zoom-split' />
                  <span className='d-lg-none d-md-block'>Buscar</span>
                </Button>
              </InputGroup>
              <Link
                className='text-light mt-2'
                to={props.layout === '/admin' ? '/docs' : '/admin'}
              >
                <small>
                  {props.layout === '/admin'
                    ? 'Ir a la documentación'
                    : 'Ir a la aplicación'}
                </small>
              </Link>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  nav
                >
                  <div className='notification d-none d-lg-block d-xl-block' />
                  <i className='fa-regular fa-bell'></i>
                  <p className='d-lg-none'>Notificaciones</p>
                </DropdownToggle>
                <DropdownMenu className='dropdown-navbar' right tag='ul'>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item text-center'>
                      <span role='img'> No hay nada aquí 👻 </span>
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  data-toggle='dropdown'
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className='photo'>
                    <img
                      alt='perfil'
                      src={currentUser.photoURL || 'https://picsum.photos/421'}
                    />
                  </div>
                  <b className='caret d-none d-lg-block d-xl-block' />
                  <p className='d-lg-none'>
                    {currentUser.displayName || 'Usuario'}
                  </p>
                </DropdownToggle>
                <DropdownMenu className='dropdown-navbar' right tag='ul'>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item'>
                      <Link
                        to={`/admin/integrantes/${userData.documento}`}
                        className='nav-link text-dark'
                      >
                        Perfil
                      </Link>
                    </DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag='li' />
                  <NavLink tag='li'>
                    <DropdownItem
                      className='nav-item'
                      onClick={logoutAndRememberUser}
                    >
                      <span className='fas fa-lock mr-1' />
                      Bloquear
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item' onClick={logout}>
                      <span className='fas fa-sign-out-alt mr-1' />
                      Cerrar sesión
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className='separator d-lg-none' />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName='modal-search'
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <div className='modal-header'>
          <Input id='inlineFormInputGroup' placeholder='BUSCAR' type='text' />
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={toggleModalSearch}
          >
            <i className='tim-icons icon-simple-remove' />
          </button>
        </div>
      </Modal>
    </>
  )
}

export default AdminNavbar
