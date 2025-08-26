const TalentoDetalhes = ({ talento, onVoltarClick }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-4xl w-full mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{talento.nome}</h1>
          <p className="text-xl text-gray-500 mt-1">{talento.email}</p>
        </div>
        <button 
          onClick={onVoltarClick} 
          className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
        >
          &larr; Voltar para a Lista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-gray-700 text-lg">
        <p><span className="font-semibold">Cidade:</span> {talento.cidade || "Não informada"}</p>
        <p><span className="font-semibold">Telefone:</span> {talento.telefone || "Não informado"}</p>
        <p><span className="font-semibold">Aplicou na vaga de ID:</span> {talento.vaga_id}</p>
        <p><span className="font-semibold">Data da aplicação:</span> {new Date(talento.criado_em).toLocaleDateString()}</p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Sobre Mim</h2>
        <p className="text-gray-700 leading-relaxed">
          {talento.sobre_mim || "Não há informações sobre este talento."}
        </p>
      </div>

      {talento.experiencia_profissional && talento.experiencia_profissional.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiência Profissional</h2>
          <ul className="space-y-4">
            {talento.experiencia_profissional.map((exp, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-lg font-semibold text-gray-800">{exp.cargo}</p>
                <p className="text-gray-600">
                  <span className="font-medium">{exp.empresa}</span> | {exp.periodo}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {talento.formacao && talento.formacao.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Formação</h2>
          <ul className="space-y-4">
            {talento.formacao.map((form, index) => (
              <li key={index} className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-lg font-semibold text-gray-800">{form.curso}</p>
                <p className="text-gray-600">
                  <span className="font-medium">{form.instituicao}</span> | {form.periodo}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {talento.idiomas && talento.idiomas.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Idiomas</h2>
          <ul className="flex flex-wrap gap-4">
            {talento.idiomas.map((idioma, index) => (
              <li key={index} className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full font-medium shadow-sm">
                {idioma.idioma} ({idioma.nivel})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TalentoDetalhes;