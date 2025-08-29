import { useState, useEffect, useMemo } from 'react';
import { getTalentos } from '../services/talentos.service';
import TalentoDetalhes from '../components/md-talentos/TalentoDetalhes';
import FiltroTalentos from '../components/md-talentos/FiltroTalentos';
import ListaDeTalentos from '../components/md-talentos/ListaDeTalentos';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TalentosPage = () => {
  const [talentos, setTalentos] = useState([]);
  const [talentoSelecionado, setTalentoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const initialStateFiltros = {
    termo: '',
    cidades: [],
    vaga_id: '',
    areaNomes: []
  };
  const [filtros, setFiltros] = useState(initialStateFiltros);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  useEffect(() => {
    const fetchTalentos = async () => {
      setLoading(true);
      try {
        const data = await getTalentos();
        setTalentos(data);
      } catch (err) {
        setError("Não foi possível carregar os talentos.");
      } finally {
        setLoading(false);
      }
    };
    fetchTalentos();
  }, []);

  const cidadesUnicas = useMemo(() => {
    const cidadesDosTalentos = talentos.map(t => t.cidade).filter(c => c);
    return [...new Set(cidadesDosTalentos)].sort();
  }, [talentos]);

  const areasUnicas = useMemo(() => {
    const nomesDasAreas = talentos.map(t => t.nome_area).filter(a => a);
    return [...new Set(nomesDasAreas)].sort();
  }, [talentos]);

  const handleFiltroChange = (name, value) => {
    setFiltros(prev => ({ ...prev, [name]: value }));
    setPaginaAtual(1);
  };
  
  const handleLimparFiltros = () => {
    setFiltros(initialStateFiltros);
    setPaginaAtual(1);
  };

  const handlePaginaChange = (event, value) => {
    setPaginaAtual(value);
  };

  const talentosFiltrados = useMemo(() => {
    return talentos.filter(talento => {
      const termoBusca = filtros.termo.toLowerCase();
      const matchTermo = filtros.termo
        ? talento.nome.toLowerCase().includes(termoBusca) || talento.email.toLowerCase().includes(termoBusca)
        : true;
      const matchCidades = filtros.cidades.length > 0
        ? filtros.cidades.includes(talento.cidade)
        : true;
      const matchVagaId = filtros.vaga_id
        ? talento.vaga_id.toString() === filtros.vaga_id
        : true;
      const matchAreas = filtros.areaNomes.length > 0
        ? filtros.areaNomes.includes(talento.nome_area)
        : true;
      return matchTermo && matchCidades && matchVagaId && matchAreas;
    });
  }, [talentos, filtros]);

  const paginacao = useMemo(() => {
    const totalPaginas = Math.ceil(talentosFiltrados.length / itensPorPagina);
    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const talentosPaginados = talentosFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);
    return { totalPaginas, talentosPaginados };
  }, [talentosFiltrados, paginaAtual, itensPorPagina]);

  const colunasDaTabela = [
    { header: "Nome", accessor: "nome" },
    { header: "Email", accessor: "email" },
    { header: "Cidade", accessor: "cidade" },
    { header: "Área", accessor: "nome_area" },
    { header: "Vaga ID", accessor: "vaga_id" },
  ];

  if (loading)
    return (
      <div className="text-center mt-8 text-gray-600">
        Carregando talentos...
      </div>
    );
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {talentoSelecionado ? (
        <TalentoDetalhes
          talento={talentoSelecionado}
          onVoltarClick={() => setTalentoSelecionado(null)}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Banco de Talentos
          </h1>
          <FiltroTalentos
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
            cidades={cidadesUnicas}
            areas={areasUnicas}
            onLimparFiltros={handleLimparFiltros}
          />
          <ListaDeTalentos
            talentos={paginacao.talentosPaginados}
            colunas={colunasDaTabela}
            onTalentoClick={(talento) => setTalentoSelecionado(talento)}
            mensagemVazio="Nenhum talento encontrado com os filtros aplicados."
          />
          {paginacao.totalPaginas > 1 && (
            <div className="flex justify-center mt-6">
              <Stack spacing={2}>
                <Pagination
                  count={paginacao.totalPaginas}
                  page={paginaAtual}
                  onChange={handlePaginaChange}
                  color="primary"
                />
              </Stack>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TalentosPage;