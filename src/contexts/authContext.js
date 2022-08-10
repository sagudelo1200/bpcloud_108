import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from 'firebaseApp'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: null,
  login: null,
  rememberLogin: null,
  logoutAndRememberUser: null,
  register: null,
  logout: null,
  forgotPassword: null,
  resetPassword: null,
  isAuthenticated: null,
  getUserData: null,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const [userData, setUserData] = useState({})

  // Valida si el usuario autenticado tiene permisos para acceder a la aplicación
  const checkRole = async (user) => {
    const userRef = doc(db, `users/${user.uid}`)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      console.error(`User ${user.uid} not found`)
      logout()
      throw new Error(`User ${user.uid} not found`)
    }

    const data = userDoc.data()
    if (data.role === 'superadmin') {
      toast.success('ADMINISTRADOR', {
        theme: "colored",
        icon: false,
        hideProgressBar: true,
        autoClose: 4420,
      })
      setCurrentUser(user)
      setUserData(data)
      console.log('ADMINISTRADOR')
    } else if (data.role === 'admin') {
      console.log(`User ${user.uid} is admin`)
      setCurrentUser(user)
      try {
        if (!data.ref) {
          console.log('User is not registered')
          logout()
          throw new Error('User is not registered')
        }
        const userInf = await getDoc(data.ref)
        if (userInf.exists()) {
          setUserData(userInf.data())
        } else {
          console.error(`User data ${user.uid} not found`)
          logout()
          throw new Error(`User data ${user.uid} not found`)
        }
      } catch (error) {
        console.error(error)
        logout()
        toast.error('Error al obtener los datos del usuario')
        throw new Error(error)
      }
    } else {
      console.error(`User ${user.uid} is not admin`)
      logout()
      throw new Error('El acceso se encuentra restringido')
    }
  }

  const loginToast = (user) => {
    return toast.promise(
      checkRole(user),
      {
        pending: 'Iniciando sesión...',
        success: 'Acceso autorizado',
        error: 'Acceso denegado',
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user && !localStorage.getItem('registering')) {
        loginToast(user)
      } else {
        setCurrentUser({})
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line
  }, [])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function rememberLogin(user) {
    const { email, displayName, photoURL } = user
    localStorage.setItem('user', JSON.stringify({ email, displayName, photoURL }))
  }

  function logoutAndRememberUser() {
    rememberLogin(currentUser)
    return signOut(auth)
  }


  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    localStorage.removeItem('user')
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  function isAuthenticated() {
    return !!currentUser.uid
  }

  function getUserData() {
    return userData
  }

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    rememberLogin,
    logoutAndRememberUser,
    register,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated,
    getUserData,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
