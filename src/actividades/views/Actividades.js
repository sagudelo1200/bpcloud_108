import React from 'react'
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
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key)
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.name +
                    ', \nposition: ' +
                    obj.position +
                    ', \noffice: ' +
                    obj.office +
                    ', \nage: ' +
                    obj.age +
                    '\n}.'
                )
              }}
              color='info'
              size='sm'
              className={classNames('d-none btn-icon btn-link like', {
                'btn-neutral': key < 1,
              })}
            >
              <i className='tim-icons icon-heart-2' />
            </Button>{' '}
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key)
                alert("You've clicked EDIT button on " + obj.nombre)
              }}
              color='warning'
              size='sm'
              className={classNames('btn-icon btn-link like', {
                'btn-neutral': key < 1,
              })}
            >
              <i className='tim-icons icon-pencil' />
            </Button>{' '}
            {/* use this button to remove the data row */}
            <Button
              onClick={() => {
                var newdata = data
                newdata.find((o, i) => {
                  if (o.id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    data.splice(i, 1)
                    console.log(data)
                    return true
                  }
                  return false
                })
                setData(newdata)
              }}
              color='danger'
              size='sm'
              className={classNames('btn-icon btn-link like', {
                'btn-neutral': key < 1,
              })}
            >
              <i className='far fa-trash-can' />
            </Button>{' '}
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
          <Col xs={12} md={12}>
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
