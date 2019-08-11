import React, { useState } from 'react'
import './Login.css'
import api from '../services/api'
import logo from '../assets/logo.svg'

export default function Login({ history }) {
  const [username, setUsername] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await api.post('/devs', {
        username
      })

      if (response.status === 400) {
        console.log('erro')
      }

      const { _id } = response.data

      history.push(`/dev/${_id}`)
    } catch (err) {
      console.log(err)
      history.push('/error')
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário no github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}
