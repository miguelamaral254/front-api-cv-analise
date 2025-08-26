// src/pages/FormVagasPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVaga } from '../services/vagas.service';
import CamposGeraisVaga from '../components/md-vagas/form/CamposGeraisVaga';
import GerenciadorCriterios from '../components/md-vagas/form/GerenciadorCriterios';

const FormVagasPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo_vaga: '',
    descricao: '',
    cidade: '',
    modelo_trabalho: 'Híbrido',
    area_id: '',
  });

  const [criterios, setCriterios] = useState([
    { nome: '', descricao: '', peso: 0.5, colunas: ['sobre_mim', 'experiencia_profissional'] },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      setError('Todos os critérios devem ter nome, descrição e pelo menos uma coluna de análise selecionada.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    const criteriosParaApi = criterios.reduce((acc, crit) => {
      acc[crit.nome.replace(/\s+/g, '_')] = {
        descricao: crit.descricao,
        peso: parseFloat(crit.peso),
        colunas: crit.colunas,
      };
      return acc;
    }, {});

    const payload = {
      ...formData,
      area_id: parseInt(formData.area_id),
      criterios_de_analise: criteriosParaApi,
    };

    try {
      await createVaga(payload);
      alert('Vaga criada com sucesso!');
      navigate('/vagas');
    } catch (err) {
      setError('Ocorreu um erro ao criar a vaga. Verifique os campos e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Criar Nova Vaga</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <CamposGeraisVaga
          formData={formData}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onDescricaoChange={handleDescricaoChange}
        />
        
        <GerenciadorCriterios
          criterios={criterios}
          setCriterios={setCriterios}
        />
        
        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
        
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