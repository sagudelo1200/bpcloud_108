import React from 'react'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from 'reactstrap'

const SimpleModalForm = ({ isOpen, toggle, createUser, unidad }) => {
  let defaultFormState = {
    nombres: '',
    apellidos: '',
    documento: '',
    email: '',
    unidad,
  }

  unidad === 'jefatura' && (defaultFormState.jefeDe = '')
  const [form, setForm] = React.useState(defaultFormState)
  const [errors, setErrors] = React.useState({})

  const verifyEmail = (email) => {
    // eslint-disable-next-line
    const email_regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email_regex.test(email)
  }

  const validate = () => {
    const errors = {}
    if (!form.nombres) errors.nombres = 'El nombres es requerido'
    if (!form.documento) errors.documento = 'El documento es requerido'
    if (!verifyEmail(form.email)) errors.email = 'El email no es válido'
    if (!form.email) errors.email = 'El email es requerido'
    if (form.documento.length < 6) errors.documento = 'Mínimo 6 caracteres'
    if (unidad === 'jefatura' && !form.jefeDe)
      errors.jefeDe = 'Revise este campo'
    return errors
  }

  const unidades = ['familia', 'manada', 'tropa', 'sociedad', 'clan']

  return (
    <Modal isOpen={isOpen} toggle={toggle} className='modal-sm'>
      <ModalHeader tag='h4' toggle={toggle}>
        Registro básico de usuario
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row className='d-flex justify-content-center'>
            <Col sm='12'>
              <FormGroup>
                <label>Nombres</label>
                <Input
                  className='text-dark'
                  type='text'
                  name='nombres'
                  id='nombres'
                  placeholder='Nombres'
                  value={form.nombres}
                  onChange={(e) =>
                    setForm({ ...form, nombres: e.target.value })
                  }
                />
                {errors.nombres && (
                  <span className='text-danger'>{errors.nombres}</span>
                )}
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <label>Apellidos</label>
                <Input
                  className='text-dark'
                  type='text'
                  name='apellidos'
                  id='apellidos'
                  placeholder='Apellidos'
                  value={form.apellidos}
                  onChange={(e) =>
                    setForm({ ...form, apellidos: e.target.value })
                  }
                />
                {errors.apellidos && (
                  <span className='text-danger'>{errors.apellidos}</span>
                )}
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <label>Documento</label>
                <Input
                  className='text-dark'
                  type='number'
                  name='documento'
                  id='documento'
                  placeholder='Documento de identidad'
                  min={0}
                  step={1}
                  value={form.documento}
                  onChange={(e) =>
                    setForm({ ...form, documento: e.target.value })
                  }
                />
                {errors.documento && (
                  <p className='text-danger'>{errors.documento}</p>
                )}
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <label>Correo (usuario de acceso al sistema)</label>
                <br />
                <small>
                  si N/A use: 108+<b>nombre.apellido</b>@gmail.com
                  <br />
                  Ej. 108+jhon.doe@gmail.com
                </small>
                <Input
                  className='text-dark'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Correo'
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className='text-danger'>{errors.email}</p>}
              </FormGroup>
            </Col>
            {unidad === 'jefatura' && (
              <Col sm='12'>
                <FormGroup>
                  <label>Unidad</label>
                  <Input
                    className='text-dark'
                    type='select'
                    name='jefeDe'
                    id='jefeDe'
                    value={form.jefeDe}
                    onChange={(e) =>
                      setForm({ ...form, jefeDe: e.target.value })
                    }
                  >
                    <option value='' disabled selected>
                      Seleccione...
                    </option>
                    {unidades.map((x, index) => (
                      <option key={index} value={x}>
                        {x}
                      </option>
                    ))}
                  </Input>
                  {errors.jefeDe && (
                    <p className='text-danger'>{errors.jefeDe}</p>
                  )}
                </FormGroup>
              </Col>
            )}
            <Col sm='12' className='d-flex justify-content-end'>
              <Link to='/admin/nuevo-integrante'>
                Ir al formulario avanzado{' '}
                <i className='fa-solid fa-up-right-from-square'></i>
              </Link>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color='primary'
          onClick={() => {
            if (Object.keys(validate()).length === 0) {
              createUser(form)
            } else {
              setErrors(validate())
            }
          }}
        >
          Crear
        </Button>
        <Button color='secondary' onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default SimpleModalForm
