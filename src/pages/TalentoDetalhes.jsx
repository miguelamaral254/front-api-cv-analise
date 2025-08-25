import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTalentoById } from '../services/talentos.service';
import { Link } from 'react-router-dom';

const TalentoDetalhes = () => {
  const { talentoId } = useParams();
  const [talento, setTalento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalento = async () => {
      try {
        const data = await getTalentoById(talentoId);
        setTalento(data);
      } catch (err) {
        setError("Talento não encontrado ou erro ao buscar os dados.");
        console.error("Erro ao buscar detalhes do talento:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTalento();
  }, [talentoId]);

  if (loading) return <div className="text-center mt-8">Carregando detalhes do talento...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Detalhes do Talento</h1>
        <Link to="/talentos" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
          Voltar para a Lista
        </Link>
      </div>
      {talento ? (
        <div className="space-y-4 text-gray-700">
          <p>**ID:** {talento.id}</p>
          <p>**Nome:** {talento.nome}</p>
          <p>**Email:** {talento.email}</p>
          <p>**Telefone:** {talento.telefone || "Não informado"}</p>
          <p>**ID da Vaga:** {talento.vaga_id}</p>
          <p>**Criado em:** {new Date(talento.criado_em).toLocaleString()}</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Sobre Mim</h2>
            <p>{talento.sobre_mim || "Não há informações sobre este talento."}</p>
          </div>
          {/* Você pode adicionar mais detalhes aqui, como experiência, formação, etc. */}
        </div>
      ) : (
        <p className="text-red-500 text-center">Talento não encontrado.</p>
      )}
    </div>
  );
};

export default TalentoDetalhes;