// src/pages/FormAreasPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArea } from '../services/areas.service';
import { useSwal } from '../hooks/useSwal';
import { MdSave, MdArrowBack } from 'react-icons/md';

const FormAreasPage = () => {
    const navigate = useNavigate();
    const { fireSuccess, fireError } = useSwal();
    const [formData, setFormData] = useState({ nome: '', descricao: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createArea(formData);
            fireSuccess('Área Criada!', 'A nova área de atuação foi cadastrada com sucesso.')
                .then(() => navigate('/areas'));
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 'Erro ao criar a área. Verifique se o nome já existe.';
            fireError('Ocorreu um Erro', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="bg-gray-50 min-h-screen py-12 px-4 flex justify-center items-start">
            <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-2xl w-full mx-auto">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900">Nova Área de Atuação</h1>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200">
                        <MdArrowBack /> Voltar
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nome" className="block text-md font-semibold text-gray-800 mb-2">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: Tecnologia da Informação"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao" className="block text-md font-semibold text-gray-800 mb-2">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Descreva as responsabilidades e o escopo desta área..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-900 disabled:bg-gray-400"
                        >
                            <MdSave size={22} />
                            {isLoading ? 'Salvando...' : 'Salvar Área'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default FormAreasPage;