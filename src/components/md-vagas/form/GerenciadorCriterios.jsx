import ItemCriterio from './ItemCriterio';

const GerenciadorCriterios = ({ criterios, setCriterios }) => {
  const handleCriterioChange = (index, e) => {
    const { name, value } = e.target;
    const novosCriterios = [...criterios];
    novosCriterios[index][name] = value;
    setCriterios(novosCriterios);
  };

  const handleColunaChange = (criterioIndex, colunaId) => {
    const novosCriterios = [...criterios];
    const criterio = novosCriterios[criterioIndex];
    const colunasAtuais = criterio.colunas || [];
    
    if (colunasAtuais.includes(colunaId)) {
      criterio.colunas = colunasAtuais.filter(c => c !== colunaId);
    } else {
      criterio.colunas = [...colunasAtuais, colunaId];
    }
    setCriterios(novosCriterios);
  };

  const addCriterio = () => {
    setCriterios([...criterios, { nome: '', descricao: '', peso: 0.5, colunas: ['sobre_mim', 'experiencia_profissional'] }]);
  };

  const removeCriterio = (index) => {
    const novosCriterios = criterios.filter((_, i) => i !== index);
    setCriterios(novosCriterios);
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Critérios de Análise</h2>
      <div className="space-y-4">
        {criterios.map((criterio, index) => (
          <ItemCriterio
            key={index}
            index={index}
            criterio={criterio}
            onCriterioChange={handleCriterioChange}
            onColunaChange={handleColunaChange}
            onRemove={removeCriterio}
          />
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={addCriterio}
          className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Adicionar critério"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GerenciadorCriterios;