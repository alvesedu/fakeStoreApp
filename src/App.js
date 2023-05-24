import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Header from "./componets/Header";
import Product from "./componets/Product";
import Footer from "./componets/Footer";
import Login from "./componets/Login";

function App() {

  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

  return (
    <div className="App">
      <Header setToken={setToken} />
      {token ? <Product /> : <Login token={token} setToken={setToken} />}

      <Footer />
    </div>
  );
}

export default App;
