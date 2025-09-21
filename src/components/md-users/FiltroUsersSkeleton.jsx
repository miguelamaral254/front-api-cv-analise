const FiltroUsersSkeleton = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Placeholders para os campos de filtro */}
                <div className="h-[38px] bg-gray-200 rounded-lg"></div>
                <div className="h-[38px] bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};

export default FiltroUsersSkeleton;