// src/components/md-areas/DetalhesAreaModal.jsx

import { useState, useEffect } from 'react';
import { useSwal } from '../../hooks/useSwal';
import { MdClose, MdSave, MdDelete } from 'react-icons/md';

const DetalhesAreaModal = ({ area, onClose, onSave, onDelete }) => {
    const { fireConfirm } = useSwal();
    const [formData, setFormData] = useState({ ...area });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setFormData({ ...area });
    }, [area]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const result = await fireConfirm('Salvar Alterações', 'Deseja confirmar as alterações nesta área?');
        if (result.isConfirmed) {
            setIsSubmitting(true);
            await onSave(formData);
            // O isSubmitting não precisa voltar para false, pois o modal será fechado pelo componente pai.
        }
    };

    const handleDelete = async () => {
        const result = await fireConfirm(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir a área "${area.nome}"? Esta ação não pode ser desfeita.`
        );
        if (result.isConfirmed) {
            setIsSubmitting(true);
            await onDelete(area.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 animate-fade-in-up relative">

                {/* Overlay de Carregamento */}
                {isSubmitting && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex flex-col justify-center items-center z-10 rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary"></div>
                        <p className="mt-4 text-gray-700 font-semibold">Processando...</p>
                    </div>
                )}

                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Editar Área</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <MdClose size={24} />
                    </button>
                </div>
                <form onSubmit={handleSave}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">Nome da Área</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={formData.descricao || ''}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-4 bg-gray-50 rounded-b-lg">
                        <div className="flex gap-4">
                            <button type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                <MdSave size={20} />
                                Salvar
                            </button>
                            <button type="button" onClick={onClose}
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50">
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-800 disabled:opacity-50"
                            >
                                <MdDelete size={20} />
                                Excluir
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetalhesAreaModal;