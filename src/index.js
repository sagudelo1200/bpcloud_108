import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import AuthContextProvider from 'contexts/authContext'
import NotifyContextProvider from 'contexts/notifyContext'

import AdminLayout from 'layouts/Admin'
import DocsLayout from 'layouts/Docs'
import AuthLayout from 'layouts/Auth'

import 'assets/css/nucleo-icons.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'assets/scss/black-dashboard-pro-react.scss?v=1.2.0'
import 'assets/css/demo.css'

import 'firebaseApp'

ReactDOM.render(
  <NotifyContextProvider>
    <AuthContextProvider>
      <Router basename='/bpcloud_108'>
        <Switch>
          <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
          <Route path='/docs' render={(props) => <DocsLayout {...props} />} />
          <Route path='/auth' render={(props) => <AuthLayout {...props} />} />
          {localStorage.getItem('usuario') ? (
            <Redirect from='*' to='/auth/bloqueo' />
          ) : (
            <Redirect from='*' to='/auth/ingresar' />
          )}
        </Switch>
      </Router>
    </AuthContextProvider>
  </NotifyContextProvider>,
  document.getElementById('reactRoot')
)
