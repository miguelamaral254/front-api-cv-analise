const ListaDeTalentosSkeleton = ({ colunas = 5, linhas = 10 }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow animate-pulse">
                <thead className="bg-gray-200">
                <tr>
                    {Array.from({ length: colunas }).map((_, index) => (
                        <th key={index} className="py-3 px-4">
                            <div className="h-5 bg-gray-300 rounded"></div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: linhas }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-gray-200">
                        {Array.from({ length: colunas }).map((_, colIndex) => (
                            <td key={colIndex} className="py-3 px-4">
                                <div className="h-4 bg-gray-300 rounded"></div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaDeTalentosSkeleton;