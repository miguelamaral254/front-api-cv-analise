import { Routes, Route } from 'react-router-dom';
import VagasPage from '../pages/VagasPage';
import TalentosPage from '../pages/TalentosPage';
import FormVagasPage from '../pages/FormVagasPage';
import FormInscricaoPage from '../pages/FormInscricaoPage';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vagas/:vagaId/inscrever" element={<FormInscricaoPage />} />

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/vagas" element={<VagasPage />} />
        <Route path="/vagas/criar" element={<FormVagasPage />} />
        <Route path="/talentos" element={<TalentosPage />} />
      </Route>

      <Route path="*" element={<p className="text-red-500 text-xl">Página não encontrada!</p>} />
    </Routes>
  );
};

export default AppRoutes;