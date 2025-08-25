import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVagaById } from '../services/vagas.service';

const VagaDetalhes = () => {
  const { vagaId } = useParams();
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const data = await getVagaById(vagaId);
        setVaga(data);
      } catch (err) {
        setError("Vaga não encontrada ou erro ao buscar os dados.");
        console.error("Erro ao buscar detalhes da vaga:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVaga();
  }, [vagaId]);

  if (loading) return <div className="text-center mt-8">Carregando detalhes da vaga...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{vaga.titulo_vaga}</h1>
        <Link to="/vagas" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
          Voltar para a Lista
        </Link>
      </div>
      {vaga ? (
        <div className="space-y-4 text-gray-700">
          <p>**ID:** {vaga.id}</p>
          <p>**Criado em:** {new Date(vaga.criado_em).toLocaleString()}</p>
          <p>**Finalizada em:** {vaga.finalizada_em ? new Date(vaga.finalizada_em).toLocaleString() : "Em andamento"}</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Critérios de Análise</h2>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(vaga.criterios_de_analise, null, 2)}</pre>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">Vaga não encontrada.</p>
      )}
    </div>
  );
};

export default VagaDetalhes;