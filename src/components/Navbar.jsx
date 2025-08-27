// src/components/NavBar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // ajuste o caminho conforme necessário

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // ajuste a rota de saída conforme necessário
  };

  // Função auxiliar para as classes dos links
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition-colors ${
      isActive ? "bg-blue-700" : "hover:bg-blue-700"
    }`;

  return (
    <header className="bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        {/* Logo e navegação */}
        <div className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="h-8" />

          <nav className="flex items-center space-x-4">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/vagas" className={linkClass}>
              Vagas
            </NavLink>
            <NavLink to="/vagas/criar" className={linkClass}>
              Criar Vaga
            </NavLink>
            <NavLink to="/talentos" className={linkClass}>
              Talentos
            </NavLink>
          </nav>
        </div>

        {/* Botão de logout */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-lg transition-colors hover:bg-blue-700"
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default NavBar;
