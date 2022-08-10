import React from 'react'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from 'reactstrap'

const AuthNavbar = (props) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false)
  const [color, setColor] = React.useState('navbar-transparent')
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor('navbar-transparent')
    } else {
      setColor('bg-white')
    }
    setCollapseOpen(!collapseOpen)
  }

  return (
    <Navbar
      className={classnames('navbar-absolute fixed-top', color)}
      expand='lg'
    >
      <Container fluid>
        <div className='navbar-wrapper'>
          <NavbarBrand href='#03Quimbayas' onClick={(e) => e.preventDefault()}>
            {props.brandText} - 03 Quimbayas
          </NavbarBrand>
        </div>
        <button
          aria-controls='navigation-index'
          aria-expanded={false}
          aria-label='Toggle navigation'
          className='navbar-toggler'
          data-toggle='collapse'
          type='button'
          onClick={toggleCollapse}
        >
          <span className='navbar-toggler-bar navbar-kebab' />
          <span className='navbar-toggler-bar navbar-kebab' />
          <span className='navbar-toggler-bar navbar-kebab' />
        </button>
        <Collapse isOpen={collapseOpen} navbar>
          <Nav navbar className='ml-auto'>
            {localStorage.getItem('user') && props.brandText !== 'Bloqueo' ? (
              <NavItem>
                <NavLink to='/auth/bloqueo' className='nav-link'>
                  <i className='fas fa-unlock-alt mr-1' /> Desbloquear
                </NavLink>
              </NavItem>
            ) : null}
            {props.brandText === 'Bloqueo' ? (
              <NavItem>
                <NavLink to='/auth/ingresar' className='nav-link'>
                  <i className='fas fa-id-card-alt mr-1' /> Cambiar usuario
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default AuthNavbar
