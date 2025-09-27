const GridDefault = ({ dados, colunas, onRowClick, mensagemVazio }) => {
    if (!dados || dados.length === 0) {
        return <p className="text-center text-gray-600 py-10">{mensagemVazio}</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-secondary">
                <tr>
                    {colunas.map((coluna, index) => (
                        <th key={index} className="py-3 px-4 text-left font-semibold text-white">
                            {coluna.header}
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