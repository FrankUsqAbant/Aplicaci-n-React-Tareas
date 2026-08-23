import React, { useState } from "react";
import "../holas-de-estilo/TareaFormulario.css";
import { v4 as uuidv4 } from "uuid";
import { FiPlus, FiTag, FiZap, FiFeather } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";

function TareaFormulario({ onSubmit }) {
  const [texto, setTexto] = useState("");
  const [prioridad, setPrioridad] = useState("media"); // alta, media, baja
  const [categoria, setCategoria] = useState("Trabajo");

  const manejarEnvio = (e) => {
    e.preventDefault();
    const textoLimpio = texto.trim().slice(0, 150);
    if (!textoLimpio) return;

    const prioridadesPermitidas = ["alta", "media", "baja"];
    const prioridadSegura = prioridadesPermitidas.includes(prioridad) ? prioridad : "media";

    const categoriasPermitidas = ["Trabajo", "Personal", "Estudio", "Proyecto", "Hogar"];
    const categoriaSegura = categoriasPermitidas.includes(categoria) ? categoria : "Trabajo";

    const tareaNueva = {
      id: uuidv4(),
      texto: textoLimpio,
      completada: false,
      prioridad: prioridadSegura,
      categoria: categoriaSegura,
      creadaEn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onSubmit(tareaNueva);
    setTexto("");
  };

  return (
    <form className="formulario-contenedor" onSubmit={manejarEnvio}>
      <div className="formulario-input-fila">
        <input
          className="formulario-input"
          type="text"
          placeholder="¿Qué tarea tienes pendiente hoy?"
          value={texto}
          maxLength={150}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit" className="formulario-boton-agregar" disabled={!texto.trim()}>
          <FiPlus size={18} />
          <span>Agregar</span>
        </button>
      </div>

      <div className="formulario-opciones-fila">
        <div className="opciones-grupo">
          <span className="opciones-label">Prioridad:</span>
          <div className="prioridades-selector">
            <button
              type="button"
              className={`prioridad-btn alta ${prioridad === "alta" ? "activa" : ""}`}
              onClick={() => setPrioridad("alta")}
            >
              <AiOutlineFire size={14} />
              <span>Alta</span>
            </button>
            <button
              type="button"
              className={`prioridad-btn media ${prioridad === "media" ? "activa" : ""}`}
              onClick={() => setPrioridad("media")}
            >
              <FiZap size={14} />
              <span>Media</span>
            </button>
            <button
              type="button"
              className={`prioridad-btn baja ${prioridad === "baja" ? "activa" : ""}`}
              onClick={() => setPrioridad("baja")}
            >
              <FiFeather size={14} />
              <span>Baja</span>
            </button>
          </div>
        </div>

        <div className="opciones-grupo">
          <span className="opciones-label">
            <FiTag size={13} />
            <span>Categoría:</span>
          </span>
          <select
            className="categoria-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Trabajo">💼 Trabajo</option>
            <option value="Personal">🧘 Personal</option>
            <option value="Estudio">📚 Estudio</option>
            <option value="Proyecto">🚀 Proyecto</option>
            <option value="Hogar">🏠 Hogar</option>
          </select>
        </div>
      </div>
    </form>
  );
}

export default TareaFormulario;
