import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVagas } from '../services/vagas.service';

const VagasListagem = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const data = await getVagas();
        console.log('Dados da API de vagas:', data);
        setVagas(data);
      } catch (err) {
        setError("Não foi possível carregar as vagas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchVagas();
  }, []);

  if (loading) return <div className="text-center mt-8 text-gray-600">Carregando vagas...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vagas Abertas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vagas.length > 0 ? (
          vagas.map(vaga => (
            <div
              key={vaga.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col"
            >
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">{vaga.titulo_vaga}</h2>

                {/* Bloco de Informações Adicionado */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-gray-100 px-2.5 py-1 rounded-full">📍 {vaga.cidade}</span>
                  <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">🏢 {vaga.modelo_trabalho}</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">{vaga.descricao}</p>

                <div>
                  <strong className="font-medium text-gray-800">Principais Critérios:</strong>
                  <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
                    {Object.keys(vaga.criterios_de_analise).map((key) => (
                      <li key={key}>{key.replace(/_/g, ' ')}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-right">
                <Link
                  to={`/vagas/${vaga.id}`}
                  className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Nenhuma vaga encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default VagasListagem;