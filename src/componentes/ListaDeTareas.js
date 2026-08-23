import React, { useState, useEffect } from "react";
import TareaFormulario from "./TareaFormulario";
import Tarea from "./Tarea";
import "../holas-de-estilo/ListaDeTareas.css";
import { FiSearch, FiInbox, FiCheckCircle } from "react-icons/fi";

const TAREAS_INICIALES = [
  {
    id: "init-1",
    texto: "Diseñar interfaz con Glassmorphism y Dark Luxury",
    completada: true,
    prioridad: "alta",
    categoria: "Trabajo",
    creadaEn: "09:30 AM"
  },
  {
    id: "init-2",
    texto: "Optimizar rendimiento y persistencia en LocalStorage",
    completada: false,
    prioridad: "alta",
    categoria: "Proyecto",
    creadaEn: "10:15 AM"
  },
  {
    id: "init-3",
    texto: "Revisar filtros dinámicos y medidor de productividad",
    completada: false,
    prioridad: "media",
    categoria: "Estudio",
    creadaEn: "11:00 AM"
  }
];

function ListaDeTareas({ onStatsChange }) {
  const [tareas, setTareas] = useState(() => {
    try {
      const guardadas = localStorage.getItem("taskpulse_tareas_v1");
      if (guardadas) {
        return JSON.parse(guardadas);
      }
    } catch (e) {
      console.error("Error al leer de localStorage:", e);
    }
    return TAREAS_INICIALES;
  });

  const [filtro, setFiltro] = useState("todas"); // todas, activas, completadas
  const [busqueda, setBusqueda] = useState("");

  // Guardar en localStorage y actualizar métricas cada vez que cambien las tareas
  useEffect(() => {
    try {
      localStorage.setItem("taskpulse_tareas_v1", JSON.stringify(tareas));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }

    if (onStatsChange) {
      const total = tareas.length;
      const completadas = tareas.filter((t) => t.completada).length;
      const pendientes = total - completadas;
      const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;
      onStatsChange({ total, completadas, pendientes, porcentaje });
    }
  }, [tareas, onStatsChange]);

  const agregarTarea = (tarea) => {
    setTareas([tarea, ...tareas]);
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const completarTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const editarTarea = (id, nuevoTexto) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
      )
    );
  };

  const limpiarCompletadas = () => {
    setTareas(tareas.filter((t) => !t.completada));
  };

  // Filtrado reactivo
  const tareasFiltradas = tareas.filter((tarea) => {
    // Filtro por estado
    if (filtro === "activas" && tarea.completada) return false;
    if (filtro === "completadas" && !tarea.completada) return false;

    // Filtro por buscador
    if (busqueda.trim() && !tarea.texto.toLowerCase().includes(busqueda.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="lista-tareas-wrapper">
      <TareaFormulario onSubmit={agregarTarea} />

      {/* Barra de Controles y Filtros */}
      <div className="controles-barra">
        <div className="buscador-contenedor">
          <FiSearch className="buscador-icono" size={15} />
          <input
            type="text"
            className="buscador-input"
            placeholder="Buscar tarea..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="filtros-pestañas">
          <button
            className={`filtro-tab ${filtro === "todas" ? "activo" : ""}`}
            onClick={() => setFiltro("todas")}
          >
            Todas ({tareas.length})
          </button>
          <button
            className={`filtro-tab ${filtro === "activas" ? "activo" : ""}`}
            onClick={() => setFiltro("activas")}
          >
            Pendientes ({tareas.filter((t) => !t.completada).length})
          </button>
          <button
            className={`filtro-tab ${filtro === "completadas" ? "activo" : ""}`}
            onClick={() => setFiltro("completadas")}
          >
            Completadas ({tareas.filter((t) => t.completada).length})
          </button>
        </div>
      </div>

      {/* Lista de Tareas */}
      <div className="tareas-grid">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map((tarea) => (
            <Tarea
              key={tarea.id}
              id={tarea.id}
              texto={tarea.texto}
              completada={tarea.completada}
              prioridad={tarea.prioridad}
              categoria={tarea.categoria}
              creadaEn={tarea.creadaEn}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
            />
          ))
        ) : (
          <div className="tareas-vacio">
            <FiInbox size={38} className="vacio-icono" />
            <p className="vacio-titulo">No hay tareas en esta vista</p>
            <span className="vacio-subtitulo">
              {busqueda ? "Prueba con otra palabra clave" : "¡Agrega una nueva tarea arriba para comenzar!"}
            </span>
          </div>
        )}
      </div>

      {/* Barra de Acciones Globales */}
      {tareas.some((t) => t.completada) && (
        <div className="acciones-globales">
          <button className="btn-limpiar-completadas" onClick={limpiarCompletadas}>
            <FiCheckCircle size={14} />
            <span>Limpiar completadas</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ListaDeTareas;
