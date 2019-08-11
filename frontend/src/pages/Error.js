import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg'
import './Error.css'

export default function pages() {
  return (
    <div className="error-container">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <h1>Usuário não encontrado!</h1>
    </div>
  )
}
