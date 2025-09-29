import React from 'react';

const TermosModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            onClick={onClose} // Fecha o modal ao clicar no fundo
        >
            <div
                className="bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full mx-4"
                onClick={e => e.stopPropagation()} // Impede que o clique dentro do modal o feche
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
                </div>

                <div className="prose max-w-none max-h-[60vh] overflow-y-auto">
                    {children}
                </div>

                <div className="text-right border-t pt-4 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermosModal;