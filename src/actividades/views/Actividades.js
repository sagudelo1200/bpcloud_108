import React, { useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from 'reactstrap'
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from 'firebaseApp'

import StickyBox from 'react-sticky-box'
import { DefaultLoading } from 'components/Animations/Loading'

import NewActivityModal from 'actividades/components/NewActivityModal'
import { useNotify } from 'contexts/notifyContext'
import ActivityCard from 'actividades/components/ActivityCard'

const Actividades = () => {
  document.title = 'Actividades | 03 Quimbayas'
  const { successAlert } = useNotify()
  const [edit, setEdit] = React.useState(null)
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [publicado, setPublicado] = React.useState([])
  const [loadingPublicado, setLoadingPublicado] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const updateItem = (newData) => {
    if (newData.estado === 'programado') {
      setData(data.map((item) => {
        if (item.id === newData.id) return newData
        return item
      }))
    } else {
      setPublicado(publicado.map((item) => {
        if (item.id === newData.id) return newData
        return item
      }))
    }
  }

  const addItem = (newData) => {
    setData([...data, newData])
  }

  const editActivity = async (activity) => {
    setEdit(activity)
    toggleModal()
  }

  const publishActivity = async (activity) => {
    const newData = { ...activity, estado: 'publicado' }

    try {
      await updateDoc(doc(db, 'actividades', activity.id), newData)
      const newDataList = data.filter((item) => item.id !== newData.id)
      setPublicado([...publicado, newData])
      setData(newDataList)
      successAlert({
        message: `La actividad ${newData.nombre} ha sido publicada`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const finishActivity = async (activity) => {
    const newData = { ...activity, estado: 'finalizado' }

    try {
      await updateDoc(doc(db, 'actividades', activity.id), newData)
      const newPubList = publicado.filter((item) => item.id !== newData.id)
      setPublicado(newPubList)
      successAlert({
        message: `La actividad ${newData.nombre} ha sido archivada`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const createActivity = async () => {
    await setEdit(null)
    toggleModal()
  }

  const deleteActivity = async (activity) => {
    let newData = data.filter(item => item.id !== activity.id)
    await deleteDoc(doc(db, 'actividades', activity.id))

    if (activity.estado === 'publicado') {
      newData = publicado.filter(item => item.id !== activity.id)
      setPublicado(newData)
    } else {
      setData(newData)
    }
    successAlert({
      title: (
        <strong className='text-danger'>
          <i className='fas fa-trash-alt text-danger mx-1' />
          {activity.nombre}
        </strong>
      ),
      message: 'Se ha eliminado la actividad correctamente.'
    })
  }

  const fetchPublicado = async () => {
    setLoadingPublicado(true)
    const newList = []
    const q = query(collection(db, 'actividades'), where('estado', '==', 'publicado'))
    const querySnap = await getDocs(q)
    querySnap.forEach((doc) => {
      newList.push({ ...doc.data(), id: doc.id })
    })
    setPublicado(newList)
    setLoadingPublicado(false)
  }

  const fetchData = async () => {
    setLoading(true)
    const newList = []
    const q = query(collection(db, 'actividades'), where('estado', '==', 'programado'))

    const querySnap = await getDocs(q)
    querySnap.forEach((doc) => {
      newList.push({ ...doc.data(), id: doc.id })
    })
    setData(newList)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    fetchPublicado()
  }, [])

  return (
    <>
      <div className='content'>
        <Row className='d-flex justify-content-center'>
          <Col sm={2} className='text-center'>
            <StickyBox offsetTop={20} offsetBottom={20}>
              <a
                href='#03Quimbayas'
                className='btn btn-success btn-round mb-3'
                onClick={(e) => {
                  e.preventDefault()
                  createActivity()
                }}
              >
                <i className='fas fa-calendar-plus mr-2 d-inline' />
                <span className='d-sm-none d-md-inline'>Agregar</span>
              </a>
              <NewActivityModal
                toggle={toggleModal}
                isOpen={isOpen}
                edit={edit}
                updateItem={updateItem}
                addItem={addItem}
              />
            </StickyBox>
          </Col>
          <Col sm={10}>
            <Row>
              <Col sm={12}>
                <Card>
                  <CardHeader>
                    <CardTitle tag='h3'>Actividades programadas</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {loading ? <DefaultLoading /> : data.length === 0 ? (
                      <>
                        <p className='text-center'>
                          No hay resultados
                        </p>
                      </>
                    ) : (
                      <>
                        {data.map((activity) => (
                          <ActivityCard
                            key={activity.id}
                            activity={activity}
                            edit={editActivity}
                            remove={deleteActivity}
                            finish={finishActivity}
                            publish={publishActivity}
                          />
                        ))}
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col sm='12'>
                <Card>
                  <CardHeader>
                    <CardTitle tag='h3'>Actividades publicadas</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {loadingPublicado ? <DefaultLoading /> : publicado.length === 0 ? (
                      <>
                        <p className='text-center'>
                          No hay resultados
                        </p>
                      </>
                    ) : (
                      <>
                        {publicado.map((activity) => (
                          <ActivityCard
                            key={activity.id}
                            activity={activity}
                            edit={editActivity}
                            remove={deleteActivity}
                            finish={finishActivity}
                            publish={publishActivity}
                          />
                        ))}
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}


export default Actividades
