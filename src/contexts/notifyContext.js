import React, { createContext, useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import ReactBSAlert from 'react-bootstrap-sweetalert'

const NotifyContext = createContext({
  successAlert: null,
  warningWithConfirmAlert: null,
  basicAlert: null,
})

export const useNotify = () => useContext(NotifyContext)

export default function NotifyContextProvider({ children }) {
  const [alert, setAlert] = React.useState(null)

  const hideAlert = () => {
    setAlert(null)
  }

  const basicAlert = ({ message }) => {
    setAlert(
      <ReactBSAlert
        style={{ display: 'block', marginTop: '-100px' }}
        title={message}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle='success'
        btnSize=''
      />
    )
  }

  const successAlert = ({ title, message }) => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title={title || 'Éxito'}
        onConfirm={() => hideAlert(true)}
        onCancel={() => hideAlert(true)}
        confirmBtnBsStyle='success'
        btnSize=''
      >
        {message}
      </ReactBSAlert>
    )
  }
  const warningWithConfirmAlert = ({ onConfirm, title, confirmBtnText, message }) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title={title || '¿Estás seguro?'}
        onConfirm={() => onConfirm()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle='success'
        cancelBtnBsStyle='danger'
        confirmBtnText={confirmBtnText || 'Confirmar'}
        cancelBtnText='Cancelar'
        showCancel
        btnSize=''
      >
        {message}
      </ReactBSAlert>
    )
  }

  const value = {
    successAlert,
    warningWithConfirmAlert,
    basicAlert,
  }

  // Stop the warning of calling setState of unmounted component
  useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0)
      while (id--) {
        window.clearTimeout(id)
      }
    }
  })

  return <NotifyContext.Provider value={value}>
    <ToastContainer position='bottom-right' />
    {alert}
    {children}
  </NotifyContext.Provider>
}
