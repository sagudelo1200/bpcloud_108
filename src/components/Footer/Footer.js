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
/*eslint-disable*/
import React from 'react'
import { Container, Row } from 'reactstrap'
// used for making the prop types of this component
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  return (
    <footer
      className={'footer pt-1' + (props.default ? ' footer-default' : '')}
    >
      <Container fluid={props.fluid ? true : false}>
        {/* <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/sagudelo1200">
              Santiago Agudelo
            </a>
          </li>{" "}
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://www.creative-tim.com/presentation"
            >
              About us
            </a>
          </li>{" "}
          <li className="nav-item">
            <a className="nav-link" href="https://blog.creative-tim.com">
              Blog
            </a>
          </li>
        </ul> */}
        <div className='copyright'>
          © {new Date().getFullYear()} hecho con ❤️ por{' '}
          <a
            href='https://github.com/sagudelo1200'
            target='_blank'
            rel='noopener noreferrer'
          >
            Santiago Agudelo
          </a>
        </div>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
}

export default Footer
