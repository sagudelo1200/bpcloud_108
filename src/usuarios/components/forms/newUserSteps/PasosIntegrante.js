import React from 'react'
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
} from 'reactstrap'

import classnames from 'classnames'
import { toast } from 'react-toastify'

const PasosIntegrante = React.forwardRef((props, ref) => {
  const [form, setForm] = React.useState({
    estado: 'activo',
    documento: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    ciudadNacimiento: '',
    telefono: '',
    celular: '',
    foto: '',
    email: '',
    direccion: '',
    barrio: '',
    ciudad: '',
    padre: {
      nombre: '',
      telefono: '',
      celular: '',
      email: '',
      ocupacion: ''
    },
    madre: {
      nombre: '',
      telefono: '',
      celular: '',
      email: '',
      ocupacion: ''
    },
    acudiente: {
      nombre: '',
      telefono: '',
      celular: '',
      email: '',
      ocupacion: ''
    }
  })

  const [estadoDocumento, setEstadoDocumento] = React.useState(false)
  const [focoDocumento, setFocoDocumento] = React.useState(false)
  const [estadoNombre, setEstadoNombre] = React.useState(false)
  const [focoNombre, setFocoNombre] = React.useState(false)
  const [estadoApellidos, setEstadoApellidos] = React.useState(false)
  const [focoApellidos, setFocoApellidos] = React.useState(false)
  const [estadoEmail, setEstadoEmail] = React.useState(false)
  const [focoEmail, setFocoEmail] = React.useState(false)
  const [estadoFechaNacimiento, setEstadoFechaNacimiento] = React.useState(false)
  const [focoFechaNacimiento, setFocoFechaNacimiento] = React.useState(false)
  const [estadoCiudadNacimiento, setEstadoCiudadNacimiento] = React.useState(false)
  const [focoCiudadNacimiento, setFocoCiudadNacimiento] = React.useState(false)
  const [estadoTelefono, setEstadoTelefono] = React.useState(false)
  const [focoTelefono, setFocoTelefono] = React.useState(false)
  const [estadoCelular, setEstadoCelular] = React.useState(false)
  const [focoCelular, setFocoCelular] = React.useState(false)
  const [estadoFoto, setEstadoFoto] = React.useState(false)
  const [focoFoto, setFocoFoto] = React.useState(false)
  const [estadoDireccion, setEstadoDireccion] = React.useState(false)
  const [focoDireccion, setFocoDireccion] = React.useState(false)
  const [estadoBarrio, setEstadoBarrio] = React.useState(false)
  const [focoBarrio, setFocoBarrio] = React.useState(false)
  const [estadoCiudad, setEstadoCiudad] = React.useState(false)
  const [focoCiudad, setFocoCiudad] = React.useState(false)

  const [estadoNombrePadre, setEstadoNombrePadre] = React.useState(false)
  const [focoNombrePadre, setFocoNombrePadre] = React.useState(false)
  const [estadoCelularPadre, setEstadoCelularPadre] = React.useState(false)
  const [focoCelularPadre, setFocoCelularPadre] = React.useState(false)
  const [estadoTelefonoPadre, setEstadoTelefonoPadre] = React.useState(false)
  const [focoTelefonoPadre, setFocoTelefonoPadre] = React.useState(false)
  const [estadoEmailPadre, setEstadoEmailPadre] = React.useState(false)
  const [focoEmailPadre, setFocoEmailPadre] = React.useState(false)
  const [estadoOcupacionPadre, setEstadoOcupacionPadre] = React.useState(false)
  const [focoOcupacionPadre, setFocoOcupacionPadre] = React.useState(false)

  const [estadoNombreMadre, setEstadoNombreMadre] = React.useState(false)
  const [focoNombreMadre, setFocoNombreMadre] = React.useState(false)
  const [estadoCelularMadre, setEstadoCelularMadre] = React.useState(false)
  const [focoCelularMadre, setFocoCelularMadre] = React.useState(false)
  const [estadoTelefonoMadre, setEstadoTelefonoMadre] = React.useState(false)
  const [focoTelefonoMadre, setFocoTelefonoMadre] = React.useState(false)
  const [estadoEmailMadre, setEstadoEmailMadre] = React.useState(false)
  const [focoEmailMadre, setFocoEmailMadre] = React.useState(false)
  const [estadoOcupacionMadre, setEstadoOcupacionMadre] = React.useState(false)
  const [focoOcupacionMadre, setFocoOcupacionMadre] = React.useState(false)

  const [estadoNombreAcudiente, setEstadoNombreAcudiente] = React.useState(false)
  const [focoNombreAcudiente, setFocoNombreAcudiente] = React.useState(false)
  const [estadoCelularAcudiente, setEstadoCelularAcudiente] = React.useState(false)
  const [focoCelularAcudiente, setFocoCelularAcudiente] = React.useState(false)
  const [estadoTelefonoAcudiente, setEstadoTelefonoAcudiente] = React.useState(false)
  const [focoTelefonoAcudiente, setFocoTelefonoAcudiente] = React.useState(false)
  const [estadoEmailAcudiente, setEstadoEmailAcudiente] = React.useState(false)
  const [focoEmailAcudiente, setFocoEmailAcudiente] = React.useState(false)
  const [estadoOcupacionAcudiente, setEstadoOcupacionAcudiente] = React.useState(false)
  const [focoOcupacionAcudiente, setFocoOcupacionAcudiente] = React.useState(false)

  const funcionesEstado = {
    setEstadodocumento: setEstadoDocumento,
    setdocumento: (documento) => { setForm(prev => ({ ...prev, documento })) },
    setEstadonombre: setEstadoNombre,
    setnombre: (nombres) => { setForm(prev => ({ ...prev, nombres })) },
    setEstadoapellidos: setEstadoApellidos,
    setapellidos: (apellidos) => { setForm(prev => ({ ...prev, apellidos })) },
    setEstadoemail: setEstadoEmail,
    setemail: (email) => { setForm(prev => ({ ...prev, email })) },
    setEstadofechaNacimiento: setEstadoFechaNacimiento,
    setfechaNacimiento: (fechaNacimiento) => { setForm(prev => ({ ...prev, fechaNacimiento })) },
    setEstadociudadNacimiento: setEstadoCiudadNacimiento,
    setciudadNacimiento: (ciudadNacimiento) => { setForm(prev => ({ ...prev, ciudadNacimiento })) },
    setEstadotelefono: setEstadoTelefono,
    settelefono: (telefono) => { setForm(prev => ({ ...prev, telefono })) },
    setEstadocelular: setEstadoCelular,
    setcelular: (celular) => { setForm(prev => ({ ...prev, celular })) },
    setEstadofoto: setEstadoFoto,
    setfoto: (foto) => { setForm(prev => ({ ...prev, foto })) },
    setEstadodireccion: setEstadoDireccion,
    setdireccion: (direccion) => { setForm(prev => ({ ...prev, direccion: { ...prev.direccion, direccion } })) },
    setEstadobarrio: setEstadoBarrio,
    setbarrio: (barrio) => { setForm(prev => ({ ...prev, direccion: { ...prev.direccion, barrio } })) },
    setEstadociudad: setEstadoCiudad,
    setciudad: (ciudad) => { setForm(prev => ({ ...prev, direccion: { ...prev.direccion, ciudad } })) },
    setEstadonombrePadre: setEstadoNombrePadre,
    setnombrePadre: (value) => {
      setForm({ ...form, padre: { ...form.padre, nombre: value } })
    },
    setEstadocelularPadre: setEstadoCelularPadre,
    setcelularPadre: (value) => {
      setForm({ ...form, padre: { ...form.padre, celular: value } })
    },
    setEstadotelefonoPadre: setEstadoTelefonoPadre,
    settelefonoPadre: (value) => {
      setForm({ ...form, padre: { ...form.padre, telefono: value } })
    },
    setEstadoemailPadre: setEstadoEmailPadre,
    setemailPadre: (value) => {
      setForm({ ...form, padre: { ...form.padre, email: value } })
    },
    setEstadoocupacionPadre: setEstadoOcupacionPadre,
    setocupacionPadre: (value) => {
      setForm({ ...form, padre: { ...form.padre, ocupacion: value } })
    },
    setEstadonombreMadre: setEstadoNombreMadre,
    setnombreMadre: (value) => {
      setForm({ ...form, madre: { ...form.madre, nombre: value } })
    },
    setEstadocelularMadre: setEstadoCelularMadre,
    setcelularMadre: (value) => {
      setForm({ ...form, madre: { ...form.madre, celular: value } })
    },
    setEstadotelefonoMadre: setEstadoTelefonoMadre,
    settelefonoMadre: (value) => {
      setForm({ ...form, madre: { ...form.madre, telefono: value } })
    },
    setEstadoemailMadre: setEstadoEmailMadre,
    setemailMadre: (value) => {
      setForm({ ...form, madre: { ...form.madre, email: value } })
    },
    setEstadoocupacionMadre: setEstadoOcupacionMadre,
    setocupacionMadre: (value) => {
      setForm({ ...form, madre: { ...form.madre, ocupacion: value } })
    },
    setEstadonombreAcudiente: setEstadoNombreAcudiente,
    setnombreAcudiente: (value) => {
      setForm({ ...form, acudiente: { ...form.acudiente, nombre: value } })
    },
    setEstadocelularAcudiente: setEstadoCelularAcudiente,
    setcelularAcudiente: (value) => {
      setForm({ ...form, acudiente: { ...form.acudiente, celular: value } })
    },
    setEstadotelefonoAcudiente: setEstadoTelefonoAcudiente,
    settelefonoAcudiente: (value) => {
      setForm({ ...form, acudiente: { ...form.acudiente, telefono: value } })
    },
    setEstadoemailAcudiente: setEstadoEmailAcudiente,
    setemailAcudiente: (value) => {
      setForm({ ...form, acudiente: { ...form.acudiente, email: value } })
    },
    setEstadoocupacionAcudiente: setEstadoOcupacionAcudiente,
    setocupacionAcudiente: (value) => {
      setForm({ ...form, acudiente: { ...form.acudiente, ocupacion: value } })
    }
  }

  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true
    }
    return false
  }

  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    var numberRex = new RegExp('^[0-9]+$')
    if (numberRex.test(value)) {
      return true
    }
    return false
  }

  // function that verifies if value is a valid url
  const verifyUrl = (value) => {
    // eslint-disable-next-line
    var urlRex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    if (urlRex.test(value)) {
      return true
    }
    return false
  }

  const handleChange = (e, type = null, empty = false) => {
    let { name, value } = e.target

    switch (type) {
      case 'number':
        if (verifyNumber(value)) {
          funcionesEstado[`setEstado${name}`]('has-success')
        } else {
          funcionesEstado[`setEstado${name}`]('has-danger')
        }
        break
      case 'email':
        if (verifyEmail(value)) {
          funcionesEstado[`setEstado${name}`]('has-success')
        } else {
          funcionesEstado[`setEstado${name}`]('has-danger')
        }
        break
      case 'required':
        if (value.length > 0) {
          funcionesEstado[`setEstado${name}`]('has-success')
        } else {
          funcionesEstado[`setEstado${name}`]('has-danger')
        }
        break
      case 'url':
        if (verifyUrl(value)) {
          funcionesEstado[`setEstado${name}`]('has-success')
        } else {
          funcionesEstado[`setEstado${name}`]('has-danger')
        }
        break
      default:
        funcionesEstado[`setEstado${name}`]('has-success')
        funcionesEstado[`set${name}`](value)
        break
    }

    if (value === '' && empty) {
      funcionesEstado[`setEstado${name}`]('has-success')
      funcionesEstado[`set${name}`]('')
    }

    funcionesEstado[`set${name}`](value)
  }

  const isValidated = () => {
    if (
      estadoDocumento === 'has-success' &&
      estadoNombre === 'has-success' &&
      estadoEmail === 'has-success' &&
      (estadoFechaNacimiento === 'has-success' || form.fechaNacimiento === '') &&
      (estadoTelefono === 'has-success' || form.telefono === '') &&
      (estadoCelular === 'has-success' || form.celular === '') &&
      (estadoFoto === 'has-success' || form.foto === '')
    ) {
      return true
    } else {
      if (estadoDocumento !== 'has-success') {
        setEstadoDocumento('has-danger')
      }
      if (estadoNombre !== 'has-success') {
        setEstadoNombre('has-danger')
      }
      if (estadoEmail !== 'has-success') {
        setEstadoEmail('has-danger')
      }
      if (estadoFechaNacimiento !== 'has-success' && form.fechaNacimiento !== '') {
        setEstadoFechaNacimiento('has-danger')
      }
      if (estadoEmail !== 'has-success') {
        setEstadoEmail('has-danger')
      }
      if (estadoTelefono !== 'has-success' && form.telefono !== '') {
        setEstadoTelefono('has-danger')
      }
      if (estadoCelular !== 'has-success' && form.celular !== '') {
        setEstadoCelular('has-danger')
      }
      if (estadoFoto !== 'has-success' && form.foto !== '') {
        setEstadoFoto('has-danger')
      }
      toast.warning('Revise los campos resaltados')
      return false
    }
  }

  const [emailInfo, setEmailInfo] = React.useState(true)

  React.useImperativeHandle(ref, () => ({
    isValidated: () => isValidated(),
    state: form
  }))

  return (
    <>
      <h4 className='info-text'>
        Comencemos con los datos personales
      </h4>
      <Alert
        color='info'
        isOpen={emailInfo}
        toggle={() => setEmailInfo(!emailInfo)}
      >
        <span>
          <i className='fas fa-info-circle mr-1' />
          El correo debe ser único para cada integrante,
          ya que funciona como usuario de acceso al sistema.
        </span>
      </Alert>
      <Row className='justify-content-center'>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoEmail, {
              'input-group-focus': focoEmail,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-envelope' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              required
              type='email'
              name='email'
              placeholder='Correo...'
              onChange={(e) => { handleChange(e, 'email') }}
              value={form.email}
              onFocus={() => {
                setFocoEmail(true)
                setEmailInfo(true)
              }}
              onBlur={() => setFocoEmail(false)}
            />
            {estadoEmail === 'has-danger' && (
              <label className='error'>
                Ingrese un correo valido
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoDocumento, {
              'input-group-focus': focoDocumento,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-id-card-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              required
              type='number'
              min='0'
              name='documento'
              placeholder='Documento...'
              onChange={(e) => { handleChange(e, 'number') }}
              onFocus={() => setFocoDocumento(true)}
              onBlur={() => setFocoDocumento(false)}
              value={form.documento}
            />
            {estadoDocumento === 'has-danger' && (
              <label className='error'>
                Campo obligatorio
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoNombre, {
              'input-group-focus': focoNombre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-user' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              required
              type='text'
              name='nombres'
              placeholder='Nombres...'
              onChange={(e) => { handleChange(e, 'required') }}
              onFocus={() => setFocoNombre(true)}
              onBlur={() => setFocoNombre(false)}
              value={form.nombres}
            />
            {estadoNombre === 'has-danger' && (
              <label className='error'>
                Campo obligatorio
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoApellidos, {
              'input-group-focus': focoApellidos,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='tim-icons icon-caps-small' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='apellidos'
              placeholder='Apellidos...'
              onChange={(e) => { handleChange(e) }}
              onFocus={() => setFocoApellidos(true)}
              onBlur={() => setFocoApellidos(false)}
              value={form.apellidos}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoFechaNacimiento, {
              'input-group-focus': focoFechaNacimiento,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-birthday-cake' />
              </InputGroupText>
            </InputGroupAddon>

            <Input
              type='date'
              name='fechaNacimiento'
              onChange={(e) => { handleChange(e) }}
              onFocus={() => setFocoFechaNacimiento(true)}
              onBlur={() => setFocoFechaNacimiento(false)}
              value={form.fechaNacimiento}
            />
            {estadoFechaNacimiento === 'has-danger' && (
              <label className='date-error m-0 p-0'>
                Formato no valido
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoCiudadNacimiento, {
              'input-group-focus': focoCiudadNacimiento,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-hospital-user' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='ciudadNacimiento'
              placeholder='Ciudad de nacimiento...'
              onChange={(e) => { handleChange(e) }}
              value={form.ciudadNacimiento}
              onFocus={() => setFocoCiudadNacimiento(true)}
              onBlur={() => setFocoCiudadNacimiento(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoTelefono, {
              'input-group-focus': focoTelefono,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-phone-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='telefono'
              placeholder='Teléfono...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.telefono}
              onFocus={() => setFocoTelefono(true)}
              onBlur={() => setFocoTelefono(false)}
            />
            {estadoTelefono === 'has-danger' && (
              <label className='error'>
                Número no valido
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoCelular, {
              'input-group-focus': focoCelular,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-mobile-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='celular'
              placeholder='Celular...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.celular}
              onFocus={() => setFocoCelular(true)}
              onBlur={() => setFocoCelular(false)}
            />
            {estadoCelular === 'has-danger' && (
              <label className='error'>
                Número no valido
              </label>
            )}
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoDireccion, {
              'input-group-focus': focoDireccion,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-map-marked-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='direccion'
              placeholder='Direccion...'
              onChange={(e) => { handleChange(e) }}
              value={form.direccion?.direccion}
              onFocus={() => setFocoDireccion(true)}
              onBlur={() => setFocoDireccion(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoBarrio, {
              'input-group-focus': focoBarrio,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-house-user' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='barrio'
              placeholder='Barrio...'
              onChange={(e) => { handleChange(e) }}
              value={form.direccion?.barrio}
              onFocus={() => setFocoBarrio(true)}
              onBlur={() => setFocoBarrio(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoCiudad, {
              'input-group-focus': focoCiudad,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-city' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='ciudad'
              placeholder='Ciudad...'
              onChange={(e) => { handleChange(e) }}
              value={form.direccion?.ciudad}
              onFocus={() => setFocoCiudad(true)}
              onBlur={() => setFocoCiudad(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoFoto, {
              'input-group-focus': focoFoto,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-image' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='foto'
              placeholder='Foto URL...'
              onChange={(e) => { handleChange(e, 'url', true) }}
              value={form.foto}
              onFocus={() => setFocoFoto(true)}
              onBlur={() => setFocoFoto(false)}
            />
            {estadoFoto === 'has-danger' && (
              <label className='error'>
                URL no valida
              </label>
            )}
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <h4 className='info-text'>
        Datos del padre
      </h4>
      <Row className='justify-content-center'>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoNombrePadre, {
              'input-group-focus': focoNombrePadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-male' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='nombrePadre'
              placeholder='Nombre completo...'
              onChange={(e) => { handleChange(e) }}
              value={form.padre.nombre}
              onFocus={() => setFocoNombrePadre(true)}
              onBlur={() => setFocoNombrePadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoCelularPadre, {
              'input-group-focus': focoCelularPadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-mobile-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='celularPadre'
              placeholder='Celular...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.padre.celular}
              onFocus={() => setFocoCelularPadre(true)}
              onBlur={() => setFocoCelularPadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoTelefonoPadre, {
              'input-group-focus': focoTelefonoPadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-phone-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='telefonoPadre'
              placeholder='Teléfono...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.padre.telefono}
              onFocus={() => setFocoTelefonoPadre(true)}
              onBlur={() => setFocoTelefonoPadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoEmailPadre, {
              'input-group-focus': focoEmailPadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-envelope' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='email'
              name='emailPadre'
              placeholder='Email...'
              onChange={(e) => { handleChange(e, 'email') }}
              value={form.padre.email}
              onFocus={() => setFocoEmailPadre(true)}
              onBlur={() => setFocoEmailPadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoOcupacionPadre, {
              'input-group-focus': focoOcupacionPadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-user-astronaut' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='ocupacionPadre'
              placeholder='Ocupación...'
              onChange={(e) => { handleChange(e) }}
              value={form.padre.ocupacion}
              onFocus={() => setFocoOcupacionPadre(true)}
              onBlur={() => setFocoOcupacionPadre(false)}
            />
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <h4 className='info-text'>
        Datos de la madre
      </h4>
      <Row className='justify-content-center'>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoNombreMadre, {
              'input-group-focus': focoNombreMadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-female' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='nombreMadre'
              placeholder='Nombre completo...'
              onChange={(e) => { handleChange(e) }}
              value={form.madre.nombre}
              onFocus={() => setFocoNombreMadre(true)}
              onBlur={() => setFocoNombreMadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoCelularMadre, {
              'input-group-focus': focoCelularMadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-mobile-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='celularMadre'
              placeholder='Celular...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.madre.celular}
              onFocus={() => setFocoCelularMadre(true)}
              onBlur={() => setFocoCelularMadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoTelefonoMadre, {
              'input-group-focus': focoTelefonoMadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-phone-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='telefonoMadre'
              placeholder='Teléfono...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.madre.telefono}
              onFocus={() => setFocoTelefonoMadre(true)}
              onBlur={() => setFocoTelefonoMadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoEmailMadre, {
              'input-group-focus': focoEmailMadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-envelope' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='email'
              name='emailMadre'
              placeholder='Email...'
              onChange={(e) => { handleChange(e, 'email') }}
              value={form.madre.email}
              onFocus={() => setFocoEmailMadre(true)}
              onBlur={() => setFocoEmailMadre(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoOcupacionMadre, {
              'input-group-focus': focoOcupacionMadre,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-user-nurse' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='ocupacionMadre'
              placeholder='Ocupación...'
              onChange={(e) => { handleChange(e) }}
              value={form.madre.ocupacion}
              onFocus={() => setFocoOcupacionMadre(true)}
              onBlur={() => setFocoOcupacionMadre(false)}
            />
          </InputGroup>
        </Col>
      </Row>
      <hr />
      <h4 className='info-text'>
        Datos del Acudiente
      </h4>
      <Row className='justify-content-center'>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoNombreAcudiente, {
              'input-group-focus': focoNombreAcudiente,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-female' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='nombreAcudiente'
              placeholder='Nombre completo...'
              onChange={(e) => { handleChange(e) }}
              value={form.acudiente.nombre}
              onFocus={() => setFocoNombreAcudiente(true)}
              onBlur={() => setFocoNombreAcudiente(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoCelularAcudiente, {
              'input-group-focus': focoCelularAcudiente,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-mobile-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='celularAcudiente'
              placeholder='Celular...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.acudiente.celular}
              onFocus={() => setFocoCelularAcudiente(true)}
              onBlur={() => setFocoCelularAcudiente(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoTelefonoAcudiente, {
              'input-group-focus': focoTelefonoAcudiente,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-phone-alt' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='number'
              min={0}
              name='telefonoAcudiente'
              placeholder='Teléfono...'
              onChange={(e) => { handleChange(e, 'number', true) }}
              value={form.acudiente.telefono}
              onFocus={() => setFocoTelefonoAcudiente(true)}
              onBlur={() => setFocoTelefonoAcudiente(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoEmailAcudiente, {
              'input-group-focus': focoEmailAcudiente,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-envelope' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='email'
              name='emailAcudiente'
              placeholder='Email...'
              onChange={(e) => { handleChange(e, 'email') }}
              value={form.acudiente.email}
              onFocus={() => setFocoEmailAcudiente(true)}
              onBlur={() => setFocoEmailAcudiente(false)}
            />
          </InputGroup>
        </Col>
        <Col sm={6} md={4} lg={3}>
          <InputGroup
            className={classnames(estadoOcupacionAcudiente, {
              'input-group-focus': focoOcupacionAcudiente,
            })}
          >
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <i className='fas fa-user-pen' />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type='text'
              name='ocupacionAcudiente'
              placeholder='Ocupación...'
              onChange={(e) => { handleChange(e) }}
              value={form.acudiente.ocupacion}
              onFocus={() => setFocoOcupacionAcudiente(true)}
              onBlur={() => setFocoOcupacionAcudiente(false)}
            />
          </InputGroup>
        </Col>
      </Row>
    </>
  )
})

export default PasosIntegrante