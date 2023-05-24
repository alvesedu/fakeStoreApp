import React from 'react'
import './Header.css'

function Header({ setToken }) {

  const logoutHandler = () => {
    setToken("")
    localStorage.clear()
  }

  return (
    <div className="header">
      <a href="#default" className="logo">fakeStore</a>
      <div className="header-right">
        <a className="active" href="#home">Home</a>
        <a href="#contact">Produtos</a>
        <a href="#about">Sobre</a>
        <button onClick={logoutHandler}>Sair</button>
      </div>
    </div>

  )
}

export default Header