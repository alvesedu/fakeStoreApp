import React, { useState, useEffect } from "react";
//import './App.css';
import axios from "axios";

function Product() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0
  });

  // Este método é executado quando a página é carregada
  useEffect(() => {
    fetchData();
    //fetchData2();
  }, []);

  // Este método é usado para buscar os dados da API
  const fetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setData(response.data);
    //console.log(response.data);
  };

  /* function fetchData2() {
    setLoading(true);
    axios({
      method: 'GET',
      url: "https://fakestoreapi.com/products",
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) =>
        console.log(error)
      )
      .finally(() =>
        setLoading(false)
      )
  } */


  const handleAdd = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/products", {
        title: formData.name,
        description: formData.description,
        price: formData.price
      });
      setData([...data, response.data]);
      setFormData({
        name: "",
        description: "",
        price: 0
      });
      //console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Este método é usado para atualizar um produto existente
  const handleUpdate = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        {
          title: formData.name,
          description: formData.description,
          price: formData.price
        }
      );
      let updatedData = data.map(item => {
        if (item.id === id) {
          item = response.data;
        }
        return item;
      });
      setData(updatedData);
      //console.log("Aqui", updatedData);
    } catch (err) {
      console.error(err);
    }
  };

  /* console.log(data); */

  // Este método é usado para excluir um produto existente
  const handleDelete = async id => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      let deleteData = data.filter(item => item.id !== id);
      setData(deleteData);
    } catch (err) {
      console.error(err);
    }
  };

  // Este método é usado para exibir o formulário
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Este método é usado para ocultar o formulário
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Este método é usado para atualizar os dados do formulário
  const handleFormData = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="crud-component">
      {showForm ? (
        <form>
          <h2>Adicionar/Atualizar Produto</h2>
          <label>Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormData}
          />
          <label>Descrição</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleFormData}
          />
          <label>Preço</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleFormData}
          />
          <button onClick={handleAdd}>Adicionar</button>
          <button onClick={handleCloseForm}>Fechar</button>
        </form>
      ) : (
        <div>
          <h1>Produtos</h1>
          <button onClick={handleShowForm}>Adicionar Produto</button>
          <ul>
            {data.map(item => (
              <li key={item.id} >
                {/* {console.log(item.id)} */}
                <img src={item.image} alt={item.name} style={{ width: '150px' }} />
                <h3>{item.title}</h3>
                <p>Preço: R$ {item.price}</p>
                <p>{item.description}</p>
                <button onClick={e => handleUpdate(item.id, e)}>
                  Atualizar
                </button>
                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Product;
