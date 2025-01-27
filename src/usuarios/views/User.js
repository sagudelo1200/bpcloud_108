import React, { useEffect, useState } from 'react'
// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
} from 'reactstrap'

import { useParams, Redirect } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { DefaultLoading } from 'components/Animations/Loading'
import AddAdvancementModal from 'usuarios/components/forms/newUserSteps/AddAdvancementModal'

const { REACT_APP_TITLE } = process.env

const User = () => {
  const { unidad, id } = useParams()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const docRef = doc(db, `integrantes/${id}`)
  document.title = `${user.nombres || ''} ${
    user.apellidos || ''
  } | ${REACT_APP_TITLE}`

  const getUser = async () => {
    setLoading(true)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUser({ ...docSnap.data(), id: docSnap.id })
      setLoading(false)
      return true
    } else {
      setRedirect(true)
      setLoading(false)
      return false
    }
  }

  const calcAge = (date) => {
    const today = new Date()
    const birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  // Handle AddAscenso
  const [isOpenAscenso, setIsOpenAscenso] = React.useState(false)
  const toggleNewAscensoModal = () => setIsOpenAscenso(!isOpenAscenso)
  const createAscenso = async (ascenso) => {
    toggleNewAscensoModal()
  }

  const addAdvancementToList = (advancement) => {
    // validar si usuario ya tiene ese ascenso
    if (user.ascensos) {
      if (user.ascensos.find((ascenso) => ascenso.ref === advancement.ref)) {
        return
      }
    }
    const currentAdvancements = user.ascensos || []
    const newAdvancements = [...currentAdvancements, advancement]
    const newUser = { ...user, ascensos: newAdvancements }
    setUser(newUser)
  }

  useEffect(() => {
    /* getUser in a clean function */
    getUser()
    function clean() {
      setUser({})
      setLoading(false)
    }
    return clean
    // eslint-disable-next-line
  }, [])

  if (redirect) return <Redirect to={`/admin/${unidad}`} />

  return (
    <>
      <div className='content'>
        {loading ? (
          <DefaultLoading />
        ) : (
          <Row className='justify-content-center'>
            <Col sm='8' md='7'>
              {/* USER */}
              <Col md='9' className='mx-auto'>
                <Card className='card-user'>
                  <CardBody>
                    <div className='author'>
                      <div className='block block-one' />
                      <div className='block block-two' />
                      <div className='block block-three' />
                      <div className='block block-four' />
                      <a
                        href='#Sattwa108'
                        onClick={() => alert(JSON.stringify(user))}
                      >
                        <img
                          alt='...'
                          className='avatar'
                          src={user.foto || 'https://picsum.photos/420'}
                        />
                        <h4 className='title'>{`${user.nombres || ''} ${
                          user.apellidos || ''
                        }`}</h4>
                      </a>
                      <small>{user.email}</small>
                      <p className='description'>{unidad}</p>
                    </div>
                    <Row className='card-description'>
                      <Col md='6'>
                        <i className='fa-solid fa-cake-candles' /> Edad
                      </Col>
                      <Col md='6'>
                        {user.fechaNacimiento
                          ? calcAge(user.fechaNacimiento) + ' Años'
                          : '??'}
                      </Col>

                      <Col md='6'>
                        <i className='fa-solid fa-calendar-alt' /> Fecha de
                        nacimiento
                      </Col>
                      <Col md='6'>{user.fechaNacimiento}</Col>

                      <Col md='6'>
                        <i className='far fa-id-badge' /> Documento
                      </Col>
                      <Col md='6'>{user.documento}</Col>

                      <Col md='6'>
                        <i className='fas fa-phone-flip' /> Teléfono
                      </Col>
                      <Col md='6'>{user.telefono}</Col>

                      <Col md='6'>
                        <i className='fas fa-mobile-screen' /> Celular
                      </Col>
                      <Col md='6'>{user.celular}</Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    {/* <div className='button-container'>
                    <Button className='btn-icon btn-round' color='facebook'>
                      <i className='fab fa-facebook' />
                    </Button>
                    <Button className='btn-icon btn-round' color='twitter'>
                      <i className='fab fa-twitter' />
                    </Button>
                    <Button className='btn-icon btn-round' color='google'>
                      <i className='fab fa-google-plus' />
                    </Button>
                  </div> */}
                  </CardFooter>
                </Card>
              </Col>

              {/* FAMILIARES */}
              <Row className='align-items-center'>
                {user.madre?.nombre || user.padre?.nombre ? (
                  <>
                    <Col md='4'>
                      <Card>
                        <CardBody>
                          <CardTitle tag='h4'>{user.madre?.nombre}</CardTitle>
                          <CardSubtitle className='mb-2 text-muted' tag='h5'>
                            Madre
                          </CardSubtitle>
                          <CardText>
                            {user.madre?.documento}
                            {user.madre?.celular && (
                              <a
                                href={`https://api.whatsapp.com/send?phone=57${user.madre.celular}`}
                                rel='noreferrer'
                                target='_blank'
                                className='mr-1'
                              >
                                <Button
                                  className='btn-icon btn-round'
                                  color='success'
                                  type='button'
                                >
                                  <i className='fab fa-whatsapp' />
                                </Button>
                              </a>
                            )}
                            {user.madre?.email && (
                              <a
                                href={`mailto:${user.madre.email}`}
                                rel='noreferrer'
                                target='_blank'
                                className='mr-1'
                              >
                                <Button
                                  className='btn-icon btn-round'
                                  type='button'
                                >
                                  <i className='fas fa-envelope' />
                                </Button>
                              </a>
                            )}
                            {user.madre?.telefono && (
                              <a
                                href={`tel:+57604${user.madre.telefono}`}
                                rel='noreferrer'
                                target='_blank'
                              >
                                <Button
                                  className='btn-icon btn-round'
                                  color='primary'
                                  type='button'
                                >
                                  <i className='fas fa-phone-alt' />
                                </Button>
                              </a>
                            )}
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md='4'>
                      <Card>
                        <CardBody>
                          <CardTitle tag='h4'>{user.padre?.nombre}</CardTitle>
                          <CardSubtitle className='mb-2 text-muted' tag='h5'>
                            Padre
                          </CardSubtitle>
                          <CardText>
                            {user.padre?.documento}
                            {user.padre?.celular && (
                              <a
                                href={`https://api.whatsapp.com/send?phone=57${user.padre.celular}`}
                                rel='noreferrer'
                                target='_blank'
                                className='mr-1'
                              >
                                <Button
                                  className='btn-icon btn-round'
                                  color='success'
                                  type='button'
                                >
                                  <i className='fab fa-whatsapp' />
                                </Button>
                              </a>
                            )}
                            {user.padre?.email && (
                              <a
                                href={`mailto:${user.padre.email}`}
                                rel='noreferrer'
                                target='_blank'
                                className='mr-1'
                              >
                                <Button
                                  className='btn-icon btn-round'
                                  type='button'
                                >
                                  <i className='fas fa-envelope' />
                                </Button>
                              </a>
                            )}
                            {user.padre?.telefono && (
                              <a
                                href={`tel:+57604${user.padre.telefono}`}
                                rel='noreferrer'
                                target='_blank'
                              >
                                <Button
                                  className='btn-icon btn-round'
                                  color='primary'
                                  type='button'
                                >
                                  <i className='fas fa-phone-alt' />
                                </Button>
                              </a>
                            )}
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  </>
                ) : null}
                {user.acudiente?.nombre ? (
                  <Col md='4'>
                    <Card>
                      <CardBody>
                        <CardTitle tag='h4'>{user.acudiente?.nombre}</CardTitle>
                        <CardSubtitle className='mb-2 text-muted' tag='h5'>
                          Acudiente
                        </CardSubtitle>
                        <CardText>
                          {user.acudiente?.documento}
                          {user.acudiente?.celular && (
                            <a
                              href={`https://api.whatsapp.com/send?phone=57${user.acudiente.celular}`}
                              rel='noreferrer'
                              target='_blank'
                              className='mr-1'
                            >
                              <Button
                                className='btn-icon btn-round'
                                color='success'
                                type='button'
                              >
                                <i className='fab fa-whatsapp' />
                              </Button>
                            </a>
                          )}
                          {user.acudiente?.email && (
                            <a
                              href={`mailto:${user.acudiente.email}`}
                              rel='noreferrer'
                              target='_blank'
                              className='mr-1'
                            >
                              <Button
                                className='btn-icon btn-round'
                                type='button'
                              >
                                <i className='fas fa-envelope' />
                              </Button>
                            </a>
                          )}
                          {user.acudiente?.telefono && (
                            <a
                              href={`tel:+57604${user.acudiente.telefono}`}
                              rel='noreferrer'
                              target='_blank'
                            >
                              <Button
                                className='btn-icon btn-round'
                                color='primary'
                                type='button'
                              >
                                <i className='fas fa-phone-alt' />
                              </Button>
                            </a>
                          )}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                ) : null}
              </Row>
            </Col>
            <Col md='5'>
              {/* INFORMACIÓN MÉDICA */}
              <Card className='card-stats'>
                <CardBody>
                  <Row>
                    <Col xs='2'>
                      <div className='info-icon text-center icon-danger'>
                        <i className='fas fa-hand-holding-medical' />
                      </div>
                    </Col>
                    <Col xs='10'>
                      <div className='numbers'>
                        <CardTitle tag='h3' className='mb-0'>
                          INFORMACIÓN MÉDICA
                        </CardTitle>
                        <Button
                          className='btn-link p-0'
                          color='primary'
                          onClick={() => alert('Proximamente...')}
                        >
                          Ver <i className='fas fa-square-arrow-up-right' />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className='d-none'>
                  <hr />
                  <div className='stats'>
                    <i className='tim-icons icon-refresh-01' /> Recalcular
                  </div>
                </CardFooter>
              </Card>
              {/* ASCENSOS */}
              {unidad !== 'adultos' && (
                <Card className='text-center'>
                  <CardBody>
                    <div className='author'>
                      <div className='block block-one'>
                        <h4>FORMACIÓN SCOUT</h4>
                      </div>
                    </div>
                    <div className='row'>
                      {user.ascensos &&
                        user.ascensos.map((ascenso) => (
                          <div className='col-4 my-3' key={ascenso.nombre}>
                            <img
                              alt={ascenso.nombre}
                              className='img-raised rounded img-fluid'
                              src={
                                ascenso.img || 'https://via.placeholder.com/100'
                              }
                              title={ascenso.nombre}
                            />
                          </div>
                        ))}
                      <div className='col-4 my-3 d-flex align-items-center justify-content-center'>
                        <button onClick={createAscenso}>
                          <i className='fas fa-plus fa-2x' />
                        </button>
                        <AddAdvancementModal
                          isOpen={isOpenAscenso}
                          toggle={toggleNewAscensoModal}
                          createAscenso={createAscenso}
                          unidad={unidad}
                          user={user}
                          addAdvancementToList={addAdvancementToList}
                        />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>
                    {/* <div className='button-container'>
                    <Button className='btn-icon btn-round' color='facebook'>
                      <i className='fab fa-facebook' />
                    </Button>
                    <Button className='btn-icon btn-round' color='twitter'>
                      <i className='fab fa-twitter' />
                    </Button>
                    <Button className='btn-icon btn-round' color='google'>
                      <i className='fab fa-google-plus' />
                    </Button>
                  </div> */}
                  </CardFooter>
                </Card>
              )}
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}

export default User
