import React, { useState } from "react";

function Formulario({ datosConsulta }) {
  //estate del componente
  //busqueda es igual al state,guardarBuqueda =this.setSate({})
  //siempre hacer una copia
  const [busqueda, guardarBuqueda] = useState({
    ciudad: "",
    pais: ""
  });

  const handleChange = e => {
    //cambiar el state
    guardarBuqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };
  const consultarClima = e => {
    e.preventDefault();
    //pasar hacia el componente principal la busqueda del usuario
    datosConsulta(busqueda);
  };
  return (
    <form onSubmit={consultarClima}>
      <div className="input-field col s12">
        <input type="text" name="ciudad" id="ciudad" onChange={handleChange} />
        <label htmlFor="ciudad">Ciudad:</label>
        <div className="input-field col s12">
          <select onChange={handleChange} name="pais">
            <option value="">Selecciona tu pais</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">Mexico</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="CR">Costa Rica</option>
            <option value="ES">España</option>
            <option value="PE">Peru</option>
          </select>
        </div>
        <div className="input-field col s12">
          <input
            className="waves-effect waves-light btn-large btn-block yellow accent-4"
            value="Buscar clima"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
export default Formulario;
