import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTalentosByVagaId, getTalentoById } from '../services/talentos.service';
import { analyzeVaga } from '../services/vagas.service';
import ListaDeTalentos from '../components/md-talentos/ListaDeTalentos';
import TalentoDetalhesModal from '../components/md-talentos/TalentoDetalhesModal';
import FiltroTalentos from '../components/md-talentos/FiltroTalentos';
import { MdArrowBack, MdAnalytics, MdFormatListBulleted } from 'react-icons/md';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FiltroTalentosSkeleton from '../components/md-talentos/FiltroTalentosSkeleton';
import ListaDeTalentosSkeleton from '../components/md-talentos/ListaDeTalentosSkeleton';

const ListaCandidatosPage = () => {
    const { vagaId } = useParams();
    const navigate = useNavigate();
    const [talentos, setTalentos] = useState([]);
    const [ranking, setRanking] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [topCandidatos, setTopCandidatos] = useState(10);
    const [talentoSelecionado, setTalentoSelecionado] = useState(null);
    const [isTalentoLoading, setIsTalentoLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const initialStateFiltros = {
        termo: '',
        cidades: [],
        areaNomes: [],
        status: 'todos'
    };
    const [filtros, setFiltros] = useState(initialStateFiltros);

    useEffect(() => {
        const fetchTalentos = async () => {
            setIsLoading(true);
            try {
                const data = await getTalentosByVagaId(vagaId);
                setTalentos(data);
            } catch (err) {
                setError('Não foi possível carregar a lista de talentos.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTalentos();
    }, [vagaId]);

    const handlePaginaChange = (event, value) => {
        setPaginaAtual(value);
    };

    const dadosBase = useMemo(() => ranking || talentos, [ranking, talentos]);

    const cidadesUnicas = useMemo(() => {
        const cidadesDosTalentos = dadosBase.map(t => t.cidade).filter(c => c);
        return [...new Set(cidadesDosTalentos)].sort();
    }, [dadosBase]);

    const areasUnicas = useMemo(() => {
        const nomesDasAreas = dadosBase.map(t => t.nome_area).filter(a => a);
        return [...new Set(nomesDasAreas)].sort();
    }, [dadosBase]);

    const handleFiltroChange = (name, value) => {
        setFiltros(prev => ({ ...prev, [name]: value }));
        setPaginaAtual(1);
    };

    const handleLimparFiltros = () => {
        setFiltros(initialStateFiltros);
        setPaginaAtual(1);
    };

    const talentosFiltrados = useMemo(() => {
        return dadosBase.filter(talento => {
            const termoBusca = filtros.termo.toLowerCase();
            const matchTermo = filtros.termo
                ? (talento.nome && talento.nome.toLowerCase().includes(termoBusca)) ||
                (talento.email && talento.email.toLowerCase().includes(termoBusca))
                : true;
            const matchCidades = filtros.cidades.length > 0
                ? filtros.cidades.includes(talento.cidade)
                : true;
            const matchAreas = filtros.areaNomes.length > 0
                ? filtros.areaNomes.includes(talento.nome_area)
                : true;
            const matchStatus = filtros.status === 'todos'
                ? true
                : filtros.status === 'ativos'
                    ? talento.ativo
                    : !talento.ativo;

            return matchTermo && matchCidades && matchAreas && matchStatus;
        });
    }, [dadosBase, filtros]);

    const paginacao = useMemo(() => {
        const totalPaginas = Math.ceil(talentosFiltrados.length / itensPorPagina);
        const indiceInicial = (paginaAtual - 1) * itensPorPagina;
        const itensPaginados = talentosFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);
        return { totalPaginas, itensPaginados };
    }, [talentosFiltrados, paginaAtual, itensPorPagina]);

    const handleAnalisar = async (e) => {
        if (e) e.preventDefault();
        setIsModalOpen(false);
        setIsAnalyzing(true);
        setError(null);
        setRanking(null);
        setPaginaAtual(1);
        try {
            const data = await analyzeVaga(vagaId, topCandidatos);
            setRanking(data.ranking.map(r => ({ ...r, id: r.id_talento })));
        } catch (err) {
            setError('Não foi possível gerar o ranking.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleTalentoClick = async (talentoId) => {
        setIsTalentoLoading(true);
        setError(null);
        try {
            const data = await getTalentoById(talentoId);
            setTalentoSelecionado(data);
        } catch (err) {
            setError("Não foi possível carregar os detalhes do talento.");
        } finally {
            setIsTalentoLoading(false);
        }
    };

    const handleModalDataChange = (talentoAtualizado) => {
        setTalentos(prevTalentos =>
            prevTalentos.map(t => (t.id === talentoAtualizado.id ? talentoAtualizado : t))
        );
        if (ranking) {
            setRanking(prevRanking =>
                prevRanking.map(r => (r.id === talentoAtualizado.id ? { ...r, ...talentoAtualizado } : r))
            );
        }
        setTalentoSelecionado(talentoAtualizado);
    };

    const showListaCompleta = () => {
        setRanking(null);
        setError(null);
        setPaginaAtual(1);
    };

    const colunasListaCompleta = [
        { header: 'Nome', accessor: 'nome' },
        { header: 'Status', render: (talento) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    talento.ativo
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}>
                {talento.ativo ? 'Ativo' : 'Reprovado'}
            </span>
            )},
        { header: 'Email', accessor: 'email' },
        { header: "Cidade", accessor: "cidade" },
        { header: "Área", accessor: "nome_area" },
        { header: 'Data de Inscrição', render: (talento) => new Date(talento.criado_em).toLocaleDateString() }
    ];

    const colunasRanking = [
        { header: 'Rank', render: (talento, index) => <span className="font-bold">#{(paginaAtual - 1) * itensPorPagina + index + 1}</span> },
        { header: 'Nome', accessor: 'nome' },
        { header: 'Score Final', render: (talento) => <span className="font-bold text-green-700">{talento.score_final.toFixed(2)}%</span> }
    ];

    if (isLoading) {
        return (
            <main className="bg-gray-50 min-h-screen py-12 px-4 flex justify-center items-start">
                <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-5xl w-full mx-auto animate-fade-in">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">Candidatos Aplicados</h1>
                            <p className="text-gray-500">Carregando informações...</p>
                        </div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            <MdArrowBack /> Voltar
                        </button>
                    </div>
                    <FiltroTalentosSkeleton />
                    <div className="my-6 flex justify-center">
                        <div className="h-10 bg-gray-300 rounded-lg w-48 animate-pulse"></div>
                    </div>
                    <ListaDeTalentosSkeleton colunas={colunasListaCompleta.length} linhas={itensPorPagina} />
                </div>
            </main>
        );
    }

    const renderContent = () => {
        if (isAnalyzing) return <p className="text-center text-gray-700 font-semibold p-10">🔍 Analisando...</p>;
        if (error) return <p className="text-center text-red-600 font-semibold p-10">{error}</p>;

        const temFiltroAtivo = filtros.termo || filtros.cidades.length > 0 || filtros.areaNomes.length > 0 || filtros.status !== 'todos';

        return (
            <>
                <ListaDeTalentos
                    talentos={paginacao.itensPaginados}
                    colunas={ranking ? colunasRanking : colunasListaCompleta}
                    onTalentoClick={(talento) => handleTalentoClick(talento.id)}
                    mensagemVazio={temFiltroAtivo ? "Nenhum candidato encontrado com os filtros aplicados." : "Nenhum candidato se inscreveu para esta vaga ainda."}
                />
                {paginacao.totalPaginas > 0 && (
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
        );
    };

    return (
        <>
            <main className="bg-gray-50 min-h-screen py-12 px-4 flex justify-center items-start">
                <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-5xl w-full mx-auto animate-fade-in">
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{ranking ? 'Ranking de Candidatos' : 'Candidatos Aplicados'}</h1>
                            <p className="text-gray-500">{talentosFiltrados.length} talento(s) encontrado(s)</p>
                        </div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            <MdArrowBack /> Voltar
                        </button>
                    </div>

                    <FiltroTalentos
                        filtros={filtros}
                        onFiltroChange={handleFiltroChange}
                        cidades={cidadesUnicas}
                        areas={areasUnicas}
                        onLimparFiltros={handleLimparFiltros}
                        hideVagaIdFilter={true}
                        showStatusFilter={true}
                    />

                    <div className="my-6 flex justify-center gap-4">
                        {ranking ? (
                            <button onClick={showListaCompleta} className="flex items-center gap-2 bg-secondary text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700">
                                <MdFormatListBulleted /> Ver Lista Completa
                            </button>
                        ) : (
                            talentos.length > 0 && (
                                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-900">
                                    <MdAnalytics /> Analisar e Rankear
                                </button>
                            )
                        )}
                    </div>
                    {renderContent()}
                </div>
            </main>

            {isTalentoLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
                    <p className="text-white text-xl animate-pulse">Carregando detalhes do talento...</p>
                </div>
            )}
            {talentoSelecionado && (
                <TalentoDetalhesModal
                    talento={talentoSelecionado}
                    onClose={() => setTalentoSelecionado(null)}
                    onDataChange={handleModalDataChange}
                />
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Configurar Análise</h3>
                        <form onSubmit={handleAnalisar}>
                            <label htmlFor="top_candidatos" className="block text-gray-700 font-semibold mb-2">
                                Número de candidatos no ranking:
                            </label>
                            <input type="number" id="top_candidatos" value={topCandidatos} onChange={(e) => setTopCandidatos(Number(e.target.value))} min="1" className="w-full p-2 border rounded-lg" />
                            <div className="mt-6 flex justify-end gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 px-4 py-2 rounded-lg">Cancelar</button>
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">Confirmar e Analisar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListaCandidatosPage;