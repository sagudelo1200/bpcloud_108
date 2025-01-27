import React, { useEffect } from 'react'
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
import Select from 'react-select'
import { toast } from 'react-toastify'

import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'

import { db } from 'firebaseApp'

const AddAdvancementModal = ({
  isOpen,
  toggle,
  addAdvancementToList,
  addItem,
  unidad,
  user,
}) => {
  const defaultForm = {
    detalles: '',
    fecha: '',
    img: '',
    lugar: '',
    ref: null,
    nombre: '',
  }
  const [form, setForm] = React.useState(defaultForm)
  const [advancements, setAdvancements] = React.useState([])
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const dateValid = dateRegex.test(values.fecha)
    if (!dateValid) {
      newErrors.fecha = 'Fecha incorrecta'
    }
    if (!values.ref) {
      console.log('no ref')
      newErrors.ref = 'Seleccione una opción'
    }
    setErrors(newErrors)
    return newErrors
  }

  const handleChange = (e) => {
    const newForm = { ...form, [e.target.name]: e.target.value }
    validate(newForm)
    setForm(newForm)
  }

  const handleAdvancementChange = (e) => {
    const newForm = { ...form, ref: e.value, nombre: e.label }
    validate(newForm)
    setForm(newForm)
  }

  const getAdvancements = async () => {
    const colRef = await collection(db, 'unidades', unidad, 'ascensos')
    const querySnapshot = await getDocs(colRef)
    let data = []
    querySnapshot.forEach((doc) => {
      const x = doc.data()
      x.id = doc.id
      x.ref = doc.ref
      data.push(x)
    })
    setAdvancements(data)
  }

  const updateAscensos = async (ascensos) => {
    const docRef = doc(db, `integrantes/${user.id}`)
    const newUser = { ...user, ascensos }
    try {
      await updateDoc(docRef, newUser)
    } catch (error) {
      console.log(error)
      throw error
    }
    addAdvancementToList(form)
  }

  const addAdvancement = async () => {
    setIsSubmitting(true)
    const userAdvances = user.ascensos ?? []

    const isAlreadyInList = userAdvances.find((x) => x.nombre === form.nombre)
    if (isAlreadyInList) {
      toast.error('Ya se ha otorgado este ascenso.')
      setIsSubmitting(false)
      return
    }

    userAdvances.push(form)

    toast.promise(updateAscensos(userAdvances), {
      pending: 'Agregando ascenso...',
      success: 'Agregado correctamente',
      error: 'Error al agregar',
    })

    toggle()
    setForm(defaultForm)
    setIsSubmitting(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const errors = validate(form)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      try {
        await addAdvancement()
        toggle()
      } catch (err) {
        console.error(err)
      }
    } else {
      toast.warning('Hay errores en el formulario')
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    getAdvancements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      size='lg'
      onClosed={() => setForm(defaultForm)}
    >
      <ModalHeader tag='h4' toggle={toggle}>
        Avances en su formación Scout
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row className='d-flex justify-content-center'>
            <Col sm='6' lg='4'>
              <FormGroup>
                {/* <Label for='ref'>Ascenso</Label>
                <Select
                  options={advancements.map((x) => ({ value: x.id, label: x.nombre }))}
                  onChange={handleSelect}
                  value={advancements.find((x) => x.id === form.ref)}
                  name='ref'
                  placeholder='Selecciona un ascenso'
                  defaultValue=''
                /> */}
                <Label for='ref'>Ascenso</Label>
                <Select
                  required
                  className='react-select'
                  classNamePrefix='react-select'
                  name='ref'
                  onChange={handleAdvancementChange}
                  options={advancements.map((x) => ({
                    name: 'ref',
                    value: x.ref,
                    label: x.nombre,
                  }))}
                  placeholder='Selecciona un ascenso'
                />
                <small className='text-warning'>{errors.ref}</small>
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
                  value={form.fecha}
                  onChange={handleChange}
                  invalid={errors.fecha ? true : false}
                />
                <FormFeedback>{errors.fecha}</FormFeedback>
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
                  placeholder='Lugar donde fué otorgado'
                  value={form.lugar}
                  onChange={handleChange}
                  invalid={errors.lugar ? true : false}
                />
                <FormFeedback>{errors.lugar}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs='12' lg='8'>
              <FormGroup>
                <Label for='detalles'>Descripción</Label>
                <Input
                  className='text-dark'
                  type='textarea'
                  name='detalles'
                  id='detalles'
                  placeholder='Añada detalles si los hubiera'
                  value={form.detalles}
                  onChange={handleChange}
                  invalid={errors.detalles ? true : false}
                />
                <FormFeedback>{errors.detalles}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={handleSubmit} disabled={isSubmitting}>
          Otorgar ascenso
        </Button>
        <Button color='secondary' onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddAdvancementModal
