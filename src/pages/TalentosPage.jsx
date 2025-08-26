import { useState, useEffect } from 'react';
import { getTalentos } from '../services/talentos.service';
import ListaDeTalentos from '../components/md-talentos/ListaDeTalentos';
import TalentoDetalhes from '../components/md-talentos/TalentoDetalhes';

const TalentosPage = () => {
  const [talentos, setTalentos] = useState([]);
  const [talentoSelecionado, setTalentoSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalentos = async () => {
      try {
        const data = await getTalentos();
        setTalentos(data);
      } catch (err) {
        setError("Não foi possível carregar os talentos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchTalentos();
  }, []);

  if (loading) return <div className="text-center mt-8 text-gray-600">Carregando talentos...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {talentoSelecionado ? (
        <TalentoDetalhes 
          talento={talentoSelecionado} 
          onVoltarClick={() => setTalentoSelecionado(null)} 
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Talentos Cadastrados</h1>
          <ListaDeTalentos 
            talentos={talentos} 
            onTalentoClick={(talento) => setTalentoSelecionado(talento)} 
          />
        </>
      )}
    </div>
  );
};

export default TalentosPage;