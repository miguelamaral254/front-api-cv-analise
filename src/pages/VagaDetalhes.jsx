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
      } finally {
        setLoading(false);
      }
    };
    fetchVaga();
  }, [vagaId]);

  if (loading) return <div className="text-center mt-8 text-lg font-semibold text-gray-700">Carregando detalhes da vaga...</div>;
  if (error) return <div className="text-center mt-8 text-lg font-semibold text-red-500">{error}</div>;
  if (!vaga) return <div className="text-center mt-8 text-lg font-semibold text-gray-500">Vaga não encontrada.</div>;

  return (
    <div className="container mx-auto p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8 border-b pb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{vaga.titulo_vaga}</h1>
            <p className="text-xl text-gray-500 mt-1">
              Status: {vaga.finalizada_em ? "Finalizada" : "Em andamento"}
            </p>
          </div>
          <Link to="/vagas" className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium whitespace-nowrap">
            Voltar para a Lista
          </Link>
        </div>

        {/* Bloco de Informações Gerais Adicionado */}
        <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Gerais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-gray-700 text-lg">
                <p><strong className="font-semibold">Localização:</strong> {vaga.cidade}</p>
                <p><strong className="font-semibold">Modelo:</strong>                   <span className="ml-2 text-sm font-normal text-white bg-blue-500 px-2 py-0.5 rounded-full">
{vaga.modelo_trabalho}</span></p>
                <p><strong className="font-semibold">Data de Criação:</strong> {new Date(vaga.criado_em).toLocaleDateString()}</p>
                {vaga.finalizada_em && (
                    <p><strong className="font-semibold">Finalizada em:</strong> {new Date(vaga.finalizada_em).toLocaleDateString()}</p>
                )}
            </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Descrição da Vaga</h2>
          <p className="text-gray-700 leading-relaxed">{vaga.descricao}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Critérios de Análise</h2>
          <ul className="space-y-4">
            {Object.entries(vaga.criterios_de_analise).map(([key, value]) => (
              <li key={key} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
                <p className="text-lg font-semibold text-gray-800">
                  {key.replace(/_/g, ' ')}
                 
                </p>
                <p className="text-gray-600 mt-1">{value.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VagaDetalhes;