import React from 'react'
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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap'

import { useAuth } from 'contexts/authContext'
import { toast } from 'react-toastify'

const { REACT_APP_TITLE } = process.env

const Lock = () => {
  const history = useHistory()
  const location = useLocation()
  const [state, setState] = React.useState({})
  const { login } = useAuth()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleRedirectOrBack = () => {
    history.replace(location.state?.from ?? '/')
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!state.pass) return

    try {
      const res = await login(user.email, state.pass)
      if (res) {
        handleRedirectOrBack()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignIn(e)
    }
  }
  
  React.useEffect(() => {
    if (!user.email) history.replace('/auth/ingresar')
    
    document.title = `Desbloquear | ${REACT_APP_TITLE}`
    document.body.classList.toggle('lock-page')
    return function cleanup() {
      document.body.classList.toggle('lock-page')
    }
  })


  return (
    <>
      <div className='content'>
        <Container>
          <Col className='ml-auto mr-auto' lg='4' md='6'>
            <Card className='card-lock card-white text-center'>
              <CardHeader>
                <img alt='Integrante' src={user.photoURL || 'https://picsum.photos/420'} />
              </CardHeader>
              <CardBody>
                <CardTitle tag='h4'>{user.displayName || user.email}</CardTitle>
                <InputGroup
                  className={classnames({
                    'input-group-focus': state.passFocus,
                  })}
                >
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <i className='tim-icons icon-key-25' />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder='Contraseña...'
                    type='password'
                    onChange={(e) => setState({ ...state, pass: e.target.value })}
                    onFocus={(e) => setState({ ...state, passFocus: true })}
                    onBlur={(e) => setState({ ...state, passFocus: false })}
                    onKeyPress={handleKeyPress}
                  />
                </InputGroup>
              </CardBody>
              <CardFooter>
                <Button
                  className='btn-round'
                  color='primary'
                  href='#03Quimbayas'
                  size='lg'
                  onClick={handleSignIn}
                >
                  Desbloquear
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  )
}

export default Lock
