import React from 'react'
// reactstrap components
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { useNotify } from 'contexts/notifyContext'

const ActivityCard = ({ activity, edit, publish, finish, remove }) => {
  const { warningWithConfirmAlert } = useNotify()

  const handlePublish = (e) => {
    e.preventDefault()
    warningWithConfirmAlert({
      message: `${activity.nombre} se programará para el ${activity.fecha}${
        activity.hora && ` a las ${activity.hora}`
      }.`,
      onConfirm: () => publish(activity),
    })
  }

  const handleFinish = (e) => {
    e.preventDefault()
    warningWithConfirmAlert({
      title: 'Finalizar actividad',
      message: `Esta a punto de archivar ${activity.nombre}`,
      onConfirm: () => finish(activity),
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()
    warningWithConfirmAlert({
      title: `¿Estás seguro de eliminar ${activity.nombre}?`,
      message: `Esta acción no se puede deshacer`,
      onConfirm: () => remove(activity),
    })
  }

  if (!activity) return 'No disponible'
  return (
    <>
      <Row className='d-flex justify-content-center'>
        <Col xs={12} className='text-center'>
          <div className='tools float-right'>
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                className='btn-link btn-icon'
                color='default'
                data-toggle='dropdown'
                type='button'
              >
                <i className='fas fa-cog' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  href='#Sattwa108'
                  onClick={(e) => {
                    e.preventDefault()
                    edit(activity)
                  }}
                >
                  <i className='fas fa-edit text-warning' />
                  Editar
                </DropdownItem>
                {activity.estado === 'programado' && (
                  <DropdownItem
                    href='#Sattwa108'
                    onClick={(e) => handlePublish(e)}
                  >
                    <i className='far fa-paper-plane text-info' />
                    Publicar
                  </DropdownItem>
                )}
                {activity.estado === 'publicado' && (
                  <DropdownItem
                    href='#Sattwa108'
                    onClick={(e) => handleFinish(e)}
                  >
                    <i className='fa-solid fa-box-archive text-success' />
                    Finalizar
                  </DropdownItem>
                )}
                <DropdownItem
                  className='text-danger'
                  href='#Sattwa108'
                  onClick={(e) => handleDelete(e)}
                >
                  <i className='fas fa-trash-alt' />
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <h4 className='text-primary'>
            {activity.nombre || 'Actividad sin nombre'}
          </h4>
        </Col>
        <Col xs={10} sm={4} md={3} className='text-center'>
          <img
            src={activity.imagen || 'https://via.placeholder.com/420'}
            alt='Publicidad de la actividad'
          />
        </Col>
        <Col sm={3} md={2} className='text-center text-sm-left'>
          {activity.lugar && (
            <span>
              <i className='fas fa-map-marker-alt text-danger mx-2' />{' '}
              {activity.lugar}
            </span>
          )}
          <br className='d-none d-sm-block' />
          {activity.fecha && (
            <span>
              <i className='fas fa-calendar-alt text-primary mx-2' />
              {activity.fecha}
            </span>
          )}
          <br />
          {activity.hora && (
            <span>
              <i className='fas fa-clock text-success ml-2 mr-1' />{' '}
              {activity.hora}
            </span>
          )}
          <br className='d-none d-sm-block' />
          {activity.presupuesto && (
            <span>
              <i className='fas fa-dollar-sign text-warning mx-2' />{' '}
              {activity.presupuesto}
            </span>
          )}
        </Col>
        <Col md={7} className='text-center mt-4 mt-md-0'>
          <p>{activity.descripcion}</p>
        </Col>
      </Row>
      <hr />
    </>
  )
}

export default ActivityCard
