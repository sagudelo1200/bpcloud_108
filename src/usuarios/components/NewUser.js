import React from 'react'
import ReactWizard from 'react-bootstrap-wizard'
import { Col } from 'reactstrap'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseApp'
import { toast } from 'react-toastify'

import { useAuth } from 'contexts/authContext'
import { updateProfile } from 'firebase/auth'

import PasosIntegrante from './forms/newUserSteps/PasosIntegrante'
import PasosScout from './forms/newUserSteps/PasosScout'
import PasosSalud from './forms/newUserSteps/PasosSalud'
import { Helmet } from 'react-helmet'

var steps = [
  {
    stepName: 'integrante',
    stepIcon: 'fas fa-user',
    component: PasosIntegrante,
  },
  { stepName: 'scout', stepIcon: 'fas fa-hiking', component: PasosScout },
  {
    stepName: 'salud',
    stepIcon: 'fas fa-notes-medical',
    component: PasosSalud,
  },
]

const { REACT_APP_TITLE } = process.env

function NewUser() {
  const { register, logout } = useAuth()

  const createUser = async (userData) => {
    // Acción para ocultar el alert de inicio de sesión cuando se registra un usuario
    localStorage.setItem('registering', true)

    const { email, documento, nombres, foto, unidad, dirigenteDe } = userData
    let id
    const unidades = [
      'familia',
      'manada',
      'scouts',
      'sociedad',
      'clan',
      'adultos',
    ]

    for (let i = 0; i < unidades.length; i++) {
      const _unidad = unidades[i]

      const path = `integrantes/${documento}`
      const _docRef = doc(db, path)
      // valida que el documento no exista en la base de datos
      const docSnap = await getDoc(_docRef)
      if (docSnap.exists()) {
        toast.error(`El documento ya existe en la base de datos de ${_unidad}`)
        localStorage.removeItem('registering')
        throw new Error(
          `El documento ya existe en la base de datos de ${_unidad}`
        )
      }
    }

    // Validar que el email no exista en la base de datos y crear cuenta
    try {
      const res = await register(email, documento)
      await updateProfile(res.user, {
        displayName: nombres,
        photoURL: foto,
      })
      id = res.user.uid
    } catch (error) {
      localStorage.removeItem('registering')
      if (error.code === 'auth/email-already-in-use') {
        toast.error('El correo electrónico ya está en uso.')
      } else if (error.code === 'auth/weak-password') {
        toast.error('El documento debe tener al menos 6 caracteres.')
      } else {
        toast.error(error.message)
      }
      throw error
    }

    try {
      // crea el documento de usuario de la app en la base de datos
      const docRef = doc(db, `integrantes/${documento}`)
      const userRef = doc(db, `usuarios/${id}`)
      let userAppData = {
        nombres: `${nombres}`,
        ref: docRef,
        unidad,
        role: unidad === 'adultos' ? 'admin' : 'usuario',
        roles: [unidad === 'adultos' ? 'admin' : 'usuario'],
      }
      if (unidad === 'adultos') {
        userAppData['dirigenteDe'] = dirigenteDe
      }

      await setDoc(userRef, userAppData)

      // Guardar los datos del integrante en la base de datos
      await setDoc(docRef, {
        ...userData,
        id_usuario: id,
      })

      localStorage.removeItem('registering')
      logout()
      return true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const finishButtonClick = async (data) => {
    const userData = { ...data.integrante, ...data.scout, ...data.salud }
    toast.promise(createUser(userData), {
      pending: 'Creando usuario...',
      success: 'Usuario creado correctamente',
      error: 'Error al crear el usuario',
    })
  }

  return (
    <>
      <Helmet>
        <title>Nuevo integrante | {REACT_APP_TITLE}</title>
      </Helmet>
      <div className='content'>
        <Col className='mx-auto' md={11}>
          <div>
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title='Nuevo integrante'
              headerTextCenter
              finishButtonClasses='btn-wd btn-info'
              finishButtonText='Guardar'
              nextButtonClasses='btn-wd btn-info'
              nextButtonText='Siguiente'
              previousButtonClasses='btn-wd'
              previousButtonText='Regresar'
              progressbar
              color='blue'
              finishButtonClick={finishButtonClick}
            />
          </div>
        </Col>
      </div>
    </>
  )
}

export default NewUser
