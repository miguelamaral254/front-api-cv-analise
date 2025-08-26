import Select from 'react-select';
import { useMemo } from 'react';
import areas from '../../data/areas.json';

const Filtro = ({ filtros, onFiltroChange, cidades }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFiltroChange(name, value);
  };

  const handleSelectChange = (name, selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onFiltroChange(name, values);
  };
  
  const cidadeOptions = useMemo(() => cidades.map(c => ({ value: c, label: c })), [cidades]);
  const areaOptions = useMemo(() => areas.map(a => ({ value: a.nome, label: a.nome })), []);
  const modeloOptions = [
    { value: 'Remoto', label: 'Remoto' },
    { value: 'Híbrido', label: 'Híbrido' },
    { value: 'Presencial', label: 'Presencial' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        <input
          type="text"
          name="termo"
          value={filtros.termo}
          onChange={handleInputChange}
          placeholder="Buscar por título..."
          className="p-2 border rounded-lg w-full h-[42px]"
        />
        <Select
          isMulti
          name="cidades"
          options={cidadeOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Cidades..."
          onChange={(options) => handleSelectChange('cidades', options)}
          value={cidadeOptions.filter(opt => filtros.cidades.includes(opt.value))}
        />
        <Select
          isMulti
          name="modelos"
          options={modeloOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Modelos de trabalho..."
          onChange={(options) => handleSelectChange('modelos', options)}
          value={modeloOptions.filter(opt => filtros.modelos.includes(opt.value))}
        />
        <Select
          isMulti
          name="areaNomes"
          options={areaOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Áreas..."
          onChange={(options) => handleSelectChange('areaNomes', options)}
          value={areaOptions.filter(opt => filtros.areaNomes.includes(opt.value))}
        />
        <select
          name="ordenacao"
          value={filtros.ordenacao}
          onChange={handleInputChange}
          className="p-2 border rounded-lg w-full h-[42px] bg-white"
        >
          <option value="recentes">Mais recentes</option>
          <option value="antigas">Mais antigas</option>
        </select>
      </div>
    </div>
  );
};

export default Filtro;