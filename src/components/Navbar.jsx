import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive 
        ? "bg-blue-700 text-white" 
        : "text-gray-300 hover:bg-blue-700 hover:text-white"
    }`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <header className="bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Esquerda: Logo */}
          <div className="flex-shrink-0">
            <Link to="/vagas">
              <img src={logo} alt="Logo Cognvox" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Centro: Navegação Principal (Desktop) */}
          <nav className="hidden md:flex md:space-x-4">
            <NavLink to="/vagas" className={linkClass}>Vagas</NavLink>
            <NavLink to="/talentos" className={linkClass}>Talentos</NavLink>
            {user.role === 'admin' && (
              <>
                <NavLink to="/vagas/criar" className={linkClass}>Criar Vaga</NavLink>
                <NavLink to="/users/criar" className={linkClass}>Criar Usuário</NavLink>
              </>
            )}
          </nav>

          {/* Direita: Menu de Perfil e Menu Hambúrguer */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <div className="hidden md:block relative" ref={profileMenuRef}>
              <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="p-1 rounded-full hover:bg-blue-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b">Olá, {user.nome}</div>
                  <Link to="/configuracoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configurações</Link>
                  <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</button>
                </div>
              )}
            </div>
            <div className="flex md:hidden" ref={mobileMenuRef}>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center rounded-md p-2 hover:bg-blue-700 focus:outline-none">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink to="/vagas" className={linkClass}>Vagas</NavLink>
            <NavLink to="/talentos" className={linkClass}>Talentos</NavLink>
            {user.role === 'admin' && (
              <>
                <NavLink to="/vagas/criar" className={linkClass}>Criar Vaga</NavLink>
                <NavLink to="/users/criar" className={linkClass}>Criar Usuário</NavLink>
              </>
            )}
            <div className="border-t border-blue-700 pt-4 mt-4">
              <div className="flex items-center px-3 mb-3">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user.nome}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="space-y-1">
                <NavLink to="/configuracoes" className={linkClass}>Configurações</NavLink>
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-blue-700 hover:text-white">Sair</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;