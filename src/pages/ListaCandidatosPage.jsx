import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListaTalentosPorVaga from '../components/md-vagas/ListaTalentosPorVaga';
import TalentoDetalhesModal from '../components/md-talentos/TalentoDetalhesModal';
import { getTalentoById } from '../services/talentos.service';

const ListaCandidatosPage = () => {
    const { vagaId } = useParams();
    const navigate = useNavigate();

    const [talentoSelecionado, setTalentoSelecionado] = useState(null);
    const [isTalentoLoading, setIsTalentoLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTalentoClick = async (talentoId) => {
        setIsTalentoLoading(true);
        setError(null);
        try {
            const data = await getTalentoById(talentoId);
            setTalentoSelecionado(data);
        } catch (err) {
            setError("Não foi possível carregar os detalhes do talento.");
            console.log(err)
        } finally {
            setIsTalentoLoading(false);
        }
    };

    const handleVoltarClick = () => {
        navigate(-1); 
    };

    return (
        <>
            <main className="bg-gray-50 min-h-screen py-12 px-4 flex justify-center items-start">
                <ListaTalentosPorVaga
                    vagaId={vagaId}
                    onVoltarClick={handleVoltarClick}
                    onTalentoClick={handleTalentoClick}
                />
            </main>

            {isTalentoLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]">
                    <p className="text-white text-xl animate-pulse">Carregando detalhes do talento...</p>
                </div>
            )}

            {error && (
                // Lógica para exibir erro, se desejar (ex: um toast)
                console.error(error)
            )}

            {talentoSelecionado && (
                <TalentoDetalhesModal
                    talento={talentoSelecionado}
                    onClose={() => setTalentoSelecionado(null)}
                />
            )}
        </>
    );
};

export default ListaCandidatosPage;