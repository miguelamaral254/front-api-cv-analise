// src/components/md-vagas/VagaDetalhes.jsx

import RankingCandidatos from './RankingCandidatos';

const VagaDetalhes = ({ vaga, onVoltarClick, onTalentoClick }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-4xl w-full mx-auto">
      {/* ... todo o JSX da descrição da vaga continua o mesmo ... */}
      <div className="flex justify-between items-start mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{vaga.titulo_vaga}</h1>
          <p className="text-lg lg:text-xl text-gray-500 mt-1">
            Status: {vaga.finalizada_em ? "Finalizada" : "Em andamento"}
          </p>
        </div>
        <button 
          onClick={onVoltarClick} 
          className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium whitespace-nowrap"
        >
          &larr; Voltar para a Lista
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Gerais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-gray-700 text-lg">
          <p><strong className="font-semibold">Localização:</strong> {vaga.cidade}</p>
          <p className="flex items-center"><strong className="font-semibold mr-2">Modelo:</strong> 
              <span className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-full">
                  {vaga.modelo_trabalho}
              </span>
          </p>
          <p><strong className="font-semibold">Data de Criação:</strong> {new Date(vaga.criado_em).toLocaleDateString()}</p>
          {vaga.finalizada_em && (
            <p><strong className="font-semibold">Finalizada em:</strong> {new Date(vaga.finalizada_em).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Descrição da Vaga</h2>
        <p className="text-gray-700 leading-relaxed">{vaga.descricao}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Critérios de Análise</h2>
        <ul className="space-y-4">
          {Object.entries(vaga.criterios_de_analise).map(([key, value]) => (
            <li key={key} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
              <p className="text-lg font-semibold text-gray-800">{key.replace(/_/g, ' ')}</p>
              <p className="text-gray-600 mt-1">{value.descricao}</p>
            </li>
          ))}
        </ul>
      </div>

      <RankingCandidatos vagaId={vaga.id} onTalentoClick={onTalentoClick} />
      
    </div>
  );
};

export default VagaDetalhes;