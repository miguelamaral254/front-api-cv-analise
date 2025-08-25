import { Routes, Route } from 'react-router-dom';
import VagasListagem from './pages/VagasListagem';
import VagaDetalhes from './pages/VagaDetalhes';
import TalentosListagem from './pages/TalentosListagem';
import TalentoDetalhes from './pages/TalentoDetalhes';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<p className="text-xl">Página Inicial. Navegue para <a href="/vagas" className="text-blue-500 hover:underline">/vagas</a> ou <a href="/talentos" className="text-blue-500 hover:underline">/talentos</a>.</p>} />
      
      {/* Rotas para Vagas */}
      <Route path="/vagas" element={<VagasListagem />} />
      <Route path="/vagas/:vagaId" element={<VagaDetalhes />} />

      {/* Rotas para Talentos */}
      <Route path="/talentos" element={<TalentosListagem />} />
      <Route path="/talentos/:talentoId" element={<TalentoDetalhes />} />

      {/* Rota para 404 - Not Found */}
      <Route path="*" element={<p className="text-red-500 text-xl">Página não encontrada!</p>} />
    </Routes>
  );
};

export default AppRoutes;