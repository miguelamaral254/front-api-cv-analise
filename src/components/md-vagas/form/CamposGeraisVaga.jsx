import { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
// REMOVA a importação estática do JSON de áreas
// import areas from '../../../data/areas.json';
import { getAreas } from '../../../services/areas.service'; // IMPORTE a função da API
import cidades from '../../../data/cidades.json';
import TextEditor from '../../global/TextEditor';

const CamposGeraisVaga = ({ formData, onInputChange, onSelectChange, onDescricaoChange }) => {
  const cidadeOptions = useMemo(() => cidades.sort().map(c => ({ value: c, label: c })), []);
  const modeloOptions = [
    { value: 'Híbrido', label: 'Híbrido' },
    { value: 'Remoto', label: 'Remoto' },
    { value: 'Presencial', label: 'Presencial' },
  ];

  // Estados para gerenciar as opções de área, carregamento e erro
  const [areaOptions, setAreaOptions] = useState([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(true);
  const [errorAreas, setErrorAreas] = useState(null);

  // useEffect para buscar os dados da API quando o componente for montado
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setIsLoadingAreas(true);
        const areasData = await getAreas();
        // Formata os dados para o formato que o react-select espera
        const formattedAreas = areasData.map(a => ({ value: a.id, label: a.nome }));
        setAreaOptions(formattedAreas);
        setErrorAreas(null); // Limpa qualquer erro anterior
      } catch (error) {
        console.error("Falha ao carregar áreas:", error);
        setErrorAreas("Não foi possível carregar as áreas.");
      } finally {
        setIsLoadingAreas(false);
      }
    };

    fetchAreas();
  }, []); // O array de dependências vazio [] garante que isso rode apenas uma vez

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
                placeholder={isLoadingAreas ? "Carregando áreas..." : "Selecione..."}
                onChange={(option) => onSelectChange('area_id', option)}
                value={areaOptions.find(opt => opt.value === formData.area_id)}
                required
                isLoading={isLoadingAreas}
                isDisabled={isLoadingAreas || !!errorAreas} // Desabilita se estiver carregando ou se houver erro
            />
            {errorAreas && <p className="text-red-600 text-sm mt-1">{errorAreas}</p>}
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