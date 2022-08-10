import React from 'react'
import {
  Col,
  Row,
  Label,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput
} from 'reactstrap'
import Select from 'react-select'

const PasosSalud = React.forwardRef((props, ref) => {
  const [form, setForm] = React.useState({
    rh: '',
    eps: '',
    medicinaPrepagada: '',
    enfermedadesPadece: [],
    enfermedadesPadecidas: [],
    vacunas: [],
    intervenciones: [],
    alergias: [],
    antecedentesTrauma: [],
    medicamentos: '',
    problemasExposicionSol: '',
    regimenAlimenticio: '',
    limitacionesFisicas: '',
    gafas: false,
    lentes: false,
    restriccionesMedicas: '',
    restriccionesActividades: '',
  })

  const handleSelect = e => {
    const { name, value } = e
    setForm({ ...form, [name]: value })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleCheck = e => {
    const { name, checked } = e.target
    setForm({ ...form, [name]: checked })
  }


  const handleList = (e) => {
    const { name, value } = e.target
    let newList = form[name]

    if (value) {
      newList = value.split(',')
    } else {
      newList = []
    }

    setForm({ ...form, [name]: newList })
  }


  const isValidated = () => {
    return true
  }

  React.useImperativeHandle(ref, () => ({
    isValidated: () => isValidated(),
    state: form
  }))

  React.useEffect(() => {
    /* scroll to top */
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <h4 className='info-text'>
        Registre la ficha médica
      </h4>
      <Row>
        <Col sm={4}>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-vial' />
              </InputGroupText>
            </InputGroupAddon>
            <Select
              className='react-select'
              classNamePrefix='react-select'
              name='rh'
              onChange={handleSelect}
              options={[
                { label: 'Seleccione tipo de sangre', isDisabled: true },
                { name: 'rh', value: 'A+', label: 'A+' },
                { name: 'rh', value: 'A-', label: 'A-' },
                { name: 'rh', value: 'B+', label: 'B+' },
                { name: 'rh', value: 'B-', label: 'B-' },
                { name: 'rh', value: 'AB+', label: 'AB+' },
                { name: 'rh', value: 'AB-', label: 'AB-' },
                { name: 'rh', value: 'O+', label: 'O+' },
                { name: 'rh', value: 'O-', label: 'O-' }
              ]}
              placeholder='Tipo de sangre...'
            />
          </InputGroup>
        </Col>
        <Col sm={4}>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='far fa-hospital' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='eps'
              placeholder='EPS...'
              onChange={handleChange}
              value={form.eps}
            />
          </InputGroup>
        </Col>
        <Col sm={4}>
          <CustomInput
            className='mt-2'
            type='switch'
            id='medicinaPrepagada'
            name='medicinaPrepagada'
            label={`Medicina prepagada ${form.medicinaPrepagada ? '✔' : '✘'}`}
            onChange={handleCheck}
          />
        </Col>
      </Row>
      <Row className='mx-auto mb-4'>
        {/* Vacunas */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-syringe mr-1' />
          Vacunas recibidas<br />
          <small className='text-muted'>
            Separados por una coma (,)
          </small>
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='vacunas'
              placeholder='Vacunas...'
              onChange={handleList}
              value={form.vacunas.join(',')}
            />
          </FormGroup>
        </Col>
        {/* Enfermedades que padece */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fa-solid fa-bed-pulse mr-1' />
          Enfermedades que padece<br />
          <small className='text-muted'>
            Separados por una coma (,)
          </small>
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='enfermedadesPadece'
              placeholder='Enfermedades que tiene...'
              onChange={handleList}
              value={form.enfermedadesPadece.join(',')}
            />
          </FormGroup>
        </Col>
        {/* Enfermedades que ha padecido */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-heartbeat mr-1' />
          Enfermedades que ha padecido<br />
          <small className='text-muted'>
            Separados por una coma (,)
          </small>
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='enfermedadesPadecidas'
              placeholder='Enfermedades que ha tenido...'
              onChange={handleList}
              value={form.enfermedadesPadecidas.join(',')}
            />
          </FormGroup>
        </Col>
        {/* Intervenciones */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fa fa-diagnoses mr-1' />
          Intervenciones quirúrgicas<br />
          <small className='text-muted'>
            Separados por una coma (,)
          </small>
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='intervenciones'
              placeholder='Intervenciones quirúrgicas...'
              onChange={handleList}
              value={form.intervenciones.join(',')}
            />
          </FormGroup>
        </Col>
        {/* Alergias */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-allergies mr-1' />
          Alergias (medicamentos, alimentos, etc...)<br />
          <small className='text-muted'>
            Separados por una coma (,)
          </small>
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='alergias'
              placeholder='Alergias...'
              onChange={handleList}
              value={form.alergias.join(',')}
            />
          </FormGroup>
        </Col>
        {/* Antecedentes de Trauma */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-skull-crossbones mr-1' />
          Antecedentes de Trauma<br />
          <small className='text-muted'>
            Separados por una coma (,)
          </small>
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='antecedentesTrauma'
              placeholder='Esquinces, Fracturas, Luxaciones, etc...'
              onChange={handleList}
              value={form.antecedentesTrauma.join(',')}
            />
          </FormGroup>
        </Col>
        {/* Medicamentos */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-pills mr-1' />
          Medicamentos actuales
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='medicamentos'
              placeholder='Medicamentos actuales...'
              onChange={handleChange}
              value={form.medicamentos}
            />
          </FormGroup>
        </Col>
        {/* Problemas por exposicion al sol */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-sun mr-1' />
          Problemas por exposición al sol
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='problemasExposicionSol'
              placeholder='Problemas por exposición al sol...'
              onChange={handleChange}
              value={form.problemasExposicionSol}
            />
          </FormGroup>
        </Col>
        {/* Régimen de alimentacion */}
        <Label tag='h4' sm='6' className='text-center'>
          <i className='fas fa-utensils mr-1' />
          Régimen especial de alimentación?
        </Label>
        <Col sm={6}>
          <FormGroup>
            <Input
              type='textarea'
              name='regimenAlimentacion'
              placeholder='Régimen especial de alimentación...'
              onChange={handleChange}
              value={form.regimenAlimentacion}
            />
          </FormGroup>
        </Col>
        {/* Usa gafas? */}
        <Label tag='h4' sm='3' className='text-center'>
          <i className='fas fa-glasses mr-1' />
          Usa gafas?
        </Label>
        <Col sm={3} className='text-center'>
          <CustomInput
            className='mt-2'
            type='switch'
            id='gafas'
            name='gafas'
            label={form.gafas ? 'Si' : 'No'}
            onChange={handleCheck}
            checked={form.gafas}
          />
        </Col>
        {/* Usa lentes? */}
        <Label tag='h4' sm='3' className='text-center'>
          <i className='fas fa-eye mr-1' />
          Usa lentes de contacto?
        </Label>
        <Col sm={3} className='text-center'>
          <CustomInput
            className='mt-2'
            type='switch'
            id='lentes'
            name='lentes'
            label={form.lentes ? 'Si' : 'No'}
            onChange={handleCheck}
            checked={form.lentes}
          />
        </Col>
      </Row>
    </>
  )
})


export default PasosSalud
