const ItemCriterio = ({ index, criterio, onCriterioChange, onColunaChange, onRemove }) => {
  const colunasDisponiveis = [
    { id: 'sobre_mim', label: 'Sobre Mim' },
    { id: 'experiencia_profissional', label: 'Experiência' },
    { id: 'formacao', label: 'Formação' },
    { id: 'idiomas', label: 'Idiomas' },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-11">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Critério (ex: Experiência Técnica)"
            value={criterio.nome}
            onChange={(e) => onCriterioChange(index, e)}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="md:col-span-1 flex items-center justify-end">
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
            aria-label="Remover critério"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <textarea
          name="descricao"
          placeholder="Descrição do que será avaliado pela IA"
          value={criterio.descricao}
          onChange={(e) => onCriterioChange(index, e)}
          required
          rows="2"
          className="md:col-span-12 p-2 border rounded-md"
        />
        <div className="md:col-span-12">
          <label className="block text-sm font-medium text-gray-600">Peso: {(criterio.peso * 100).toFixed(0)}%</label>
          <input
            type="range"
            name="peso"
            min="0.1"
            max="1"
            step="0.1"
            value={criterio.peso}
            onChange={(e) => onCriterioChange(index, e)}
            required
            className="w-full"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Analisar nos campos do currículo:</label>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {colunasDisponiveis.map(coluna => (
            <label key={coluna.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={criterio.colunas.includes(coluna.id)}
                onChange={() => onColunaChange(index, coluna.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{coluna.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCriterio;