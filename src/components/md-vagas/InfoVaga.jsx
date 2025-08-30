import DOMPurify from 'dompurify';

const InfoVaga = ({ vaga }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{vaga.titulo_vaga}</h2>
      <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mb-4">
        <span className="bg-gray-100 px-2.5 py-1 rounded-full">📍 {vaga.cidade}</span>
        <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">🏢 {vaga.modelo_trabalho}</span>
        <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full">🏷️ {vaga.nome_area}</span>
        {vaga.vaga_pcd && (
          <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full font-medium">♿ Vaga Afirmativa (PCD)</span>
        )}
      </div>
      
      <div className="border-t pt-4 mt-4 prose max-w-none">
        <h3 className="text-xl font-bold text-gray-800 not-prose">Descrição</h3>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vaga.descricao) }} />
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Pré-requisitos</h3>
        <ul className="space-y-4">
          {Object.entries(vaga.criterios_de_analise).map(([key]) => (
            <li key={key} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
              <p className="text-md font-semibold text-gray-800">{key.replace(/_/g, ' ')}</p>
            </li>
          ))}
        </ul>
      </div>

      {vaga.criterios_diferenciais_de_analise && Object.keys(vaga.criterios_diferenciais_de_analise).length > 0 && (
        <div className="border-t pt-4 mt-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Diferenciais</h3>
          <ul className="space-y-4">
            {Object.entries(vaga.criterios_diferenciais_de_analise).map(([key]) => (
              <li key={key} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                <p className="text-md font-semibold text-gray-800">{key.replace(/_/g, ' ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoVaga;
