import React, { useEffect } from 'react'
import classNames from 'classnames'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from 'reactstrap'
import routes from 'routes.js'
import { Switch, Link, useRouteMatch } from 'react-router-dom'
import { PrivateRoute } from 'routes'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { toast } from 'react-toastify'

import { useAuth } from 'contexts/authContext'
import { updateProfile } from 'firebase/auth'

import IntegrantesTable from '../components/IntegrantesTable'
import { Redirect } from 'react-router'
import { useUsers } from 'usuarios/hooks/useUsers'
import SimpleModalForm from 'usuarios/components/forms/newUserSteps/SimpleModalForm'

import User from './User'

const { REACT_APP_TITLE } = process.env

const Unidad = () => {
  const { register, logout } = useAuth()
  const [data, setData] = React.useState([])
  const { path } = useRouteMatch()

  // Handle SimpleModalForm
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleNewUserModal = () => setIsOpen(!isOpen)
  const createUser = async (userData) => {
    toggleNewUserModal()
    // Acción para ocultar el alert de inicio de sesión
    localStorage.setItem('registering', true)

    const { email, documento, nombres, dirigenteDe } = userData
    let id
    const unidades = [
      'familia',
      'manada',
      'scouts',
      'sociedad',
      'clan',
      'adultos',
    ]

    for (let i = 0; i < unidades.length; i++) {
      const _unidad = unidades[i]

      const path = `integrantes/${documento}`
      const _docRef = doc(db, path)
      // valida que el documento no exista en la base de datos
      const docSnap = await getDoc(_docRef)
      if (docSnap.exists()) {
        toast.error(`El documento ya existe en la base de datos de ${_unidad}`)
        localStorage.removeItem('registering')
        throw new Error(
          `El documento ya existe en la base de datos de ${_unidad}`
        )
      }
    }

    // Validar que el email no exista en la base de datos y crear cuenta
    try {
      const res = await register(email, documento)
      await updateProfile(res.user, { displayName: nombres })
      id = res.user.uid
    } catch (error) {
      localStorage.removeItem('registering')
      if (error.code === 'auth/email-already-in-use') {
        toast.error('El correo electrónico ya está en uso.')
      } else if (error.code === 'auth/weak-password') {
        toast.error('El documento debe tener al menos 6 caracteres.')
      } else {
        toast.error(error.message)
      }
      throw error
    }

    try {
      // crea el documento de usuario de la app en la base de datos
      const docRef = doc(db, `integrantes/${documento}`)
      const userRef = doc(db, `usuarios/${id}`)
      let userAppData = {
        estado: 'activo',
        nombres: `${nombres}`,
        ref: docRef,
        unidad,
        role: unidad === 'adultos' ? 'admin' : 'usuario',
        roles: [unidad === 'adultos' ? 'admin' : 'usuario'],
      }
      if (unidad === 'adultos') {
        userAppData['dirigenteDe'] = dirigenteDe
      }

      await setDoc(userRef, userAppData)

      // Guardar los datos del integrante en la base de datos
      await setDoc(docRef, {
        ...userData,
        id_usuario: id,
        estado: 'activo',
      })

      localStorage.removeItem('registering')
      logout()
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
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

  const unidad = getActiveRoute(routes).toLowerCase()
  const [usuarios, loading] = useUsers(unidad)
  let datosUnidad = {}

  useEffect(() => {
    setData(
      usuarios.map((prop, key) => {
        return {
          ...prop,
          acciones: (
            // we've added some custom button actions
            <div className='actions-right'>
              {/* use this button to add a like kind of action */}
              <Button
                size='sm'
                className={classNames('btn-icon btn-link like', {
                  'btn-neutral': false,
                })}
              >
                <Link to={`/admin/integrantes/${prop.documento}`}>
                  <i className='fas fa-eye' />
                </Link>
              </Button>{' '}
              {/* use this button to remove the data row */}
              <Button
                onClick={() => alert('No disponible')}
                size='sm'
                color='danger'
                className={classNames('btn-icon btn-link like', {
                  'd-none': true,
                })}
              >
                <i className='fas fa-trash-alt' />
              </Button>{' '}
            </div>
          ),
        }
      })
    )

    function clean() {
      setData([])
    }

    return clean
  }, [usuarios, path, unidad])

  switch (unidad) {
    case 'familia':
      datosUnidad = {
        nombre: 'Familia Múládhára',
      }
      break
    case 'manada':
      datosUnidad = {
        nombre: 'Manada Swádhisthána',
      }
      break
    case 'aldea':
      datosUnidad = {
        nombre: 'Aldea Manipura',
      }
      break
    case 'scouts':
      datosUnidad = {
        nombre: 'Tropa Anahata',
      }
      break
    case 'sociedad':
      datosUnidad = {
        nombre: 'Sociedad Vishuddha',
      }
      break
    case 'clan':
      datosUnidad = {
        nombre: 'Clan Ajña',
      }
      break
    case 'adultos':
      datosUnidad = {
        nombre: 'Adultos Voluntarios',
      }
      break
    default:
      return <Redirect to='/admin/dashboard' />
  }

  document.title = `${datosUnidad.nombre} | ${REACT_APP_TITLE}`

  const component = () => {
    return (
      <>
        <Col md={8} className='ml-auto mr-auto'>
          <h2 className='text-center'>{datosUnidad.nombre}</h2>
        </Col>
        <Row className='mt-5'>
          <Col xs={12}>
            <Button
              color='success'
              className='btn-icon btn-3xl'
              onClick={toggleNewUserModal}
            >
              <i className='fas fa-user-plus' />
            </Button>

            <SimpleModalForm
              isOpen={isOpen}
              toggle={toggleNewUserModal}
              createUser={(userData) => {
                toast.promise(createUser(userData), {
                  pending: 'Creando usuario...',
                  success: 'Usuario creado correctamente',
                  error: 'Error al crear el usuario',
                })
              }}
              unidad={unidad}
            />
          </Col>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag='h2'>Integrantes</CardTitle>
              </CardHeader>
              <CardBody>
                <IntegrantesTable
                  data={data}
                  filterable
                  loading={loading}
                  resizable={false}
                  columns={[
                    {
                      Header: 'Documento',
                      accessor: 'documento',
                      filterable: true,
                    },
                    {
                      Header: 'Nombres',
                      accessor: 'nombreCompleto',
                      filterable: true,
                    },
                    {
                      Header: 'Correo',
                      accessor: 'email',
                    },
                    {
                      Header: 'Acciones',
                      accessor: 'acciones',
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className='-striped -highlight'
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <div className='content'>
        <Switch>
          <PrivateRoute exact path={path}>
            {component()}
          </PrivateRoute>
          <PrivateRoute exact path={`/admin/integrantes/:id`}>
            <User />
          </PrivateRoute>
          <Redirect to={`/admin/${unidad}`} />
        </Switch>
      </div>
    </>
  )
}

export default Unidad
