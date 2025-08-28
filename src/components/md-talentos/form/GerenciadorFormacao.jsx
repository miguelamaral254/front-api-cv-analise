const GerenciadorFormacao = ({ itens, setItens, objetoInicial }) => {
  const handleItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const novosItens = [...itens];
    novosItens[index][name] = type === 'checkbox' ? checked : value;

    if (name === 'cursando' && checked) {
        novosItens[index]['data_fim'] = '';
    }

    setItens(novosItens);
  };

  const addItem = () => {
    setItens([...itens, { ...objetoInicial }]);
  };

  const removeItem = (index) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Formação Acadêmica</h2>
      <div className="space-y-4">
        {itens.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md border relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Curso</label>
                <input type="text" name="curso" value={item.curso} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instituição</label>
                <input type="text" name="instituicao" value={item.instituicao} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Início</label>
                <input type="date" name="data_inicio" value={item.data_inicio} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Fim</label>
                <input type="date" name="data_fim" value={item.data_fim} onChange={(e) => handleItemChange(index, e)} disabled={item.cursando} className="mt-1 block w-full p-2 border rounded-md disabled:bg-gray-200" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="cursando" id={`cursando-${index}`} checked={item.cursando || false} onChange={(e) => handleItemChange(index, e)} className="h-4 w-4 rounded border-gray-300"/>
                    <label htmlFor={`cursando-${index}`} className="text-sm font-medium text-gray-700">Ainda Cursando</label>
                </div>
                {item.cursando && (
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Período/Semestre Atual</label>
                        <input type="number" name="periodo_atual" value={item.periodo_atual} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" placeholder="Ex: 5" />
                     </div>
                )}
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
      >
        + Adicionar Formação Acadêmica
      </button>
    </div>
  );
};

export default GerenciadorFormacao;