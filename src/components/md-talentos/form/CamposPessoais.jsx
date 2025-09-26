import { useState, useEffect } from 'react';
import { IMaskInput } from 'react-imask';
import Select from 'react-select';
import { getEstados, getCidadesPorEstado } from '../../../services/ibge.service';
import GerenciadorDeficiencia from './GerenciadorDeficiencia';

const CamposPessoais = ({ formData, onInputChange, onSelectChange, deficienciaDetalhes, setDeficienciaDetalhes }) => {
  const [estadosOptions, setEstadosOptions] = useState([]);
  const [cidadesOptions, setCidadesOptions] = useState([]);
  const [isLoadingCidades, setIsLoadingCidades] = useState(false);

  const LIMITE_CARACTERES_SOBRE_MIM = 1000;

  useEffect(() => {
    getEstados().then(setEstadosOptions);
  }, []);

  useEffect(() => {
    if (formData.estado?.value) {
      setIsLoadingCidades(true);
      getCidadesPorEstado(formData.estado.value)
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

  const getCounterColor = (length) => {
    if (length >= LIMITE_CARACTERES_SOBRE_MIM) return 'text-red-600';
    if (length >= LIMITE_CARACTERES_SOBRE_MIM * 0.9) return 'text-yellow-600';
    return 'text-gray-500';
  };

  return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Seus Dados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Nome Completo*</label>
            <input type="text" name="nome" value={formData.nome} onChange={onInputChange} required className="w-full p-2 border rounded-md"/>
          </div>
          <div>
            <label className="block font-medium mb-1">Email*</label>
            <input type="email" name="email" value={formData.email} onChange={onInputChange} required className="w-full p-2 border rounded-md"/>
          </div>
          <div>
            <label className="block font-medium mb-1">Estado</label>
            <Select name="estado" options={estadosOptions} classNamePrefix="select" placeholder="Selecione o estado..." onChange={handleEstadoChange} value={formData.estado}/>
          </div>
          <div>
            <label className="block font-medium mb-1">Cidade</label>
            <Select name="cidade" options={cidadesOptions} classNamePrefix="select" placeholder="Selecione a cidade..." onChange={(option) => onSelectChange('cidade', option)} value={formData.cidade} isDisabled={!formData.estado || isLoadingCidades} isLoading={isLoadingCidades}/>
          </div>
          <div>
            <label className="block font-medium mb-1">Telefone</label>
            <IMaskInput mask="+{55} (00) 00000-0000" type="tel" name="telefone" value={formData.telefone} onAccept={(value) => onInputChange({ target: { name: 'telefone', value } })} placeholder="+55 (81) 99999-9999" className="w-full p-2 border rounded-md"/>
          </div>
          {/* --- NOVOS CAMPOS DE ENDEREÇO --- */}
          <div>
            <label className="block font-medium mb-1">CEP</label>
            <IMaskInput mask="00000-000" type="text" name="cep" value={formData.cep} onAccept={(value) => onInputChange({ target: { name: 'cep', value } })} placeholder="00000-000" className="w-full p-2 border rounded-md"/>
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Rua</label>
            <input type="text" name="rua" value={formData.rua} onChange={onInputChange} placeholder="Sua rua" className="w-full p-2 border rounded-md"/>
          </div>
          <div>
            <label className="block font-medium mb-1">Bairro</label>
            <input type="text" name="bairro" value={formData.bairro} onChange={onInputChange} placeholder="Seu bairro" className="w-full p-2 border rounded-md"/>
          </div>
          <div>
            <label className="block font-medium mb-1">Número</label>
            <input type="text" name="numero" value={formData.numero} onChange={onInputChange} placeholder="123" className="w-full p-2 border rounded-md"/>
          </div>
          <div>
            <label className="block font-medium mb-1">Complemento</label>
            <input type="text" name="complemento" value={formData.complemento} onChange={onInputChange} placeholder="Apto, Bloco, etc." className="w-full p-2 border rounded-md"/>
          </div>
          {/* --- FIM DOS NOVOS CAMPOS --- */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Sobre Mim*</label>
            <textarea name="sobre_mim" value={formData.sobre_mim} onChange={onInputChange} required rows="5" maxLength={LIMITE_CARACTERES_SOBRE_MIM} className="w-full p-2 border rounded-md"></textarea>
            <div className="text-right text-sm mt-1">
            <span className={getCounterColor(formData.sobre_mim?.length || 0)}>
              {formData.sobre_mim?.length || 0}/{LIMITE_CARACTERES_SOBRE_MIM}
            </span>
            </div>
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="deficiencia" checked={formData.deficiencia} onChange={onInputChange} className="h-5 w-5 rounded border-gray-300 text-secondary focus:ring-secondary"/>
              <span className="text-gray-700 font-medium">Me identifico como Pessoa com Deficiência (PCD)</span>
            </label>
            {formData.deficiencia && (
                <GerenciadorDeficiencia
                    itens={deficienciaDetalhes}
                    setItens={setDeficienciaDetalhes}
                />
            )}
          </div>
        </div>
      </div>
  );
};

export default CamposPessoais;
