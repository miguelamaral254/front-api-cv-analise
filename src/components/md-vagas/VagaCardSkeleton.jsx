const VagaCardSkeleton = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col animate-pulse">
            <div className="flex-grow">
                {/* Título */}
                <div className="h-7 bg-gray-300 rounded w-3/4 mb-4"></div>

                {/* Tags */}
                <div className="flex items-center flex-wrap gap-2 mb-4">
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                </div>

                {/* Descrição */}
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>

                {/* Critérios */}
                <div>
                    <div className="h-5 w-1/3 bg-gray-300 rounded mb-3"></div>
                    <div className="space-y-2 ml-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            {/* Botão */}
            <div className="mt-6 flex justify-end">
                <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
            </div>
        </div>
    );
};

export default VagaCardSkeleton;