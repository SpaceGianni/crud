import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState(""); //Hook que controla el mensaje en caso de campo vacío
  const [data, setData] = useState(""); //guarda el valor del textarea
  const [data2, setData2] = useState([]); //guarda el valor que irá en elpárrafo cuando se aprete "enviar"
  const [posts, setPosts] = useState([]);
  const [sendPost, setSendPost] = useState([]);
  let value = ""; //variable que guarda momentáneamente el valor del textarea
 ;//variable que guarda momentaneame la lista de mensajes enviados

  //RECOJO Y GUARDO EL VALOR DEL TEXTAREA
  const formValidation = (e) => {
    value = e.target.value;
    setData(value); //guardo el valor en data
    //console.log(value)
  }

  //Función que controla el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      setMessage("Debes ingresar texto en este campo");
      //console.log(message)
    } else { //si hay algo escrito en el text area
      setMessage("Muy bien");
    }
  };

  //Función activada al presionar el botón ENVIAR
  const sendMessages = (e) => {
    e.preventDefault()
    setData2(data2 => data2.concat(data))
  }
  
  

  //FUNCION DE CONEXION CON LA API
  const bringMessages = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3')
      .then((response) => response.json())
      .then((json) =>
        setPosts(json),
        console.log("los posts traidos de la API", posts));
  }

  return (
    <div className="App">
      <h1>Aplicación de mensajes</h1>
      <div className='container'>

        <div className='left'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="post">Escribe tu mensaje aquí</label>
            <br></br>
            <textarea name="post" id="input" cols="30" rows={5} onChange={(e) => formValidation(e)}></textarea>
            <br></br>
            <div id="img">{message}</div>
            <button type="submit" onClick={(e) => sendMessages(e)}>Enviar</button>
          </form>

          <button type="submit" onClick={(e) => bringMessages(e)}>Traer mensajes</button>
        </div>

        <div className='right'>
          <h3>Aquí están los mensajes que trajiste:</h3>
          <div id="post">
            <div>
              {!!posts && posts.length > 0 ?
                posts.map((post) => {
                  return <p key={post.id}>{post.body}</p>
                })
                : ""
              }
            </div>

            <div >
              <h3>Aquí está tus mensajes:</h3>
              {!!data2 && data2.length > 0 ?
                data2.map((item, index) => {
                  return <> <p key={index}>{item}</p>
                    <span className="options">
                      <i className="fas fa-edit"></i>
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </>
                })
                : ""}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
