import { useMemo } from 'react';
import Select from 'react-select';
import areas from '../../../data/areas.json';
import cidades from '../../../data/cidades.json';
import TextEditor from '../../global/TextEditor';

const CamposGeraisVaga = ({ formData, onInputChange, onSelectChange, onDescricaoChange }) => {
  const cidadeOptions = useMemo(() => cidades.sort().map(c => ({ value: c, label: c })), []);
  const areaOptions = useMemo(() => areas.map(a => ({ value: a.id, label: a.nome })), []);
  const modeloOptions = [
    { value: 'Híbrido', label: 'Híbrido' },
    { value: 'Remoto', label: 'Remoto' },
    { value: 'Presencial', label: 'Presencial' },
  ];

  return (
    <>
      <div>
        <label htmlFor="titulo_vaga" className="block text-lg font-semibold text-gray-700">Título da Vaga</label>
        <input type="text" id="titulo_vaga" name="titulo_vaga" value={formData.titulo_vaga} onChange={onInputChange} required className="mt-1 block w-full p-2 border rounded-md"/>
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Descrição</label>
        <TextEditor
          value={formData.descricao}
          onChange={onDescricaoChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="cidade" className="block text-lg font-semibold text-gray-700 mb-1">Cidade</label>
          <Select
            name="cidade"
            options={cidadeOptions}
            classNamePrefix="select"
            placeholder="Selecione..."
            onChange={(option) => onSelectChange('cidade', option)}
            value={cidadeOptions.find(opt => opt.value === formData.cidade)}
            required
          />
        </div>
        <div>
          <label htmlFor="modelo_trabalho" className="block text-lg font-semibold text-gray-700 mb-1">Modelo</label>
          <Select
            name="modelo_trabalho"
            options={modeloOptions}
            classNamePrefix="select"
            onChange={(option) => onSelectChange('modelo_trabalho', option)}
            value={modeloOptions.find(opt => opt.value === formData.modelo_trabalho)}
            required
          />
        </div>
        <div>
          <label htmlFor="area_id" className="block text-lg font-semibold text-gray-700 mb-1">Área</label>
          <Select
            name="area_id"
            options={areaOptions}
            classNamePrefix="select"
            placeholder="Selecione..."
            onChange={(option) => onSelectChange('area_id', option)}
            value={areaOptions.find(opt => opt.value === formData.area_id)}
            required
          />
        </div>
      </div>
      
      <div className="mt-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="vaga_pcd"
            checked={formData.vaga_pcd}
            onChange={onInputChange}
            className="h-5 w-5 rounded border-gray-300 text-secondary focus:ring-secondary"
          />
          <span className="text-gray-700 font-medium">Vaga afirmativa para Pessoas com Deficiência (PCD)</span>
        </label>
      </div>
    </>
  );
};

export default CamposGeraisVaga;
