// src/components/md-vagas/ListaDeVagas.jsx

const ListaDeVagas = ({ vagas, onVagaClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vagas.length > 0 ? (
        vagas.map(vaga => (
          <div
            key={vaga.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col"
          >
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900">{vaga.titulo_vaga}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="bg-gray-100 px-2.5 py-1 rounded-full">📍 {vaga.cidade}</span>
                <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">🏢 {vaga.modelo_trabalho}</span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3">{vaga.descricao}</p>
              <div>
                <strong className="font-medium text-gray-800">Principais Critérios:</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-600 space-y-1">
                  {Object.keys(vaga.criterios_de_analise).map((key) => (
                    <li key={key}>{key.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => onVagaClick(vaga)}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">Nenhuma vaga encontrada.</p>
      )}
    </div>
  );
};

export default ListaDeVagas;