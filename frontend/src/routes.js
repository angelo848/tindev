import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login'
import Main from './pages/Main'
import Error from './pages/Error'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/error" exact component={Error} />
      <Route path="/dev/:id" exact component={Main} />
    </BrowserRouter>
  )
}
