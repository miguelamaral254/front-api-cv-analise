import { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';
import Select from 'react-select';
import { getEstados, getCidadesPorEstado } from '../../../services/ibge.service';

const CamposPessoais = ({ formData, onInputChange, onSelectChange }) => {
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);

  useEffect(() => {
    getEstados().then(setEstadosOptions);
  }, []);

  useEffect(() => {
    if (formData.estado) {
      setIsLoadingCidades(true);
      getCidadesPorEstado(formData.estado)
        .then(setCidadesOptions)
        .finally(() => setIsLoadingCidades(false));
    } else {
      setCidadesOptions([]);
    }
  }, [formData.estado]);

  const handleEstadoChange = (option) => {
    onSelectChange('cidade', null);
    onSelectChange('estado', option);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Seus Dados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Nome Completo*</label>
          <input type="text" name="nome" value={formData.nome} onChange={onInputChange} required className="w-full p-2 border rounded-md"/>
        </div>
        <div>
          <label className="block font-medium">Email*</label>
          <input type="email" name="email" value={formData.email} onChange={onInputChange} required className="w-full p-2 border rounded-md"/>
        </div>
        <div>
          <label className="block font-medium">Estado</label>
           <Select
            name="estado"
            options={estadosOptions}
            classNamePrefix="select"
            placeholder="Selecione o estado..."
            onChange={handleEstadoChange}
            value={estadosOptions.find(opt => opt.value === formData.estado)}
          />
        </div>
        <div>
          <label className="block font-medium">Cidade</label>
           <Select
            name="cidade"
            options={cidadesOptions}
            classNamePrefix="select"
            placeholder="Selecione a cidade..."
            onChange={(option) => onSelectChange('cidade', option)}
            value={cidadesOptions.find(opt => opt.value === formData.cidade) || null}
            isDisabled={!formData.estado || isLoadingCidades}
            isLoading={isLoadingCidades}
          />
        </div>
        <div>
          <label className="block font-medium">Telefone</label>
          <IMaskInput
            mask="+{55} (00) 00000-0000"
            type="tel"
            name="telefone"
            value={formData.telefone}
            onAccept={(value) => onInputChange({ target: { name: 'telefone', value } })}
            placeholder="+55 (81) 99999-9999"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">Sobre Mim*</label>
          <textarea name="sobre_mim" value={formData.sobre_mim} onChange={onInputChange} required rows="4" className="w-full p-2 border rounded-md"></textarea>
        </div>
      </div>
    </div>
  );
};

export default CamposPessoais;