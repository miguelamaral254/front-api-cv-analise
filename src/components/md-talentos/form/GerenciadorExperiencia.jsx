const GerenciadorExperiencia = ({ itens, setItens }) => {
  const handleItemChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const novosItens = [...itens];
    
    if (type === 'checkbox') {
      novosItens[index][name] = checked;
      if (checked) {
        novosItens[index]['data_fim'] = '';
      }
    } else {
      novosItens[index][name] = value;
    }
    
    setItens(novosItens);
  };

  const addItem = () => {
    setItens([...itens, { cargo: '', empresa: '', descricao: '', data_inicio: '', data_fim: '', emprego_atual: false }]);
  };

  const removeItem = (index) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiência Profissional</h2>
      <div className="space-y-4">
        {itens.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md border relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Cargo</label>
                <input type="text" name="cargo" value={item.cargo} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Empresa</label>
                <input type="text" name="empresa" value={item.empresa} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descrição das Atividades</label>
                <textarea name="descricao" value={item.descricao} onChange={(e) => handleItemChange(index, e)} rows="3" className="mt-1 block w-full p-2 border rounded-md"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Início</label>
                <input type="month" name="data_inicio" value={item.data_inicio} onChange={(e) => handleItemChange(index, e)} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data de Fim</label>
                <input type="month" name="data_fim" value={item.data_fim} onChange={(e) => handleItemChange(index, e)} disabled={item.emprego_atual} className="mt-1 block w-full p-2 border rounded-md disabled:bg-gray-200" />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <input type="checkbox" name="emprego_atual" checked={item.emprego_atual} onChange={(e) => handleItemChange(index, e)} className="h-4 w-4 rounded border-gray-300" />
                <label className="text-sm font-medium text-gray-700">Emprego atual</label>
              </div>
            </div>
            <button type="button" onClick={() => removeItem(index)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addItem} className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
        + Adicionar Experiência
      </button>
    </div>
  );
};

export default GerenciadorExperiencia;