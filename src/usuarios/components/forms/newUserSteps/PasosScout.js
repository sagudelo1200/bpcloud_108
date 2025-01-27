import React from 'react'
import {
  Col,
  CustomInput,
  Input,
  InputGroup,
  Row,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'
import Select from 'react-select'
import classnames from 'classnames'
import { toast } from 'react-toastify'

const PasosScout = React.forwardRef((props, ref) => {
  const [form, setForm] = React.useState({
    unidad: '',
    ingreso: '',
    inscripcion: '',
  })
  const [esDirigente, setEsDirigenteDe] = React.useState(false)

  const [estadoUnidad, setEstadoUnidad] = React.useState(false)
  const [estadoDirigenteDe, setEstadoDirigenteDe] = React.useState(false)
  const [focoDirigenteDe, setFocoDirigenteDe] = React.useState(false)
  const [focoUnidad, setFocoUnidad] = React.useState(false)
  const [estadoIngreso, setEstadoIngreso] = React.useState(false)
  const [focoIngreso, setFocoIngreso] = React.useState(false)

  const funcionesEstado = {
    setEstadoingreso: setEstadoIngreso,
    setingreso: (v) => setForm({ ...form, ingreso: v }),
    setinscripcion: (v) => setForm({ ...form, inscripcion: v }),
    setEstadounidad: setEstadoUnidad,
    setunidad: (v) => setForm({ ...form, unidad: v }),
    setdirigenteDe: (v) => setForm({ ...form, dirigenteDe: v }),
    setEstadodirigenteDe: setEstadoDirigenteDe,
  }

  const handleChangeUnidad = (e) => {
    if (e.value === '') {
      funcionesEstado['setEstadounidad']('has-danger')
      funcionesEstado['setunidad']('')
    } else {
      funcionesEstado['setEstadounidad']('has-success')
      funcionesEstado['setunidad'](e.value)
    }

    setEsDirigenteDe(e.value === 'adultos')
  }

  const handleChangeDirigenteDe = (e) => {
    funcionesEstado['setdirigenteDe'](e.value)
    if (e.value === '') {
      funcionesEstado['setEstadodirigenteDe']('has-danger')
    } else {
      funcionesEstado['setEstadodirigenteDe']('has-success')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    funcionesEstado[`set${name}`](value)
  }

  const handleCheck = (e) => {
    const { name, checked } = e.target
    setForm({ ...form, [name]: checked })
  }

  const isValidated = () => {
    /* si la unidad es adultos, estadoDirigenteDe debe ser has-success */
    if (form.unidad === 'adultos') {
      if (form.dirigenteDe === '') {
        setEstadoDirigenteDe('has-danger')
        return false
      } else {
        funcionesEstado['setEstadodirigenteDe']('has-success')
      }
    }
    if (estadoUnidad === 'has-success') return true
    else setEstadoUnidad('has-danger')
    toast.warning('Revise los campos resaltados')
    return false
  }

  React.useImperativeHandle(ref, () => ({
    isValidated: () => isValidated(),
    state: form,
  }))

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <h4 className='info-text'>Ingrese los datos Scout del integrante</h4>
      <Row className='justify-content-center'>
        <Col sm={6} md={4} lg={3}>
          <label>Unidad Scout</label>
          <InputGroup
            className={classnames(estadoUnidad, {
              'input-group-focus': focoUnidad,
            })}
          >
            <Select
              required
              className='react-select'
              classNamePrefix='react-select'
              name='unidad'
              onChange={handleChangeUnidad}
              onFocus={() => setFocoUnidad(true)}
              onBlur={() => setFocoUnidad(false)}
              options={[
                { label: 'Seleccione la unidad', isDisabled: true },
                { name: 'unidad', value: 'adultos', label: 'Adultos' },
                { name: 'unidad', value: 'familia', label: 'Familia' },
                { name: 'unidad', value: 'manada', label: 'Manada' },
                { name: 'unidad', value: 'scouts', label: 'Scouts' },
                { name: 'unidad', value: 'sociedad', label: 'Sociedad' },
                { name: 'unidad', value: 'clan', label: 'Clan' },
              ]}
              placeholder='Unidad...'
            />
            {estadoUnidad === 'has-danger' && (
              <label className='error'>Campo obligatorio</label>
            )}
          </InputGroup>
        </Col>
        <Col
          sm={6}
          md={4}
          lg={3}
          className={classnames({
            'd-none': !esDirigente,
          })}
        >
          <label>Unidad de voluntariado</label>
          <InputGroup
            className={classnames(estadoDirigenteDe, {
              'input-group-focus': focoDirigenteDe,
            })}
          >
            <Select
              required
              className='react-select'
              classNamePrefix='react-select'
              name='dirigenteDe'
              onChange={handleChangeDirigenteDe}
              onFocus={() => setFocoDirigenteDe(true)}
              onBlur={() => setFocoDirigenteDe(false)}
              options={[
                { label: 'Seleccione la unidad', isDisabled: true },
                { name: 'dirigenteDe', value: 'adultos', label: 'Consejo' },
                { name: 'dirigenteDe', value: 'familia', label: 'Familia' },
                { name: 'dirigenteDe', value: 'manada', label: 'Manada' },
                { name: 'dirigenteDe', value: 'scouts', label: 'Scouts' },
                { name: 'dirigenteDe', value: 'sociedad', label: 'Sociedad' },
                { name: 'dirigenteDe', value: 'clan', label: 'Clan' },
              ]}
              placeholder='Unidad de voluntariado...'
            />
            {estadoUnidad === 'has-danger' && (
              <label className='error'>Campo obligatorio</label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <label>Fecha de ingreso</label>
          <InputGroup
            className={classnames(estadoIngreso, {
              'input-group-focus': focoIngreso,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-calendar' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='date'
              name='ingreso'
              onChange={handleChange}
              onFocus={() => setFocoIngreso(true)}
              onBlur={() => setFocoIngreso(false)}
              value={form.ingreso}
            />
            {estadoIngreso === 'has-danger' && (
              <label className='date-error m-0 p-0'>Formato no valido</label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <label>CSA</label>
          <CustomInput
            type='switch'
            id='inscripcion'
            name='inscripcion'
            label={`Inscripción ${new Date().getFullYear()} ${
              form.inscripcion ? '✔' : '✘'
            }`}
            className={'mt-2'}
            onChange={handleCheck}
          />
        </Col>
      </Row>
    </>
  )
})

export default PasosScout
