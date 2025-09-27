// src/components/md-talentos/ListaDeTalentos.jsx

const ListaDeTalentos = ({ talentos, colunas, onTalentoClick, mensagemVazio, onSort, sortConfig }) => {
  if (!talentos || talentos.length === 0) {
    return <p className="text-center text-gray-600 py-10">{mensagemVazio}</p>;
  }

  // Função para renderizar o ícone de ordenação
  const getSortIcon = (columnKey) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      // Retorna um ícone neutro ou nada se a coluna não está ativa
      // Para o ícone neutro, você pode usar um de react-icons se preferir
      return <span className="ml-1 text-gray-400">↕</span>;
    }
    if (sortConfig.direction === 'ascending') {
      return <span className="ml-1">▲</span>; // Seta para cima
    }
    return <span className="ml-1">▼</span>; // Seta para baixo
  };

  return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-secondary">
          <tr>
            {colunas.map((coluna) => (
                <th
                    key={coluna.header}
                    className="py-3 px-4 text-left font-semibold text-white select-none"
                    // Adiciona o onClick apenas se a coluna tiver um 'accessor' (for ordenável)
                    {...(coluna.accessor && {
                      onClick: () => onSort(coluna.accessor),
                      className: "py-3 px-4 text-left font-semibold text-white select-none cursor-pointer hover:bg-blue-800 transition-colors"
                    })}
                >
                  <div className="flex items-center">
                    {coluna.header}
                    {/* Exibe o ícone apenas se a coluna for ordenável */}
                    {coluna.accessor && getSortIcon(coluna.accessor)}
                  </div>
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {talentos.map((talento, index) => (
              <tr
                  key={talento.id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => onTalentoClick(talento)}
              >
                {colunas.map((coluna) => (
                    <td key={coluna.header} className="py-3 px-4 text-gray-700">
                      {coluna.render ? coluna.render(talento, index) : talento[coluna.accessor]}
                    </td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default ListaDeTalentos;