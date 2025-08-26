// src/pages/VagasPage.jsx (Corrigido)

import { useState, useEffect } from 'react';
import { getVagas } from '../services/vagas.service';
import { getTalentoById } from '../services/talentos.service';
import ListaDeVagas from '../components/md-vagas/ListaDeVagas';
import VagaDetalhes from '../components/md-vagas/VagaDetalhes';
import TalentoDetalhesModal from '../components/md-talentos/TalentoDetalhesModal'; 

const VagasPage = () => {
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [talentoSelecionado, setTalentoSelecionado] = useState(null);
  const [isTalentoLoading, setIsTalentoLoading] = useState(false);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const data = await getVagas();
        setVagas(data);
      } catch (err) {
        setError("Não foi possível carregar as vagas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    if (!vagaSelecionada) {
      fetchVagas();
    }
  }, [vagaSelecionada]);

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

  if (loading) return <div className="text-center mt-8 text-gray-600">Carregando vagas...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {vagaSelecionada ? (
        <VagaDetalhes 
          vaga={vagaSelecionada} 
          onVoltarClick={() => setVagaSelecionada(null)}
          onTalentoClick={handleTalentoClick}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vagas Abertas</h1>
          <ListaDeVagas 
            vagas={vagas} 
            onVagaClick={(vaga) => setVagaSelecionada(vaga)} 
          />
        </>
      )}

      {isTalentoLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <p className="text-white text-xl">Carregando detalhes do talento...</p>
        </div>
      )}
      {talentoSelecionado && (
        <TalentoDetalhesModal
          talento={talentoSelecionado}
          onClose={() => setTalentoSelecionado(null)}
        />
      )}
    </div>
  );
};

export default VagasPage;