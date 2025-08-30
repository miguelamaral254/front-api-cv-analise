const GerenciadorDeficiencia = ({ itens, setItens }) => {

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const novosItens = [...itens];
    novosItens[index][name] = value;
    setItens(novosItens);
  };

  const addItem = () => {
    setItens([...itens, { tipo: '', descricao: '', cid: '' }]);
  };

  const removeItem = (index) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border space-y-4">
      <h3 className="font-semibold text-gray-700">Detalhes da Deficiência</h3>
      {itens.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-md border relative space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de deficiência</label>
              <input 
                type="text" 
                name="tipo" 
                value={item.tipo} 
                onChange={(e) => handleItemChange(index, e)} 
                className="mt-1 block w-full p-2 border rounded-md" 
                placeholder="Ex: Visual, Auditiva, Motora..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CID (Opcional)</label>
              <input 
                type="text" 
                name="cid" 
                value={item.cid} 
                onChange={(e) => handleItemChange(index, e)} 
                className="mt-1 block w-full p-2 border rounded-md" 
                placeholder="Ex: H54.1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Necessidades de adaptação</label>
            <textarea 
              name="descricao" 
              value={item.descricao} 
              onChange={(e) => handleItemChange(index, e)} 
              rows="3" 
              className="mt-1 block w-full p-2 border rounded-md" 
              placeholder="Ex: Necessito de leitor de tela, rampas de acesso..."
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            aria-label="Remover Detalhe"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300"
      >
        + Adicionar outro detalhe
      </button>
    </div>
  );
};

export default GerenciadorDeficiencia;
