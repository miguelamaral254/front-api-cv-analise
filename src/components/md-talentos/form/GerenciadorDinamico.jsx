const GerenciadorDinamico = ({ titulo, itens, setItens, campos, objetoInicial }) => {
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const novosItens = [...itens];
    novosItens[index][name] = value;
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{titulo}</h2>
      <div className="space-y-4">
        {itens.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md border relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campos.map(campo => (
                <div key={campo.name}>
                  <label htmlFor={`${campo.name}-${index}`} className="block text-sm font-medium text-gray-700">{campo.label}</label>
                  {campo.type === 'select' ? (
                    <select
                      id={`${campo.name}-${index}`}
                      name={campo.name}
                      value={item[campo.name] || ''}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 block w-full p-2 border rounded-md"
                    >
                      <option value="" disabled>Selecione...</option>
                      {campo.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={campo.type || 'text'}
                      id={`${campo.name}-${index}`}
                      name={campo.name}
                      value={item[campo.name] || ''}
                      onChange={(e) => handleItemChange(index, e)}
                      className="mt-1 block w-full p-2 border rounded-md"
                      placeholder={campo.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              aria-label={`Remover ${titulo}`}
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
        + Adicionar {titulo}
      </button>
    </div>
  );
};

export default GerenciadorDinamico;