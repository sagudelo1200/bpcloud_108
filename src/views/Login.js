import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import classnames from 'classnames'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap'
import { toast } from 'react-toastify'

import { useAuth } from 'contexts/authContext'
import { Helmet } from 'react-helmet'

const { REACT_APP_TITLE } = process.env

const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [emailState, setEmailState] = useState(null)
  const [emailFocus, setEmailFocus] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)
  const { login, rememberLogin } = useAuth()

  const stateFunctions = {
    setemail: setEmail,
    setpassword: setPassword,
  }

  const handleRedirectOrBack = () => {
    history.replace(location.state?.from ?? '/')
  }

  const handleChage = (e, type) => {
    const { name, value } = e.target
    switch (type) {
      case 'email':
        if (verifyEmail(value)) {
          setEmailState('has-success')
        } else {
          setEmailState('has-danger')
        }
        break
      default:
        break
    }
    stateFunctions['set' + name](value)
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!isValidated()) return false

    try {
      const res = await login(email, password)

      if (res) {
        rememberLogin(res.user)
        handleRedirectOrBack()
      }
    } catch (error) {
      const { code } = error
      if (email.length === 0 || password.length === 0)
        toast.warning('Todos los campos son obligatorios')
      else if (code === 'auth/user-not-found')
        toast.warning('Usuario no encontrado')
      else if (code === 'auth/wrong-password')
        toast.warning('Contraseña incorrecta')
      else if (code === 'auth/too-many-requests')
        toast.error('Demasiados intentos fallidos')
      else toast.error(code)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn(e)
    }
  }

  // Verifica si el valor ingresado es un email válido
  const verifyEmail = (value) => {
    var emailRex =
      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailRex.test(value)) {
      return true
    }
    return false
  }

  const isValidated = () => {
    if (emailState === 'has-success') return true

    if (verifyEmail(email)) {
      setEmailState('has-success')
    } else {
      setEmailState('has-danger')
    }

    return false
  }

  useEffect(() => {
    document.body.classList.toggle('login-page')
    return function cleanup() {
      document.body.classList.toggle('login-page')
    }
  })
  return (
    <>
      <Helmet>
        <title>Ingresar | {REACT_APP_TITLE}</title>
      </Helmet>
      <div className='content'>
        <Container>
          <Col className='ml-auto mr-auto' lg='4' md='6'>
            <Form className='form'>
              <Card className='card-login card-white'>
                <CardHeader>
                  <img
                    alt='login-card'
                    src={require('assets/img/card-success.png').default}
                  />
                  <CardTitle tag='h1'>Ingreso</CardTitle>
                </CardHeader>
                <CardBody className='pb-0'>
                  <InputGroup
                    className={classnames(emailState, {
                      'input-group-focus': emailFocus,
                    })}
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='tim-icons icon-email-85' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      placeholder='Correo...'
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => handleChage(e, 'email')}
                      onFocus={(e) => setEmailFocus(true)}
                      onBlur={(e) => setEmailFocus(false)}
                      onKeyPress={handleKeyPress}
                    />
                    {emailState === 'has-danger' && (
                      <label className='error w-100'>Correo inválido</label>
                    )}
                  </InputGroup>
                  <InputGroup
                    className={classnames({
                      'input-group-focus': passwordFocus,
                    })}
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='tim-icons icon-lock-circle' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      required
                      placeholder='Contraseña...'
                      type='password'
                      name='password'
                      value={password}
                      onChange={(e) => handleChage(e, 'password')}
                      onFocus={(e) => setPasswordFocus(true)}
                      onBlur={(e) => setPasswordFocus(false)}
                      onKeyPress={handleKeyPress}
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter className='pt-0'>
                  <Button
                    block
                    className='mb-3'
                    color='primary'
                    href='#Sattwa108'
                    onClick={handleSignIn}
                    size='lg'
                  >
                    Ingresar
                  </Button>
                  <div className='pull-right'>
                    <h6>
                      <a
                        className='link footer-link'
                        href='#Sattwa108'
                        onClick={(e) =>
                          alert(
                            'Por el momento no esta disponible, contacte al administrador del sistema'
                          )
                        }
                      >
                        Necesitas ayuda?
                      </a>
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default Login
