import React from 'react'
import {
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Button,
  Modal,
  Form,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
} from 'reactstrap'
import { toast } from 'react-toastify'

import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

import { useNotify } from 'contexts/notifyContext'
import { db } from 'firebaseApp'

const NewActivityModal = ({ isOpen, toggle, edit, updateItem, addItem }) => {
  const { successAlert } = useNotify()
  const defaultForm = {
    estado: 'programado',
    id: '',
    nombre: '',
    fecha: '',
    descripcion: '',
    imagen: '',
    lugar: '',
    hora: '',
    precio: '',
    unidades: [],
  }
  const [form, setForm] = React.useState(defaultForm)

  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value }
    setForm(newForm)
    validate(newForm)
  }

  const createActivity = async () => {
    setIsSubmitting(true)
    const res = await addDoc(collection(db, 'actividades'), form)
    addItem({ ...form, id: res.id })
    setIsSubmitting(false)
  }

  const editActivity = async () => {
    setIsSubmitting(true)
    await updateDoc(doc(db, 'actividades', form.id), form)
    updateItem(form)
    setIsSubmitting(false)
  }

  // function that verifies if value is a valid url
  const verifyUrl = (value) => {
    // eslint-disable-next-line
    var urlRex = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum
    if (urlRex.test(value)) {
      return true
    }
    return false
  }

  const trimData = (data) => {
    const newData = { ...data }
    Object.keys(newData).forEach((key) => {
      if (typeof newData[key] === 'string') {
        newData[key] = newData[key].trim()
      }
    })
    return newData
  }

  const validate = (altForm = null) => {
    const formData = altForm || form
    const values = trimData(formData)
    const newErrors = {}

    if (formData.unidades.length === 0) {
      newErrors.unidad = 'Seleccione al menos una unidad'
    }

    if (
      values.nombre === '' && values.fecha === '' &&
      values.descripcion === '' && values.imagen === '' &&
      values.lugar === '' && values.hora === '' &&
      values.precio === ''
    ) {
      newErrors.empty = 'Todos los campos estan vacios'
    }

    if (values.imagen !== '' && !verifyUrl(values.imagen)) newErrors.imagen = 'Debe ser una URL válida'
    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const errors = validate(form)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      if (!edit) {
        try {
          await createActivity()
          successAlert({
            message: 'Actividad creada con éxito',
            title: 'Nueva actividad',
          })
          toggle()
        } catch (err) {
          console.error(err)
        }
      } else if (form !== edit) {
        try {
          await editActivity()
          successAlert({
            message: 'Se han guardado los cambios',
          })
          toggle()
        } catch (err) {
          console.error(err)
        }
      } else {
        toast.info('No se han detectado cambios')
        toggle()
      }
    } else {
      if (errors.empty) {
        toast.error(errors.empty)
      } else if (errors.unidad) {
        toast.error(errors.unidad)
      } else {
        toast.warning('Hay errores en el formulario')
      }
    }
    setIsSubmitting(false)
  }

  const handleCheck = ({ target }) => {
    const { name, checked } = target
    let newForm = { ...form }
    /* check all options */
    if (name === 'todos') {
      if (checked) {
        newForm.unidades = [
          'familia',
          'manada',
          'tropa',
          'sociedad',
          'clan'
        ]
      } else {
        newForm.unidades = []
      }
    } else {
      if (checked) {
        newForm.unidades.push(name)
      } else {
        newForm.unidades = newForm.unidades.filter(item => item !== name)
      }
    }
    setForm(newForm)
  }

  React.useEffect(() => {
    setForm(edit || defaultForm)
    // eslint-disable-next-line
  }, [edit])

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size='lg'
      onClosed={() => setForm(edit || defaultForm)}
    >
      <ModalHeader tag='h4' toggle={toggle}>
        {edit ? `Editar actividad - ${edit.id}` : 'Nueva actividad'}
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row className='d-flex justify-content-center'>
            <Col xs='12'>
              <Row className='d-flex justify-content-center'>
                <Col xs='12' className='col-form-label text-center pb-0'>
                  <p>¿QUÉ UNIDADES PUEDEN PARTICIPAR?</p>
                </Col>
                <Col xs='12' className='col-form-label text-center pt-0'>
                  <FormGroup check inline>
                    <Label check className='text-dark'>
                      <Input
                        type='checkbox'
                        name='todos'
                        checked={form.unidades.length === 5}
                        onChange={handleCheck}
                      />
                      <span className='form-check-sign' />
                      Todos
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='checkbox'
                        name='familia'
                        checked={form.unidades.includes('familia')}
                        onChange={handleCheck}
                      />
                      <span className='form-check-sign' />
                      Familia
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='checkbox'
                        name='manada'
                        checked={form.unidades.includes('manada')}
                        onChange={handleCheck}
                      />
                      <span className='form-check-sign' />
                      Manada
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='checkbox'
                        name='tropa'
                        checked={form.unidades.includes('tropa')}
                        onChange={handleCheck}
                      />
                      <span className='form-check-sign' />
                      Tropa
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='checkbox'
                        name='sociedad'
                        checked={form.unidades.includes('sociedad')}
                        onChange={handleCheck}
                      />
                      <span className='form-check-sign' />
                      Sociedad
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type='checkbox'
                        name='clan'
                        checked={form.unidades.includes('clan')}
                        onChange={handleCheck}
                      />
                      <span className='form-check-sign' />
                      Clan
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col sm='6' lg='4'>
              <FormGroup>
                <Label for='nombre'>Nombre</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='nombre'
                  id='nombre'
                  placeholder='Nombre de la actividad'
                  value={form.nombre}
                  onChange={handleChange}
                  invalid={errors.nombre ? true : false}
                />
                <FormFeedback>{errors.nombre}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'>
              <FormGroup>
                <Label for='fecha'>Fecha</Label>
                <Input
                  className='text-dark'
                  type='date'
                  name='fecha'
                  id='fecha'
                  placeholder='Fecha de la actividad'
                  value={form.fecha}
                  onChange={handleChange}
                  invalid={errors.fecha ? true : false}
                />
                <FormFeedback>{errors.fecha}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'>
              <FormGroup>
                <Label for='hora'>Hora</Label>
                <Input
                  className='text-dark'
                  type='time'
                  name='hora'
                  id='hora'
                  placeholder='Hora de la actividad'
                  value={form.hora}
                  onChange={handleChange}
                  invalid={errors.hora ? true : false}
                />
                <FormFeedback>{errors.hora}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'>
              <FormGroup>
                <Label for='lugar'>Lugar</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='lugar'
                  id='lugar'
                  placeholder='Lugar de la actividad'
                  value={form.lugar}
                  onChange={handleChange}
                  invalid={errors.lugar ? true : false}
                />
                <FormFeedback>{errors.lugar}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'>
              <FormGroup>
                <Label for='precio'>Precio</Label>
                <Input
                  className='text-dark'
                  type='number'
                  name='precio'
                  id='precio'
                  placeholder='Precio de la actividad'
                  value={form.precio}
                  onChange={handleChange}
                  invalid={errors.precio ? true : false}
                />
                <FormFeedback>{errors.precio}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs='12' lg='4'>
              <FormGroup>
                <Label for='imagen'>Imagen</Label>
                <Input
                  className='text-dark'
                  type='url'
                  name='imagen'
                  id='imagen'
                  placeholder='URL de la imagen publicitaria'
                  value={form.imagen}
                  onChange={handleChange}
                  invalid={errors.imagen ? true : false}
                />
                <FormFeedback>{errors.imagen}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs='12' lg='8'>
              <FormGroup>
                <Label for='descripcion'>Descripción</Label>
                <Input
                  className='text-dark'
                  type='textarea'
                  name='descripcion'
                  id='descripcion'
                  placeholder='Descripción de la actividad'
                  value={form.descripcion}
                  onChange={handleChange}
                  invalid={errors.descripcion ? true : false}
                />
                <FormFeedback>{errors.descripcion}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit} disabled={isSubmitting}>
          {edit ? 'Guardar cambios' : 'Crear actividad'}
        </Button>
        <Button color='secondary' onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  )
}


export default NewActivityModal