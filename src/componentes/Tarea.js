import React, { useState } from "react";
import "../holas-de-estilo/Tarea.css";
import { FiCheck, FiTrash2, FiEdit2, FiSave, FiX, FiClock } from "react-icons/fi";

function Tarea({ id, texto, completada, prioridad, categoria, creadaEn, completarTarea, eliminarTarea, editarTarea }) {
  const [estaEditando, setEstaEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(texto);

  const guardarEdicion = () => {
    const limpio = textoEditado.trim().slice(0, 150);
    if (limpio && limpio !== texto) {
      editarTarea(id, limpio);
    }
    setEstaEditando(false);
  };

  const cancelarEdicion = () => {
    setTextoEditado(texto);
    setEstaEditando(false);
  };

  const manejarKeyDown = (e) => {
    if (e.key === "Enter") guardarEdicion();
    if (e.key === "Escape") cancelarEdicion();
  };

  const obtenerClasePrioridad = () => {
    if (prioridad === "alta") return "prioridad-alta";
    if (prioridad === "media") return "prioridad-media";
    return "prioridad-baja";
  };

  const obtenerEtiquetaPrioridad = () => {
    if (prioridad === "alta") return "Alta";
    if (prioridad === "media") return "Media";
    return "Baja";
  };

  return (
    <div className={`tarea-card ${completada ? "completada" : ""} ${obtenerClasePrioridad()}`}>
      <div className="tarea-checkbox-contenedor" onClick={() => completarTarea(id)}>
        <div className={`tarea-checkbox ${completada ? "activo" : ""}`}>
          {completada && <FiCheck size={14} />}
        </div>
      </div>

      <div className="tarea-cuerpo">
        {estaEditando ? (
          <div className="tarea-edicion-fila">
            <input
              type="text"
              className="tarea-input-editar"
              value={textoEditado}
              maxLength={150}
              autoFocus
              onChange={(e) => setTextoEditado(e.target.value)}
              onKeyDown={manejarKeyDown}
            />
            <button className="tarea-btn-accion guardar" onClick={guardarEdicion} title="Guardar">
              <FiSave size={15} />
            </button>
            <button className="tarea-btn-accion cancelar" onClick={cancelarEdicion} title="Cancelar">
              <FiX size={15} />
            </button>
          </div>
        ) : (
          <div className="tarea-texto-wrapper">
            <span className="tarea-texto" onClick={() => completarTarea(id)}>
              {texto}
            </span>

            <div className="tarea-metadatos">
              <span className={`badge-prioridad ${obtenerClasePrioridad()}`}>
                {obtenerEtiquetaPrioridad()}
              </span>
              {categoria && (
                <span className="badge-categoria">
                  {categoria}
                </span>
              )}
              {creadaEn && (
                <span className="badge-tiempo">
                  <FiClock size={11} />
                  <span>{creadaEn}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {!estaEditando && (
        <div className="tarea-acciones">
          <button
            className="tarea-btn-icono editar"
            onClick={() => setEstaEditando(true)}
            title="Editar tarea"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            className="tarea-btn-icono eliminar"
            onClick={() => eliminarTarea(id)}
            title="Eliminar tarea"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Tarea;
