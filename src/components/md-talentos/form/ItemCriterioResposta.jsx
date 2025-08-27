// src/components/md-talentos/form/ItemCriterioResposta.jsx

const ItemCriterioResposta = ({ criterioKey, criterio, resposta, onRespostaChange }) => {
  const temResposta = resposta !== undefined && resposta !== "Não possui o critério";

  const handleOptionChange = (possuiCriterio) => {
    if (possuiCriterio) {
      // Se clicar 'Sim', limpa a resposta padrão para o usuário escrever
      onRespostaChange(criterioKey, '');
    } else {
      // Se clicar 'Não', define a resposta padrão
      onRespostaChange(criterioKey, "Não possui o critério");
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0">
          <p className="font-semibold text-gray-800">{criterio.descricao}</p>
          <p className="text-sm text-gray-500">Você possui este requisito/experiência?</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleOptionChange(true)}
            className={`px-4 py-1 rounded-full text-sm font-semibold ${temResposta ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Sim
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange(false)}
            className={`px-4 py-1 rounded-full text-sm font-semibold ${!temResposta ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Não
          </button>
        </div>
      </div>

      {temResposta && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Por favor, descreva sua experiência com {criterioKey.replace(/_/g, ' ')}:
          </label>
          <textarea
            value={resposta}
            onChange={(e) => onRespostaChange(criterioKey, e.target.value)}
            rows="3"
            required
            className="w-full p-2 border rounded-md"
            placeholder="Detalhe sua experiência aqui..."
          />
        </div>
      )}
    </div>
  );
};

export default ItemCriterioResposta;