// src/pages/AreasPage.jsx

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAreas, updateArea, deleteArea } from '../services/areas.service';
import GridDefault from '../components/global/GridDefault';
import DetalhesAreaModal from '../components/md-areas/DetalhesAreaModal';
import { useSwal } from '../hooks/useSwal'; // Importe seu hook
import { MdAdd, MdSearch } from 'react-icons/md';
import ListaDeTalentosSkeleton from '../components/md-talentos/ListaDeTalentosSkeleton';

const AreasPage = () => {
    const navigate = useNavigate();
    const { fireToast, fireError } = useSwal(); // Instancie o hook
    const [areas, setAreas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [areaSelecionada, setAreaSelecionada] = useState(null);
    const [filtroNome, setFiltroNome] = useState('');

    const fetchAreas = async () => {
        setIsLoading(true);
        try {
            const data = await getAreas();
            setAreas(data);
        } catch (err) {
            setError('Não foi possível carregar as áreas.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAreas();
    }, []);

    const areasFiltradas = useMemo(() => {
        if (!filtroNome) {
            return areas;
        }
        return areas.filter(area =>
            area.nome.toLowerCase().includes(filtroNome.toLowerCase())
        );
    }, [areas, filtroNome]);

    const handleRowClick = (area) => {
        setAreaSelecionada(area);
    };

    const handleCloseModal = () => {
        setAreaSelecionada(null);
    };

    const handleSave = async (areaAtualizada) => {
        try {
            await updateArea(areaAtualizada.id, areaAtualizada);
            setAreas(prev => prev.map(a => (a.id === areaAtualizada.id ? areaAtualizada : a)));
            handleCloseModal();
            fireToast('success', 'Área atualizada com sucesso!');
        } catch (err) {
            console.error("Erro ao atualizar área:", err);
            fireError('Erro', 'Não foi possível atualizar a área.');
        }
    };

    const handleDelete = async (areaId) => {
        try {
            await deleteArea(areaId);
            setAreas(prev => prev.filter(a => a.id !== areaId));
            handleCloseModal();
            fireToast('success', 'Área excluída com sucesso!');
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Não foi possível excluir a área.';
            console.error("Erro ao excluir área:", err);
            fireError('Erro', errorMessage);
        }
    };

    const colunas = [
        { header: 'Nome', accessor: 'nome' },
        { header: 'Descrição', accessor: 'descricao' },
    ];

    const renderContent = () => {
        if (isLoading) {
            return <ListaDeTalentosSkeleton colunas={colunas.length} linhas={5} />;
        }
        if (error) {
            return <p className="text-center text-red-500 py-10">{error}</p>;
        }
        return (
            <GridDefault
                dados={areasFiltradas}
                colunas={colunas}
                onRowClick={handleRowClick}
                mensagemVazio={filtroNome ? "Nenhuma área encontrada com este nome." : "Nenhuma área de atuação cadastrada."}
            />
        );
    };

    return (
        <>
            <main className="container mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Áreas de Atuação</h1>
                    <button
                        onClick={() => navigate('/areas/formulario')}
                        className="flex items-center gap-2 bg-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-900 transition-colors w-full md:w-auto justify-center"
                    >
                        <MdAdd size={24} />
                        Nova Área
                    </button>
                </div>

                <div className="mb-6 relative">
                    <label htmlFor="filtro-nome" className="sr-only">Buscar por nome</label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MdSearch className="text-gray-400" size={20} />
                    </div>
                    <input
                        type="text"
                        id="filtro-nome"
                        placeholder="Buscar por nome da área..."
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {renderContent()}
            </main>

            {areaSelecionada && (
                <DetalhesAreaModal
                    area={areaSelecionada}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};

export default AreasPage;