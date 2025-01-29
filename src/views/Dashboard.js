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
// react plugin used to create charts
import { Line } from 'react-chartjs-2'
// database interaction
import { db } from 'firebaseApp'
import { collection, getDocs, query, where } from 'firebase/firestore'

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Row,
  Col,
} from 'reactstrap'

// core components
import { chartExample1 } from 'variables/charts.js'
import { Helmet } from 'react-helmet'

const { REACT_APP_TITLE } = process.env

const Dashboard = () => {
  const [bigChartData, setbigChartData] = React.useState('data1')
  const [nIntegrantes, setIntegrantesN] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  const setBgChartData = (name) => {
    setbigChartData(name)
  }

  // Contar integrantes de todas las unidades
  const countIntegrantes = async () => {
    setLoading(true)
    const unidades = [
      'familia',
      'manada',
      'scouts',
      'sociedad',
      'clan',
      'adultos',
    ]

    unidades.forEach(async (unidad) => {
      const q = query(
        collection(db, `integrantes`),
        where('unidad', '==', unidad)
      )
      const querySnapshot = await getDocs(q)

      setIntegrantesN((prevState) => ({
        ...prevState,
        [unidad]: querySnapshot.size,
      }))
    })

    // REVISAR: <bug> que hace que el loading no se cargue
    // debido a esto, se hace un setTimeout para que se cargue.
    // extraño, pero funciona
    setTimeout(() => {
      setLoading(false)
    }, 420)
  }

  React.useEffect(() => {
    countIntegrantes()
  }, [])

  return (
    <>
      <Helmet>
        <title>{REACT_APP_TITLE}</title>
      </Helmet>
      <div className='content'>
        <Row className='justify-content-center'>
          {/* FAMILIA */}
          <Col className='px-1' xs='6' sm='4' md='3' xl='2'>
            <Card className='card-stats'>
              <CardBody>
                <Row>
                  <Col xs='4'>
                    <div className='info-icon text-center icon-primary'>
                      <i className='fas fa-person-hiking' />
                    </div>
                  </Col>
                  <Col xs='8'>
                    <div className='numbers'>
                      <p className='card-category'>FAMILIA</p>
                      <CardTitle tag='h3'>
                        {loading ? (
                          <i className='fas fa-circle-notch fa-spin' />
                        ) : (
                          nIntegrantes.familia
                        )}
                      </CardTitle>
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
          </Col>

          {/* MANADA */}
          <Col className='px-1' xs='6' sm='4' md='3' xl='2'>
            <Card className='card-stats'>
              <CardBody>
                <Row>
                  <Col xs='4'>
                    <div className='info-icon text-center icon-warning'>
                      <i className='fas fa-person-hiking' />
                    </div>
                  </Col>
                  <Col xs='8'>
                    <div className='numbers'>
                      <p className='card-category'>MANADA</p>
                      <CardTitle tag='h3'>
                        {loading ? (
                          <i className='fas fa-circle-notch fa-spin' />
                        ) : (
                          nIntegrantes.manada
                        )}
                      </CardTitle>
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
          </Col>

          {/* SCOUTS */}
          <Col className='px-1' xs='6' sm='4' md='3' xl='2'>
            <Card className='card-stats'>
              <CardBody>
                <Row>
                  <Col xs='4'>
                    <div className='info-icon text-center icon-success'>
                      <i className='fas fa-person-hiking' />
                    </div>
                  </Col>
                  <Col xs='8'>
                    <div className='numbers'>
                      <p className='card-category'>SCOUTS</p>
                      <CardTitle tag='h3'>
                        {loading ? (
                          <i className='fas fa-circle-notch fa-spin' />
                        ) : (
                          nIntegrantes.scouts
                        )}
                      </CardTitle>
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
          </Col>

          {/* SOCIEDAD */}
          <Col className='px-1' xs='6' sm='4' md='3' xl='2'>
            <Card className='card-stats'>
              <CardBody>
                <Row>
                  <Col xs='4'>
                    <div className='info-icon text-center icon-info'>
                      <i className='fas fa-person-hiking' />
                    </div>
                  </Col>
                  <Col xs='8'>
                    <div className='numbers'>
                      <p className='card-category'>SOCIEDAD</p>
                      <CardTitle tag='h3'>
                        {loading ? (
                          <i className='fas fa-circle-notch fa-spin' />
                        ) : (
                          nIntegrantes.sociedad
                        )}
                      </CardTitle>
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
          </Col>

          {/* CLAN */}
          <Col className='px-1' xs='6' sm='4' md='3' xl='2'>
            <Card className='card-stats'>
              <CardBody>
                <Row>
                  <Col xs='4'>
                    <div className='info-icon text-center icon-danger'>
                      <i className='fas fa-person-hiking' />
                    </div>
                  </Col>
                  <Col xs='8'>
                    <div className='numbers'>
                      <p className='card-category'>CLAN</p>
                      <CardTitle tag='h3'>
                        {loading ? (
                          <i className='fas fa-circle-notch fa-spin' />
                        ) : (
                          nIntegrantes.clan
                        )}
                      </CardTitle>
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
          </Col>

          {/* GRUPO */}
          <Col className='px-1' xs='6' sm='4' md='3' xl='2'>
            <Card className='card-stats'>
              <CardBody>
                <Row>
                  <Col>
                    <div className='numbers'>
                      <small className='card-category'>
                        ADULTOS VOLUNTARIOS
                      </small>
                      <CardTitle tag='h3'>
                        {loading ? (
                          <i className='fas fa-circle-notch fa-spin' />
                        ) : (
                          nIntegrantes.adultos || 0
                        )}
                      </CardTitle>
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
          </Col>

          <Col xs='12'>
            <Card className='card-chart'>
              <CardHeader>
                <Row>
                  <Col className='text-left' sm='6'>
                    <h5 className='card-category'>Promedio mensual</h5>
                    <CardTitle tag='h2'>Estadísticas</CardTitle>
                  </Col>
                  <Col sm='6'>
                    <ButtonGroup
                      className='btn-group-toggle float-right'
                      data-toggle='buttons'
                    >
                      <Button
                        color='info'
                        id='0'
                        size='sm'
                        tag='label'
                        className={classNames('btn-simple', {
                          active: bigChartData === 'data1',
                        })}
                        onClick={() => setBgChartData('data1')}
                      >
                        <span className='d-none d-sm-block d-md-block d-lg-block d-xl-block'>
                          Asistencia
                        </span>
                        <span className='d-block d-sm-none'>
                          <i className='tim-icons icon-single-02' />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className='chart-area'>
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard
