const GridDefault = ({ dados, colunas, onRowClick, mensagemVazio, onSort, sortConfig }) => {
    if (!dados || dados.length === 0) {
        return <p className="text-center text-gray-600 py-10">{mensagemVazio}</p>;
    }

    const getSortIcon = (columnKey) => {
        if (!sortConfig || sortConfig.key !== columnKey) {
            return <span className="ml-1 text-gray-400">↕</span>;
        }
        if (sortConfig.direction === 'ascending') {
            return <span className="ml-1">▲</span>;
        }
        return <span className="ml-1">▼</span>;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-secondary">
                <tr>
                    {colunas.map((coluna) => (
                        <th
                            key={coluna.header}
                            className={`py-3 px-4 text-left font-semibold text-white select-none ${coluna.accessor ? 'cursor-pointer hover:bg-blue-800 transition-colors' : ''}`}
                            onClick={() => coluna.accessor && onSort(coluna.accessor)}
                        >
                            <div className="flex items-center">
                                {coluna.header}
                                {coluna.accessor && getSortIcon(coluna.accessor)}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dados.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                        onClick={() => onRowClick(item)}
                    >
                        {colunas.map((coluna, index) => (
                            <td key={index} className="py-3 px-4 text-gray-700">
                                {coluna.render ? coluna.render(item) : item[coluna.accessor]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GridDefault;