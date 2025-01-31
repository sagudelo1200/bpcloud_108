import React from 'react'
// react component used to create a calendar with events on it
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
// dependency plugin for react-big-calendar
import moment from 'moment'

// title
import Helmet from 'react-helmet'

// react component used to create alerts
import SweetAlert from 'react-bootstrap-sweetalert'

// reactstrap components
import { Card, CardBody, Row, Col } from 'reactstrap'

import { events } from 'variables/general.js'

const localizer = momentLocalizer(moment)

const { REACT_APP_TITLE } = process.env

const Cronograma = () => {
  const [event, setEvents] = React.useState(events)
  const [alert, setAlert] = React.useState(null)
  const selectedEvent = (event) => {
    window.alert(event.title)
  }
  const addNewEventAlert = (slotInfo) => {
    setAlert(
      <SweetAlert
        input
        showCancel
        style={{ display: 'block', marginTop: '-100px' }}
        title='Programar una actividad'
        onConfirm={(e) => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle='info'
        cancelBtnBsStyle='danger'
      />
    )
  }
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end,
    })
    setAlert(null)
    setEvents(newEvents)
  }
  const hideAlert = () => {
    setAlert(null)
  }
  const eventColors = (event, start, end, isSelected) => {
    var backgroundColor = 'event-'
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + 'default')
    return {
      className: backgroundColor,
    }
  }
  return (
    <>
      <Helmet>
        <title>Cronograma | {REACT_APP_TITLE}</title>
      </Helmet>
      <div className='content'>
        {alert}
        <Row>
          <Col md={8} className='ml-auto mr-auto'>
            <h2 className='text-center'>Cronograma de Actividades</h2>
          </Col>
          <Col className='ml-auto mr-auto' md='10'>
            <Card className='card-calendar'>
              <CardBody>
                <BigCalendar
                  selectable
                  messages={{
                    week: 'Semana',
                    work_week: 'Semana Laboral',
                    day: 'Día',
                    month: 'Mes',
                    previous: 'Anterior',
                    next: 'Siguiente',
                    agenda: 'Agenda',
                    allDay: 'Todo el día',
                    date: 'Fecha',
                    event: 'Evento',
                    time: 'Hora',
                    noEventsInRange: 'No hay eventos en este rango',
                    yesterday: 'Ayer',
                    today: 'Hoy',
                    tomorrow: 'Mañana',

                    showMore: (total) => `+${total} más`,
                  }}
                  localizer={localizer}
                  events={event}
                  defaultView='month'
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={(event) => selectedEvent(event)}
                  onSelectSlot={(slotInfo) => addNewEventAlert(slotInfo)}
                  eventPropGetter={eventColors}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Cronograma
