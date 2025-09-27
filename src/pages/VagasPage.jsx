import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { getVagas, getVagaById } from '../services/vagas.service';
import { getTalentoById } from '../services/talentos.service';
import ListaDeVagas from '../components/md-vagas/ListaDeVagas';
import VagaDetalhes from '../components/md-vagas/VagaDetalhes';
import TalentoDetalhesModal from '../components/md-talentos/TalentoDetalhesModal';
import Filtro from '../components/md-vagas/Filtro';
import FiltroSkeleton from '../components/md-vagas/FiltroSkeleton';
import ListaDeVagasSkeleton from '../components/md-vagas/ListaDeVagasSkeleton';
import LoadingModal from '../components/global/LoadingModal';

const VagasPage = () => {
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [talentoSelecionado, setTalentoSelecionado] = useState(null);
  const [isTalentoLoading, setIsTalentoLoading] = useState(false);
  const { user } = useAuth();
  const [filtros, setFiltros] = useState({
    termo: '', cidades: [], modelos: [], areaNomes: [], ordenacao: 'recentes', status: 'abertas'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      try {
        const data = await getVagas();
        setVagas(data);
      } catch (err) {
        setError("Não foi possível carregar as vagas. Tente novamente mais tarde.",err);
      } finally {
        setLoading(false);
      }
    };
    if (!vagaSelecionada) {
      fetchVagas();
    }
  }, [vagaSelecionada]);

  const cidadesUnicas = useMemo(() => {
    const cidadesDasVagas = vagas.map(vaga => vaga.cidade).filter(cidade => cidade && cidade !== 'N/A');
    return [...new Set(cidadesDasVagas)].sort();
  }, [vagas]);

  const handleFiltroChange = (name, value) => {
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  const vagasFiltradas = useMemo(() => {
    let vagasProcessadas = vagas.filter(vaga => {
      const matchTermo = filtros.termo ? vaga.titulo_vaga.toLowerCase().includes(filtros.termo.toLowerCase()) : true;
      const matchCidades = filtros.cidades.length > 0 ? filtros.cidades.includes(vaga.cidade) : true;
      const matchModelos = filtros.modelos.length > 0 ? filtros.modelos.includes(vaga.modelo_trabalho) : true;
      const matchAreas = filtros.areaNomes.length > 0 ? filtros.areaNomes.includes(vaga.nome_area) : true;
      const isFinalizada = vaga.finalizada_em != null;
      const matchStatus = user
          ? (filtros.status === 'todas' ? true : filtros.status === 'finalizadas' ? isFinalizada : !isFinalizada)
          : !isFinalizada;

      return matchTermo && matchCidades && matchModelos && matchAreas && matchStatus;
    });

    if (filtros.ordenacao === 'antigas') {
      vagasProcessadas.sort((a, b) => new Date(a.criado_em) - new Date(b.criado_em));
    } else {
      vagasProcessadas.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
    }
    return vagasProcessadas;
  }, [vagas, filtros, user]);

  const handleTalentoClick = async (talentoId) => {
    setIsTalentoLoading(true);
    setError(null);
    try {
      const data = await getTalentoById(talentoId);
      setTalentoSelecionado(data);
    } catch (err) {
      setError("Não foi possível carregar os detalhes do talento.", err);
    } finally {
      setIsTalentoLoading(false);
    }
  };

  const handleListarCandidatos = (vagaId) => {
    navigate(`/vagas/${vagaId}/candidatos`);
  };

  const handleVagaFinalizada = async () => {
    if (vagaSelecionada) {
      try {
        const vagaAtualizada = await getVagaById(vagaSelecionada.id);
        setVagaSelecionada(vagaAtualizada);
      } catch (err) {
        console.error("Erro ao recarregar dados da vaga:", err);
        setVagaSelecionada(null);
      }
    }
  };

  if (loading && !vagaSelecionada) {
    return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vagas Abertas</h1>
          <FiltroSkeleton />
          <ListaDeVagasSkeleton />
        </div>
    );
  }

  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
      <div className="container mx-auto p-4">
        {vagaSelecionada ? (
            <VagaDetalhes
                vaga={vagaSelecionada}
                onVoltarClick={() => setVagaSelecionada(null)}
                onTalentoClick={handleTalentoClick}
                onListarClick={() => handleListarCandidatos(vagaSelecionada.id)}
                onVagaFinalizada={handleVagaFinalizada}
            />
        ) : (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vagas Abertas</h1>
              <Filtro
                  filtros={filtros}
                  onFiltroChange={handleFiltroChange}
                  cidades={cidadesUnicas}
                  user={user}
              />
              <ListaDeVagas
                  vagas={vagasFiltradas}
                  onVagaClick={(vaga) => setVagaSelecionada(vaga)}
              />
            </>
        )}
        {isTalentoLoading && <LoadingModal />}
        {talentoSelecionado && (
            <TalentoDetalhesModal
                talento={talentoSelecionado}
                onClose={() => setTalentoSelecionado(null)}
            />
        )}
      </div>
  );
};

export default VagasPage;