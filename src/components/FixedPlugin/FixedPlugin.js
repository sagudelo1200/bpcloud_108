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

import { CustomInput } from 'reactstrap'

const FixedPlugin = (props) => {
  const [classes, setClasses] = React.useState('dropdown')
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem('darkMode') === 'dark' ? true : localStorage.getItem('darkMode') === 'light' ? false : true
  )

  const handleClick = () => {
    if (classes === 'dropdown') {
      setClasses('dropdown show')
    } else {
      setClasses('dropdown')
    }
  }
  const handleActiveMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', darkMode === false ? 'dark' : 'light')
    document.body.classList.toggle('white-content')
  }

  React.useEffect(() => {
    const mode = localStorage.getItem('darkMode')
    if (mode === 'light' && !document.body.classList.contains('white-content')) {
      setDarkMode(false)
      document.body.classList.add('white-content')
    }
  }, [])

  return (
    <div className='fixed-plugin'>
      <div className={classes}>
        <a
          href='#03Quimbayas'
          onClick={(e) => {
            e.preventDefault()
            handleClick()
          }}
        >
          <i className='fa fa-cog fa-2x' />
        </a>
        <ul className='dropdown-menu show'>
          <li className='header-title'>COLOR DE LA BARRA LATERAL</li>
          <li className='adjustments-line'>
            <div className='badge-colors text-center'>
              <span
                className={
                  props.activeColor === 'primary'
                    ? 'badge filter badge-primary active'
                    : 'badge filter badge-primary'
                }
                data-color='primary'
                onClick={() => {
                  props.handleActiveClick('primary')
                }}
              />
              <span
                className={
                  props.activeColor === 'orange'
                    ? 'badge filter badge-warning active'
                    : 'badge filter badge-warning'
                }
                data-color='warning'
                onClick={() => {
                  props.handleActiveClick('orange')
                }}
              />
              <span
                className={
                  props.activeColor === 'green'
                    ? 'badge filter badge-success active'
                    : 'badge filter badge-success'
                }
                data-color='success'
                onClick={() => {
                  props.handleActiveClick('green')
                }}
              />
              <span
                className={
                  props.activeColor === 'blue'
                    ? 'badge filter badge-info active'
                    : 'badge filter badge-info'
                }
                data-color='info'
                onClick={() => {
                  props.handleActiveClick('blue')
                }}
              />
              <span
                className={
                  props.activeColor === 'red'
                    ? 'badge filter badge-danger active'
                    : 'badge filter badge-danger'
                }
                data-color='danger'
                onClick={() => {
                  props.handleActiveClick('red')
                }}
              />
            </div>
          </li>
          <li className='header-title'>BARRA LATERAL MINI</li>
          <li className='adjustments-line'>
            <div className='togglebutton switch-sidebar-mini d-flex align-items-center justify-content-center'>
              <span className='label-switch'>NO</span>
              <CustomInput
                type='switch'
                id='switch-1'
                onChange={props.handleMiniClick}
                checked={props.sidebarMini}
                className='mt-n4'
              />
              <span className='label-switch ml-n3'>SI</span>
            </div>
          </li>
          <li className='header-title mt-3'>MODO</li>
          <li className='adjustments-line mb-3'>
            <div className='togglebutton switch-change-color d-flex align-items-center justify-content-center'>
              <span className='label-switch'>
                <i className='fa fa-sun fa-2x' />
              </span>
              <CustomInput
                type='switch'
                id='switch-2'
                onChange={handleActiveMode}
                checked={darkMode}
                className='mt-n4'
              />
              <span className='label-switch'>
                <i className='fa fa-moon fa-2x ml-n3' />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FixedPlugin
