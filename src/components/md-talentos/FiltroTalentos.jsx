import Select from 'react-select';
import { useMemo } from 'react';

const FiltroTalentos = ({ filtros, onFiltroChange, cidades }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFiltroChange(name, value);
  };

  const handleSelectChange = (name, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onFiltroChange(name, values);
  };
  
  const cidadeOptions = useMemo(() => cidades.map(c => ({ value: c, label: c })), [cidades]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div className="lg:col-span-2">
            <input
                type="text"
                name="termo"
                value={filtros.termo}
                onChange={handleInputChange}
                placeholder="Buscar por nome ou email do talento..."
                className="p-2 border rounded-lg w-full h-[42px]"
            />
        </div>
        <Select
          isMulti
          name="cidades"
          options={cidadeOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Filtrar por cidades..."
          onChange={(options) => handleSelectChange('cidades', options)}
          value={cidadeOptions.filter(opt => filtros.cidades.includes(opt.value))}
        />
      </div>
    </div>
  );
};

export default FiltroTalentos;