import { Routes, Route } from 'react-router-dom';
import VagasPage from './pages/VagasPage';

import TalentosPage from './pages/TalentosPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p className="text-xl">Página Inicial. Navegue para <a href="/vagas" className="text-blue-500 hover:underline">/vagas</a> ou <a href="/talentos" className="text-blue-500 hover:underline">/talentos</a>.</p>} />
      <Route path="/vagas" element={<VagasPage />} />
      <Route path="/talentos" element={<TalentosPage />} />


      <Route path="*" element={<p className="text-red-500 text-xl">Página não encontrada!</p>} />
    </Routes>
  );
};

export default AppRoutes;