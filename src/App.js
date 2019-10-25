import React, { useState, useEffect } from "react";
import Header from "./components/Header.js";
import Formulario from "./components/Formulario.js";
import Error from "./components/Error.js";
import Clima from './components/Clima.js';

function App() {
  //State principal
  const [ciudad, guardarCiudad] = useState("");
  const [pais, guardarPais] = useState("");
  const [error, guardarError] = useState(false);
  const[resultado,guardarResultado]=useState({})
  useEffect(() => {
    //prevenir ejecucion
    if (ciudad === "") return;

    const consultarApi = async () => {
      const appId = "your api key here";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

      //consultar

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado)
    };
    consultarApi();
  }, [ciudad, pais]);

  const datosConsulta = datos => {
    //Validar que ambos campos esten
    if (datos.ciudad === "" || datos.pais === "") {
      //un error
      guardarError(true);
      return;
    }
    //Si ambos existe agregarlos al state

    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  };
  //Cargar un componente condicinalmente

  let componente;
  if (error) {
    componente = <Error mensaje="Ambos campos son obligatorios" />;
  } else if(resultado.cod === "404"){

    componente=<Error mensaje="La ciudad no existe en nuestro registro"/>
  } 
  
  else {
    componente = <Clima
                    resultado={resultado}
                      />;
    //Mostrar el clima
  }

  return (
    <div className="App">
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>
            <div className="col s12 m6">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
