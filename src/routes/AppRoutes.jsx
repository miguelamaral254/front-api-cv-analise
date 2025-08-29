import { Routes, Route } from "react-router-dom";
import VagasPage from "../pages/VagasPage";
import TalentosPage from "../pages/TalentosPage";
import FormVagasPage from "../pages/FormVagasPage";
import FormInscricaoPage from "../pages/FormInscricaoPage";
import FormUsersPage from "../pages/FormUsersPage";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ListaCandidatosPage from "../pages/ListaCandidatosPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vagas" element={<VagasPage />} />

      <Route path="/vagas/:vagaId/inscrever" element={<FormInscricaoPage />} />

      {/* Rotas Protegidas (precisa estar logado) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/talentos" element={<TalentosPage />} />
        <Route path="/vagas/criar" element={<FormVagasPage />} />
        <Route
          path="/vagas/:vagaId/candidatos"
          element={<ListaCandidatosPage />}
        />

        <Route
          path="/configuracoes"
          element={<p>Página de Configurações (usuario)</p>}
        />

        <Route element={<AdminRoute />}>
          <Route path="/users/criar" element={<FormUsersPage />} />
          <Route
            path="/vagas/:vagaId/candidatos"
            element={<ListaCandidatosPage />}
          />

          <Route
            path="/configuracoes"
            element={<p>Página de Configurações (Admin)</p>}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<p className="text-red-500 text-xl">Página não encontrada!</p>}
      />
    </Routes>
  );
};

export default AppRoutes;
