import React, { useState } from "react";
import "./App.css";
import ListaDeTareas from "./componentes/ListaDeTareas";
import { FiClock } from "react-icons/fi";

function App() {
  const [stats, setStats] = useState({
    total: 0,
    completadas: 0,
    pendientes: 0,
    porcentaje: 0,
  });

  // Cálculo del offset para el círculo de progreso SVG
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.porcentaje / 100) * circumference;

  return (
    <div className="app-container">
      {/* Encabezado Principal */}
      <header className="app-header">
        <div className="header-marca">
          <div className="logo-icono-box">
            <span className="logo-emoji">⚡</span>
          </div>
          <div className="marca-textos">
            <h1 className="logo-titulo">
              TASK <span className="logo-resaltado">PULSE</span>
            </h1>
            <p className="logo-subtitulo">Gestor Inteligente de Productividad</p>
          </div>
        </div>

        {/* Tarjeta de Métricas en Vivo & Círculo de Progreso */}
        <div className="metricas-card">
          <div className="progreso-circular">
            <svg className="progreso-svg" width="80" height="80">
              <circle
                className="progreso-circulo-fondo"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="6"
                fill="transparent"
                r={radius}
                cx="40"
                cy="40"
              />
              <circle
                className="progreso-circulo-barra"
                stroke="url(#gradient-progreso)"
                strokeWidth="6"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx="40"
                cy="40"
              />
              <defs>
                <linearGradient id="gradient-progreso" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progreso-porcentaje">
              <span className="porcentaje-numero">{stats.porcentaje}%</span>
            </div>
          </div>

          <div className="metricas-detalles">
            <div className="metrica-item">
              <span className="metrica-valor">{stats.completadas} / {stats.total}</span>
              <span className="metrica-label">Tareas Listas</span>
            </div>
            <div className="metrica-chips">
              <span className="chip-pendientes">
                <FiClock size={11} />
                <span>{stats.pendientes} pendientes</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenedor Principal de la Aplicación */}
      <main className="app-main-card">
        <ListaDeTareas onStatsChange={setStats} />
      </main>

      {/* Footer Minimalista */}
      <footer className="app-footer">
        <p>Task Pulse ⚡ · Diseñado para enfoque y máxima productividad</p>
      </footer>
    </div>
  );
}

export default App;
