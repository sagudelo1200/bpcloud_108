import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const {
    REACT_APP_APIKEY,
    REACT_APP_APPID,
    REACT_APP_AUTHDOMAIN,
    REACT_APP_MEASUREMENTID,
    REACT_APP_MESSAGINGSENDERID,
    REACT_APP_PROJECTID,
    REACT_APP_STORAGEBUCKET
} = process.env

const firebaseConfig = {
    apiKey: REACT_APP_APIKEY,
    authDomain: REACT_APP_AUTHDOMAIN,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGEBUCKET,
    messagingSenderId: REACT_APP_MESSAGINGSENDERID,
    appId: REACT_APP_APPID,
    measurementId: REACT_APP_MEASUREMENTID
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

// limpiar el storage para que se muestre la notificación de inicio de sesión en caso de ser necesario
localStorage.removeItem('registering')

export { db, auth }
