import { Routes, Route } from 'react-router-dom';
import VagasPage from './pages/VagasPage';
import TalentosPage from './pages/TalentosPage';
import FormVagasPage from './pages/FormVagasPage';
import Home from './pages/Home';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página inicial mostra o componente Home */}
      <Route path="/" element={<Home />} />
      <Route path="/vagas" element={<VagasPage />} />
      <Route path="/vagas/criar" element={<FormVagasPage />} />
      <Route path="/talentos" element={<TalentosPage />} />

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<p className="text-red-500 text-xl">Página não encontrada!</p>} />
    </Routes>
  );
};

export default AppRoutes;
