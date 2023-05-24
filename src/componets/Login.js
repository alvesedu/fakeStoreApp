import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ token, setToken }) {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const loginHandler = () => {
    setError("")
    setUser("")
    setPassword("")
    axios({
      url: 'https://fakestoreapi.com/auth/login',
      method: 'POST',
      data: {
        username: user,
        password: password,
      }
    })
      .then(res => {
        console.log(res.data.token);
        setToken(res.data.token);
        localStorage.setItem("userToken", res.data.token);
      })
      .catch(err => {
        setError(err.response.data);
        console.log(err.response.data);
      })
  }


  return (
    <div className="login">
      <div className="login-form">
        <input
          placeholder="Digite o usuário"
          type="text"
          value={user}
          onChange={e => setUser(e.target.value)}
        />

        <div className="password-input-container">
          <input
            placeholder="Digite a senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="password-input"
          />
          <button className="password-toggle-icon" type="button" onClick={handlePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <small>{error}</small>}
        <button onClick={loginHandler}>Entrar</button>
      </div>

    </div>

  )
}

export default Login