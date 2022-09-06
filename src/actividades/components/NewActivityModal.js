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
  UncontrolledTooltip,
} from 'reactstrap'
import { toast } from 'react-toastify'

import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'

import { useNotify } from 'contexts/notifyContext'
import { db } from 'firebaseApp'

const NewActivityModal = ({ isOpen, toggle, edit, updateItem, addItem }) => {
  const { successAlert } = useNotify()
  const defaultForm = {
    unidades: [],
    fecha: '',
    hora: '',
    lugar: '',
    nombre: '',
    objetivo: '',
    descripcion: '',
    presupuesto: '',
    juegos: '',
    cancion: '',
    materiales: '',
    responsable: '',
    id: '',
    imagen: '',
    estado: 'programado',
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
          <Row className='d-flex justify-content-center align-items-center'>
            <Col xs='12'> {/* UNIDADES */}
              <Row className='d-flex justify-content-center'>
                <Col xs='12' className='col-form-label text-center pb-0'>
                  <p><i className='fas fa-users-line' /> ¿QUÉ UNIDADES PUEDEN PARTICIPAR?</p>
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
            <Col sm='6' lg='4'> {/* FECHA */}
              <FormGroup>
                <Label for='fecha'><i className='fas fa-calendar-day' /> Fecha</Label>
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
            <Col sm='6' lg='4'> {/* HORA */}
              <FormGroup>
                <Label for='hora'><i className='far fa-clock' />  Hora</Label>
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
            <Col sm='6' lg='4'> {/* LUGAR */}
              <FormGroup>
                <Label for='lugar'><i className='fas fa-location-dot' /> Lugar</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='lugar'
                  id='lugar'
                  placeholder='¿Donde se va a desarrollar?'
                  value={form.lugar}
                  onChange={handleChange}
                  invalid={errors.lugar ? true : false}
                />
                <FormFeedback>{errors.lugar}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* NOMBRE */}
              <FormGroup>
                <Label for='nombre'><i className='fas fa-text-width' /> Nombre</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='nombre'
                  id='nombre'
                  placeholder='Tema de la actividad'
                  value={form.nombre}
                  onChange={handleChange}
                  invalid={errors.nombre ? true : false}
                />
                <FormFeedback>{errors.nombre}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* OBJETIVO */}
              <FormGroup>
                <Label for='objetivo'><i className='fas fa-star' /> Objetivo</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='objetivo'
                  id='objetivo'
                  placeholder='El fin al que desea llegar...'
                  value={form.objetivo}
                  onChange={handleChange}
                  invalid={errors.objetivo ? true : false}
                />
                <FormFeedback>{errors.objetivo}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* IMAGEN */}
              <FormGroup>
                <Label for='imagen'><i className='fas fa-image' /> Imagen</Label>
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
            <Col xs='12' lg='8'> {/* DESCRIPCION */}
              <FormGroup>
                <Label for='descripcion'><i className='far fa-comments' /> Descripción</Label>
                <Input
                  className='text-dark'
                  type='textarea'
                  name='descripcion'
                  id='descripcion'
                  placeholder='Indique el paso a paso de como se va a desarrollar'
                  value={form.descripcion}
                  onChange={handleChange}
                  invalid={errors.descripcion ? true : false}
                />
                <FormFeedback>{errors.descripcion}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* CANCIÓN */}
              <FormGroup>
                <Label for='cancion'><i className='fas fa-guitar' /> Canción</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='cancion'
                  id='cancion'
                  placeholder=''
                  value={form.cancion}
                  onChange={handleChange}
                  invalid={errors.cancion ? true : false}
                />
                <FormFeedback>{errors.cancion}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* JUEGOS */}
              <FormGroup>
                <Label for='juegos'><i className='fas fa-ghost' /> Juegos</Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='juegos'
                  id='juegos'
                  placeholder=''
                  value={form.juegos}
                  onChange={handleChange}
                  invalid={errors.juegos ? true : false}
                />
                <FormFeedback>{errors.juegos}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* MATERIALES */}
              <FormGroup>
                <Label id='mat' for='materiales'><i className='fas fa-dolly' /> Materiales <i className='far fa-circle-question text-danger' />
                  <UncontrolledTooltip target='mat' placement='top'>
                    Separados por coma  ( , )
                  </UncontrolledTooltip>
                </Label>
                <Input
                  className='text-dark'
                  type='text'
                  name='materiales'
                  id='materiales'
                  placeholder='Ej: 3 carpas, 20 palos, 2 lasos'
                  value={form.materiales}
                  onChange={handleChange}
                  invalid={errors.materiales ? true : false}
                />
                <FormFeedback>{errors.materiales}</FormFeedback>
              </FormGroup>
            </Col>
            <Col sm='6' lg='4'> {/* PRESUPUESTO */}
              <FormGroup>
                <Label for='presupuesto'><i className='fas fa-hand-holding-dollar' /> Presupuesto</Label>
                <Input
                  className='text-dark'
                  type='number'
                  name='presupuesto'
                  id='presupuesto'
                  placeholder='¿Cuanto va a costar?'
                  value={form.presupuesto}
                  onChange={handleChange}
                  invalid={errors.presupuesto ? true : false}
                />
                <FormFeedback>{errors.presupuesto}</FormFeedback>
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