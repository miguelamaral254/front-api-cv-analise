const FiltroTalentosSkeleton = () => {
    return (
        // O ideal é que as classes aqui (bg-white, p-6, etc.) sejam as mesmas do seu componente FiltroTalentos real
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                {/* Placeholders para os campos de filtro */}
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );
};

export default FiltroTalentosSkeleton;