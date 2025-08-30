import { useState } from 'react';
import { analyzeVaga } from '../../services/vagas.service';

const RankingCandidatos = ({ vagaId, onTalentoClick }) => {
  const [ranking, setRanking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topCandidatos, setTopCandidatos] = useState(10);

  const handleAnalisar = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsLoading(true);
    setError(null);
    setRanking(null);

    try {
      const data = await analyzeVaga(vagaId, topCandidatos);
      setRanking(data.ranking);
    } catch (err) {
      setError('Não foi possível gerar o ranking. Verifique se existem candidatos aplicados para esta vaga.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Ranking de Candidatos</h2>
      <div className="bg-gray-50 p-6 rounded-lg">
        {!ranking && !isLoading && (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Clique no botão para processar e rankear os melhores candidatos.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Analisar e Rankear Candidatos
            </button>
          </div>
        )}
        
        {isLoading && <p className="text-center text-gray-700 font-semibold">🔍 Analisando... Por favor, aguarde.</p>}
        {error && <p className="text-center text-red-600 font-semibold">{error}</p>}
        
        {ranking && (
          <div>
            {ranking.length > 0 ? (
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
                    <tr 
                      key={candidato.id_talento} 
                      className="border-b hover:bg-gray-100 cursor-pointer"
                      onClick={() => onTalentoClick(candidato.id_talento)}
                    >
                      <td className="py-3 px-4 font-bold">#{index + 1}</td>
                      <td className="py-3 px-4">{candidato.nome}</td>
                      <td className="py-3 px-4 font-bold text-green-700">{candidato.score_final.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-600">Nenhum candidato encontrado para esta vaga.</p>
            )}
            <div className="text-center mt-6">
               <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Analisar Novamente
                </button>
            </div>
          </div>
        )}
      </div>

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

export default RankingCandidatos;