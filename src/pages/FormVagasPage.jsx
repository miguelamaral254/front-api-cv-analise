import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVaga } from '../services/vagas.service';
import CamposGeraisVaga from '../components/md-vagas/form/CamposGeraisVaga';
import GerenciadorCriterios from '../components/md-vagas/form/GerenciadorCriterios';
import { useSwal } from '../hooks/useSwal';

const FormVagasPage = () => {
  const navigate = useNavigate();
  const { fireSuccess, fireError } = useSwal();
  const [formData, setFormData] = useState({
    titulo_vaga: '',
    descricao: '',
    cidade: '',
    modelo_trabalho: 'Híbrido',
    area_id: '',
    vaga_pcd: false,
  });

  const [criterios, setCriterios] = useState([
    { nome: '', descricao: '', peso: 0.5, colunas: ['sobre_mim', 'experiencia_profissional'] },
  ]);

  const [diferenciais, setDiferenciais] = useState([
    { nome: '', descricao: '', peso: 0.2, colunas: ['sobre_mim', 'experiencia_profissional'] },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption.value }));
  };

  const handleDescricaoChange = (html) => {
    setFormData(prev => ({ ...prev, descricao: html }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (criterios.some(c => !c.nome || !c.descricao || c.colunas.length === 0)) {
      fireError('Critérios Incompletos', 'Todos os critérios obrigatórios devem ter nome, descrição e pelo menos uma coluna de análise selecionada.');
      return;
    }
    setIsSubmitting(true);
    
    const formatarCriteriosParaApi = (listaCriterios) => {
        return listaCriterios
            .filter(c => c.nome && c.descricao)
            .reduce((acc, crit) => {
                acc[crit.nome.replace(/\s+/g, '_')] = {
                    descricao: crit.descricao,
                    peso: parseFloat(crit.peso),
                    colunas: crit.colunas,
                };
                return acc;
            }, {});
    };

    const criteriosParaApi = formatarCriteriosParaApi(criterios);
    const diferenciaisParaApi = formatarCriteriosParaApi(diferenciais);

    const payload = {
      ...formData,
      area_id: parseInt(formData.area_id),
      criterios_de_analise: criteriosParaApi,
      criterios_diferenciais_de_analise: diferenciaisParaApi,
    };

    try {
      await createVaga(payload);
      fireSuccess('Vaga Criada!', 'A vaga foi publicada com sucesso.')
        .then(() => {
          navigate('/vagas');
        });
    } catch (err) {
      fireError('Erro na Criação', 'Ocorreu um erro ao criar a vaga. Verifique os campos e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Criar Nova Vaga</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8">
        <CamposGeraisVaga
          formData={formData}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onDescricaoChange={handleDescricaoChange}
        />
        
        <GerenciadorCriterios
          title="Critérios Obrigatórios"
          criterios={criterios}
          setCriterios={setCriterios}
        />

        <GerenciadorCriterios
          title="Critérios Diferenciais (Opcional)"
          criterios={diferenciais}
          setCriterios={setDiferenciais}
        />
        
        <div className="text-right border-t pt-6">
          <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
            {isSubmitting ? 'Criando Vaga...' : 'Criar Vaga'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormVagasPage;

