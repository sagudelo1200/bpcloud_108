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
    inscripcion: ''
  })
  const [esJefe, setEsJefe] = React.useState(false)

  const [estadoUnidad, setEstadoUnidad] = React.useState(false)
  const [estadoJefeDe, setEstadoJefeDe] = React.useState(false)
  const [focoJefeDe, setFocoJefeDe] = React.useState(false)
  const [focoUnidad, setFocoUnidad] = React.useState(false)
  const [estadoIngreso, setEstadoIngreso] = React.useState(false)
  const [focoIngreso, setFocoIngreso] = React.useState(false)
  
  const funcionesEstado = {
    setEstadoingreso: setEstadoIngreso,
    setingreso: (v) => setForm({ ...form, ingreso: v }),
    setinscripcion: (v) => setForm({ ...form, inscripcion: v }),
    setEstadounidad: setEstadoUnidad,
    setunidad: (v) => setForm({ ...form, unidad: v }),
    setjefeDe: (v) => setForm({ ...form, jefeDe: v }),
    setEstadojefeDe: setEstadoJefeDe,
  }



  const handleChangeUnidad = (e) => {
    if (e.value === '') {
      funcionesEstado['setEstadounidad']('has-danger')
      funcionesEstado['setunidad']('')
    } else {
      funcionesEstado['setEstadounidad']('has-success')
      funcionesEstado['setunidad'](e.value)
    }

    setEsJefe(e.value === 'jefatura')
  }

  const handleChangeJefeDe = (e) => {
    funcionesEstado['setjefeDe'](e.value)
    if (e.value === '') {
      funcionesEstado['setEstadojefeDe']('has-danger')
    } else {
      funcionesEstado['setEstadojefeDe']('has-success')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    funcionesEstado[`set${name}`](value)
  }

  const handleCheck = e => {
    const { name, checked } = e.target
    setForm({ ...form, [name]: checked })
  }

  const isValidated = () => {
    /* si la unidad es jefatura, estadoJefeDe debe ser has-success */
    if (form.unidad === 'jefatura') {
      if (form.jefeDe === '') {
        setEstadoJefeDe('has-danger')
        return false
      } else {
        funcionesEstado['setEstadojefeDe']('has-success')
      }
    }
    if (estadoUnidad === 'has-success') return true
    else setEstadoUnidad('has-danger')
    toast.warning('Revise los campos resaltados')
    return false
  }

  React.useImperativeHandle(ref, () => ({
    isValidated: () => isValidated(),
    state: form
  }))

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <h4 className='info-text'>
        Ingrese los datos Scout del integrante
      </h4>
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
                { name: 'unidad', value: 'familia', label: 'Familia' },
                { name: 'unidad', value: 'manada', label: 'Manada' },
                { name: 'unidad', value: 'tropa', label: 'Tropa' },
                { name: 'unidad', value: 'sociedad', label: 'Sociedad' },
                { name: 'unidad', value: 'clan', label: 'Clan' },
                { name: 'unidad', value: 'jefatura', label: 'Jefatura' },
                { name: 'unidad', value: 'consejo', label: 'Consejo' },
              ]}
              placeholder='Unidad...'
            />
            {estadoUnidad === 'has-danger' && (
              <label className='error'>
                Campo obligatorio
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}
          className={classnames({
            'd-none': !esJefe,
          })}
        >
          <label>Jefatura de</label>
          <InputGroup
            className={classnames(estadoJefeDe, {
              'input-group-focus': focoJefeDe,
            })}
          >
            <Select
              required
              className='react-select'
              classNamePrefix='react-select'
              name='jefeDe'
              onChange={handleChangeJefeDe}
              onFocus={() => setFocoJefeDe(true)}
              onBlur={() => setFocoJefeDe(false)}
              options={[
                { label: 'Seleccione la unidad', isDisabled: true },
                { name: 'jefeDe', value: 'familia', label: 'Familia' },
                { name: 'jefeDe', value: 'manada', label: 'Manada' },
                { name: 'jefeDe', value: 'tropa', label: 'Tropa' },
                { name: 'jefeDe', value: 'sociedad', label: 'Sociedad' },
                { name: 'jefeDe', value: 'clan', label: 'Clan' },
              ]}
              placeholder='Jefe de...'
            />
            {estadoUnidad === 'has-danger' && (
              <label className='error'>
                Campo obligatorio
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <label>
            Fecha de ingreso
          </label>
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
              <label className='date-error m-0 p-0'>
                Formato no valido
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <label>CSA</label>
          <CustomInput
            type='switch'
            id='inscripcion'
            name='inscripcion'
            label={`Inscripción ${new Date().getFullYear()} ${form.inscripcion ? '✔' : '✘'}`}
            className={'mt-2'}
            onChange={handleCheck}
          />
        </Col>
      </Row>
    </>
  )
})


export default PasosScout
