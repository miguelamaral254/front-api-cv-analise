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
      <ul className="divide-y divide-gray-200">
        {talentos.length > 0 ? (
          talentos.map(talento => (
            <li key={talento.id} className="py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{talento.nome}</h2>
                <p className="text-gray-600">Email: {talento.email}</p>
              </div>
              <Link to={`/talentos/${talento.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                Ver Detalhes
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center py-4">Nenhum talento encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default TalentosListagem;