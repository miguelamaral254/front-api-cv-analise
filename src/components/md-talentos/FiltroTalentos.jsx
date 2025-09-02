import Select from 'react-select';
import { useMemo } from 'react';
import { MdClear } from 'react-icons/md';

const FiltroTalentos = ({ 
    filtros, 
    onFiltroChange, 
    cidades, 
    areas, 
    onLimparFiltros,
    hideVagaIdFilter = false,
    showStatusFilter = false
}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFiltroChange(name, value);
  };

  const handleSelectChange = (name, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onFiltroChange(name, values);
  };
  
  const cidadeOptions = useMemo(() => cidades.map(c => ({ value: c, label: c })), [cidades]);
  const areaOptions = useMemo(() => areas.map(a => ({ value: a, label: a })), [areas]);

  // Opções para o novo Select de Status
  const statusOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'ativos', label: 'Ativos' },
    { value: 'reprovados', label: 'Reprovados' }
  ];

  const isFiltroAtivo = useMemo(() => {
    return filtros.termo || 
           (!hideVagaIdFilter && filtros.vaga_id) || 
           filtros.cidades.length > 0 || 
           filtros.areaNomes.length > 0 || 
           (showStatusFilter && filtros.status !== 'todos');
  }, [filtros, hideVagaIdFilter, showStatusFilter]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        
        <div>
          <label htmlFor="termo" className="block text-sm font-medium text-gray-600 mb-1">Nome ou Email</label>
          <input
            id="termo"
            type="text"
            name="termo"
            value={filtros.termo}
            onChange={handleInputChange}
            placeholder="Buscar..."
            className="p-2 border rounded-lg w-full h-[38px]"
          />
        </div>

        {!hideVagaIdFilter && (
          <div>
            <label htmlFor="vaga_id" className="block text-sm font-medium text-gray-600 mb-1">ID da Vaga</label>
            <input
              id="vaga_id"
              type="number"
              name="vaga_id"
              value={filtros.vaga_id || ''}
              onChange={handleInputChange}
              placeholder="Buscar..."
              className="p-2 border rounded-lg w-full h-[38px]"
            />
          </div>
        )}

        <div>
          <label htmlFor="cidades" className="block text-sm font-medium text-gray-600 mb-1">Cidades</label>
          <Select
            inputId="cidades"
            isMulti
            name="cidades"
            options={cidadeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Selecione..."
            onChange={(options) => handleSelectChange('cidades', options)}
            value={cidadeOptions.filter(opt => filtros.cidades.includes(opt.value))}
          />
        </div>
        
        <div>
          <label htmlFor="areaNomes" className="block text-sm font-medium text-gray-600 mb-1">Áreas</label>
          <Select
            inputId="areaNomes"
            isMulti
            name="areaNomes"
            options={areaOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Selecione..."
            onChange={(options) => handleSelectChange('areaNomes', options)}
            value={areaOptions.filter(opt => filtros.areaNomes.includes(opt.value))}
          />
        </div>
        
        {showStatusFilter && (
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                {/* ALTERAÇÃO AQUI: Trocado <select> por <Select> */}
                <Select
                    inputId="status"
                    name="status"
                    options={statusOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Selecione..."
                    onChange={(option) => onFiltroChange('status', option.value)}
                    value={statusOptions.find(opt => opt.value === filtros.status)}
                />
            </div>
        )}
        
        <div className="h-[38px]">
          {isFiltroAtivo && (
            <button
              onClick={onLimparFiltros}
              className="flex items-center justify-center gap-1.5 bg-gray-200 text-gray-600 font-semibold px-3 py-1.5 rounded-lg h-full w-full hover:bg-gray-300 transition-colors text-sm"
              aria-label="Limpar filtros"
            >
              <MdClear />
              Limpar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltroTalentos;