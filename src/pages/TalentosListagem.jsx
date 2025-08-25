import { useState, useEffect } from 'react';
import { getTalentos } from '../services/talentos.service';
import { Link } from 'react-router-dom';

const TalentosListagem = () => {
  const [talentos, setTalentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalentos = async () => {
      try {
        const data = await getTalentos();
        setTalentos(data);
      } catch (err) {
        setError("Não foi possível carregar os talentos. Tente novamente mais tarde.");
        console.error("Erro ao buscar talentos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTalentos();
  }, []);

  if (loading) return <div className="text-center mt-8">Carregando talentos...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Lista de Talentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talentos.length > 0 ? (
          talentos.map(talento => (
            <div key={talento.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800">{talento.nome}</h2>
              <p className="text-gray-600 mt-2">**Email:** {talento.email}</p>
              <p className="text-gray-600">**Vaga ID:** {talento.vaga_id}</p>
              <Link to={`/talentos/${talento.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Ver Detalhes
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">Nenhum talento encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default TalentosListagem;