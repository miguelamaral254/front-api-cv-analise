const ListaDeTalentos = ({ talentos, colunas, onTalentoClick, mensagemVazio }) => {
  if (!talentos || talentos.length === 0) {
    return <p className="text-center text-gray-600 py-10">{mensagemVazio}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            {colunas.map((coluna, index) => (
              <th key={index} className="py-3 px-4 text-left font-semibold text-gray-700">
                {coluna.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {talentos.map((talento) => (
            <tr
              key={talento.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onTalentoClick(talento)}
            >
              {colunas.map((coluna, index) => (
                <td key={index} className="py-3 px-4 text-gray-700">
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