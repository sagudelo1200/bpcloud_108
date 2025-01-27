import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  Row,
  Col,
} from 'reactstrap'
import Select from 'react-select'
import { DefaultLoading } from 'components/Animations/Loading'

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from 'firebaseApp'

const Asistencia = () => {
  document.title = 'Asistencia | Sattwa 108'
  const [loading, setLoading] = React.useState(true)
  const [openedCollapses, setOpenedCollapses] = React.useState({})
  const [actividades, setActividades] = React.useState([])
  const [integrantes, setIntegrantes] = React.useState([])
  const [multipleSelect, setMultipleSelect] = React.useState({})

  const toggleOpenedCollapse = (collapse) => {
    setOpenedCollapses((prevState) => ({
      ...prevState,
      [collapse]: !prevState[collapse],
    }))
  }

  const collapse = (collapse) => {
    return openedCollapses[collapse]
  }

  const getData = async () => {
    setLoading(true)
    const q = query(
      collection(db, 'actividades'),
      where('estado', '==', 'publicado')
    )
    const qSnap = await getDocs(q)

    qSnap.forEach((doc) => {
      let data = doc.data()
      data.id = doc.id
      setActividades((prevState) => [...prevState, data])
    })

    const q2 = query(
      collection(db, 'usuarios'),
      where('role', '!=', 'superadmin')
    )
    const qSnap2 = await getDocs(q2)
    qSnap2.forEach((doc) => {
      setIntegrantes((prevState) => [
        ...prevState,
        { ...doc.data(), id: doc.id },
      ])
    })
    setLoading(false)
  }

  const handleMultipleSelectChange = (actividad, unidad, e) => {
    const dict = {
      ...multipleSelect,
      [unidad]: e || [],
    }
    setMultipleSelect(dict)
  }

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card className='pb-3'>
              <CardHeader>
                <h5 className='card-category'>Lista de actividades</h5>
                <CardTitle tag='h3'>Confirma los asistentes</CardTitle>
              </CardHeader>
              {loading ? (
                <DefaultLoading />
              ) : actividades.length === 0 ? (
                <>
                  <p className='text-center'>No hay resultados</p>
                </>
              ) : (
                <div
                  aria-multiselectable={true}
                  className='card-collapse'
                  id='accordion'
                  role='tablist'
                >
                  {actividades.map((item) => (
                    <Card className='card-plain' key={item.id}>
                      <CardHeader role='tab'>
                        <a
                          aria-expanded={collapse(item.id)}
                          href='/'
                          data-parent='#accordion'
                          data-toggle='collapse'
                          onClick={(e) => {
                            e.preventDefault()
                            toggleOpenedCollapse(item.id)
                          }}
                        >
                          {item.nombre}{' '}
                          <i className='tim-icons icon-minimal-down' />
                        </a>
                      </CardHeader>
                      <Collapse role='tabpanel' isOpen={collapse(item.id)}>
                        <CardBody>
                          {item.unidades
                            .filter((unidad) => unidad !== 'todos')
                            .map((unidad) => (
                              <Card
                                className='card-plain'
                                key={item.id + unidad}
                              >
                                <CardHeader role='tab'>
                                  <a
                                    aria-expanded={collapse(item.id + unidad)}
                                    href='/'
                                    data-parent='#accordion'
                                    data-toggle='collapse'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      toggleOpenedCollapse(item.id + unidad)
                                    }}
                                  >
                                    {unidad}{' '}
                                    <i className='tim-icons icon-minimal-down' />
                                  </a>
                                </CardHeader>
                                <Collapse
                                  role='tabpanel'
                                  isOpen={collapse(item.id + unidad)}
                                >
                                  <CardBody>
                                    <Row className='d-flex justify-content-center'>
                                      <Col sm='9'>
                                        <Select
                                          className='react-select success mt-1'
                                          classNamePrefix='react-select'
                                          placeholder='Integrantes'
                                          name={`multipleSelect${item.id}${unidad}`}
                                          closeMenuOnSelect={false}
                                          isMulti
                                          value={
                                            multipleSelect[
                                              `multipleSelect${item.id}${unidad}`
                                            ]
                                          }
                                          onChange={(e) =>
                                            handleMultipleSelectChange(
                                              item,
                                              unidad,
                                              e
                                            )
                                          }
                                          options={[
                                            {
                                              value: '',
                                              label:
                                                'Seleccione los asistentes',
                                              isDisabled: true,
                                            },
                                            ...integrantes
                                              .filter(
                                                (i) => i.unidad === unidad
                                              )
                                              .map((integrante) => ({
                                                value: integrante.id,
                                                label: integrante.name,
                                              })),
                                          ]}
                                        />
                                      </Col>
                                      <Col sm='2'>
                                        <button className='btn btn-success'>
                                          <i className='fa-solid fa-floppy-disk'></i>
                                        </button>
                                      </Col>
                                    </Row>
                                  </CardBody>
                                </Collapse>
                              </Card>
                            ))}
                        </CardBody>
                      </Collapse>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Asistencia
