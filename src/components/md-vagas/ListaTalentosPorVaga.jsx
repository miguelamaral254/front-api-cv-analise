import { useState, useEffect } from 'react';
import { getTalentosByVagaId } from '../../services/talentos.service';
import { analyzeVaga } from '../../services/vagas.service';
import { MdArrowBack, MdAnalytics, MdFormatListBulleted } from 'react-icons/md';

const ListaTalentosPorVaga = ({ vagaId, onVoltarClick, onTalentoClick }) => {
  const [talentos, setTalentos] = useState([]);
  const [ranking, setRanking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topCandidatos, setTopCandidatos] = useState(10);

  useEffect(() => {
    const fetchTalentos = async () => {
      try {
        setIsLoading(true);
        setError(null);
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

  const handleAnalisar = async (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(false);
    setIsAnalyzing(true);
    setError(null);
    setRanking(null);
    try {
      const data = await analyzeVaga(vagaId, topCandidatos);
      setRanking(data.ranking);
    } catch (err) {
      setError('Não foi possível gerar o ranking. Verifique se existem candidatos aplicados para esta vaga.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const showListaCompleta = () => {
    setRanking(null);
    setError(null);
  }

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-8 border-b pb-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          {ranking ? 'Ranking de Candidatos' : 'Candidatos Aplicados'}
        </h1>
        <p className="text-gray-500">{talentos.length} talento(s) encontrado(s)</p>
      </div>
      <button
        onClick={onVoltarClick}
        className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
      >
        <MdArrowBack /> Voltar
      </button>
    </div>
  );

  const renderContent = () => {
    if (isLoading) return <p className="text-center text-gray-700 font-semibold p-10">Carregando talentos...</p>;
    if (isAnalyzing) return <p className="text-center text-gray-700 font-semibold p-10">🔍 Analisando e rankeando... Por favor, aguarde.</p>;
    if (error) return <p className="text-center text-red-600 font-semibold p-10">{error}</p>;

    if (ranking) {
      return (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Rank</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Nome</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Score Final</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((candidato, index) => (
              <tr key={candidato.id_talento} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => onTalentoClick(candidato.id_talento)}>
                <td className="py-3 px-4 font-bold">#{index + 1}</td>
                <td className="py-3 px-4">{candidato.nome}</td>
                <td className="py-3 px-4 font-bold text-green-700">{candidato.score_final.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    
    if (talentos.length > 0) {
      return (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Nome</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Data de Inscrição</th>
            </tr>
          </thead>
          <tbody>
            {talentos.map((talento) => (
              <tr key={talento.id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => onTalentoClick(talento.id)}>
                <td className="py-3 px-4 font-medium text-gray-800">{talento.nome}</td>
                <td className="py-3 px-4 text-gray-600">{talento.email}</td>
                <td className="py-3 px-4 text-gray-600">{new Date(talento.criado_em).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p className="text-center text-gray-600 py-10">Nenhum candidato se inscreveu para esta vaga ainda.</p>;
  };
  
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-5xl w-full mx-auto animate-fade-in">
      {renderHeader()}
      
      <div className="mb-6 flex justify-center gap-4">
        {ranking ? (
           <button onClick={showListaCompleta} className="flex items-center gap-2 bg-secondary text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
             <MdFormatListBulleted /> Ver Lista Completa
           </button>
        ) : (
          talentos.length > 0 && (
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-orange-600 transition-colors">
              <MdAnalytics /> Analisar e Rankear
            </button>
          )
        )}
      </div>

      {renderContent()}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Configurar Análise</h3>
            <form onSubmit={handleAnalisar}>
              <label htmlFor="top_candidatos" className="block text-gray-700 font-semibold mb-2">
                Número de candidatos no ranking:
              </label>
              <input
                type="number"
                id="top_candidatos"
                value={topCandidatos}
                onChange={(e) => setTopCandidatos(Number(e.target.value))}
                min="1"
                className="w-full p-2 border rounded-lg"
              />
              <div className="mt-6 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 px-4 py-2 rounded-lg">Cancelar</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">Confirmar e Analisar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaTalentosPorVaga;