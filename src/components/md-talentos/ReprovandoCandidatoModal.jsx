const ReprovandoCandidatoModal = () => {
    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-30 z-[60] flex justify-center items-center transition-opacity duration-300">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-red-500 mb-4"></div>
                <p className="text-gray-700 text-lg font-semibold">Reprovando candidato...</p>
            </div>
        </div>
    );
};

export default ReprovandoCandidatoModal;