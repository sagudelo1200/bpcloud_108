import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from 'reactstrap'

import ReactTable from 'components/ReactTable/ReactTable.js'
import { Helmet } from 'react-helmet'

const dataTable = [
  ['Airi Satou', 'Accountant', 'Tokyo', '33'],
  ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '47'],
  ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '66'],
  ['Bradley Greer', 'Software Engineer', 'London', '41'],
  ['Brenden Wagner', 'Software Engineer', 'San Francisco', '28'],
  ['Brielle Williamson', 'Integration Specialist', 'New York', '61'],
  ['Caesar Vance', 'Pre-Sales Support', 'New York', '21'],
  ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '22'],
  ['Charde Marshall', 'Regional Director', 'San Francisco', '36'],
  ['Colleen Hurst', 'Javascript Developer', 'San Francisco', '39'],
  ['Dai Rios', 'Personnel Lead', 'Edinburgh', '35'],
  ['Doris Wilder', 'Sales Assistant', 'Sidney', '23'],
  ['Fiona Green', 'Chief Operating Officer (COO)', 'San Francisco', '48'],
  ['Garrett Winters', 'Accountant', 'Tokyo', '63'],
  ['Gavin Cortez', 'Team Leader', 'San Francisco', '22'],
  ['Gavin Joyce', 'Developer', 'Edinburgh', '42'],
  ['Gloria Little', 'Systems Administrator', 'New York', '59'],
  ['Haley Kennedy', 'Senior Marketing Designer', 'London', '43'],
  ['Herrod Chandler', 'Sales Assistant', 'San Francisco', '59'],
  ['Hope Fuentes', 'Secretary', 'San Francisco', '41'],
  ['Howard Hatfield', 'Office Manager', 'San Francisco', '51'],
  ['Jackson Bradshaw', 'Director', 'New York', '65'],
  ['Jena Gaines', 'Office Manager', 'London', '30'],
  ['Jenette Caldwell', 'Development Lead', 'New York', '30'],
  ['Jennifer Chang', 'Regional Director', 'Singapore', '28'],
  ['Martena Mccray', 'Post-Sales support', 'Edinburgh', '46'],
  ['Michael Silva', 'Marketing Designer', 'London', '66'],
  ['Michelle House', 'Integration Specialist', 'Sidney', '37'],
  ['Olivia Liang', 'Support Engineer', 'Singapore', '64'],
  ['Paul Byrd', 'Chief Financial Officer (CFO)', 'New York', '64'],
  ['Prescott Bartlett', 'Technical Author', 'London', '27'],
  ['Quinn Flynn', 'Support Lead', 'Edinburgh', '22'],
  ['Rhona Davidson', 'Integration Specialist', 'Tokyo', '55'],
  ['Shou Itou', 'Regional Marketing', 'Tokyo', '20'],
  ['Sonya Frost', 'Software Engineer', 'Edinburgh', '23'],
  ['Suki Burks', 'Developer', 'London', '53'],
  ['Tatyana Fitzpatrick', 'Regional Director', 'London', '19'],
  ['Timothy Mooney', 'Office Manager', 'London', '37'],
  ['Unity Butler', 'Marketing Designer', 'San Francisco', '47'],
  ['Vivian Harrell', 'Financial Controller', 'San Francisco', '62'],
  ['Yuri Berry', 'Chief Marketing Officer (CMO)', 'New York', '40'],
  ['Tiger Nixon', 'System Architect', 'Edinburgh', '61'],
]

const { REACT_APP_TITLE } = process.env

const Actividades = () => {
  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        nombre: prop[1],
        id_actividad: prop[3],
        office: prop[2],
        age: prop[3],
        acciones: (
          // we've added some custom button actions
          <div className='actions-right'>
            {/* use this button to add a like kind of action */}
            <i className='tim-icons icon-heart-2 mx-2 text-success' />
            <i className='tim-icons icon-pencil mx-2 text-warning' />
            {/* use this button to remove the data row */}
            <i className='far fa-trash-can mx-2 text-danger' />
          </div>
        ),
      }
    })
  )

  return (
    <>
      <Helmet>
        <title>Actividades | {REACT_APP_TITLE}</title>
      </Helmet>
      <div className='content'>
        <Row className='d-flex justify-content-center'>
          <Col md={8} className='ml-auto mr-auto'>
            <h2 className='text-center'>Fichas de Actividad de Programa</h2>
          </Col>

          {/* Opcion para 'cards' en vistas pequeñas (móviles) */}
          <Col xs={12} className='d-sm-block d-md-none'>
            {/* input para filtro por id o nombre de actividad (input con pre-input icono lupa) */}
            <input
              type='text'
              id='myInput'
              onKeyUp={() => {
                // Declare variables
                let input, filter, cards, cardContainer, title, i
                input = document.getElementById('myInput')
                filter = input.value.toUpperCase()
                cardContainer = document.getElementById('myUL')
                cards = cardContainer.getElementsByClassName('card')
                // Loop through all list items, and hide those who don't match the search query
                for (i = 0; i < cards.length; i++) {
                  title = cards[i].querySelector('.card-body p.card-text')
                  if (title.innerText.toUpperCase().indexOf(filter) > -1) {
                    cards[i].style.display = ''
                  } else {
                    cards[i].style.display = 'none'
                  }
                }

                // console.log('input', input)
                // console.log('filter', filter)
              }}
              placeholder='Buscar por nombre o ID de actividad...'
              title='Escribe un nombre o ID'
              className='form-control mb-3'
            />

            {data.map((prop, key) => {
              return (
                <Card key={key} className='card'>
                  <CardHeader>
                    <CardTitle tag='h4'>{prop.nombre}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className='card-text'>
                      <strong>ID. Actividad:</strong> {prop.id_actividad}
                    </p>
                    <p className='card-text'>
                      <strong>Nombre:</strong> {prop.nombre}
                    </p>
                    <p className='card-text float-right'>
                        <i className='tim-icons icon-heart-2 mx-2 text-success' />
                        <i className='tim-icons icon-pencil mx-2 text-warning' />
                        <i className='far fa-trash-can mx-2 text-danger' />
                    </p>
                  </CardBody>
                </Card>
              )
            })}
          </Col>

          {/* Opcion para 'table' en vistas medianas */}
          <Col md={11} className='ml-auto mr-auto d-sm-none d-md-block'>
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Banco de Actividades</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: 'ID. Actividad',
                      accessor: 'id_actividad',
                    },
                    {
                      Header: 'Nombre',
                      accessor: 'nombre',
                    },
                    {
                      Header: 'Acciones',
                      accessor: 'acciones',
                      sortable: false,
                      filterable: false,
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
      </div>
    </>
  )
}

export default Actividades
