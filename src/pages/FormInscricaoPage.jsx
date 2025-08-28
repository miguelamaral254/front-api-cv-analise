import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVagaById } from '../services/vagas.service';
import { inscreverTalento } from '../services/talentos.service';
import GerenciadorDinamico from '../components/md-talentos/form/GerenciadorDinamico';
import GerenciadorExperiencia from '../components/md-talentos/form/GerenciadorExperiencia';
import GerenciadorFormacao from '../components/md-talentos/form/GerenciadorFormacao';
import ItemCriterioResposta from '../components/md-talentos/form/ItemCriterioResposta';
import InfoVaga from '../components/md-vagas/InfoVaga';
import CamposPessoais from '../components/md-talentos/form/CamposPessoais';
import { useSwal } from '../hooks/useSwal';

const FormInscricaoPage = () => {
  const { vagaId } = useParams();
  const navigate = useNavigate();
  const { fireSuccess, fireError } = useSwal();

  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: '', email: '', estado: '', cidade: '', telefone: '', sobre_mim: '', aceita_termos: false,
  });
  const [experiencias, setExperiencias] = useState([]);
  const [formacoes, setFormacoes] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [respostas, setRespostas] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVaga = async () => {
      try {
        const data = await getVagaById(vagaId);
        setVaga(data);
        const respostasIniciais = {};
        Object.keys(data.criterios_de_analise).forEach(key => {
          respostasIniciais[key] = "Não possui o critério";
        });
        setRespostas(respostasIniciais);
      } catch (err) {
        setError("Vaga não encontrada.");
      } finally {
        setLoading(false);
      }
    };
    fetchVaga();
  }, [vagaId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption ? selectedOption.value : '' }));
  };

  const handleRespostaChange = (key, value) => {
    setRespostas(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceita_termos) {
      setError("Você precisa aceitar os termos para continuar.");
      return;
    }
    if (vaga && Object.keys(vaga.criterios_de_analise).some(key => respostas[key] === '')) {
      setError("Por favor, descreva sua experiência para os critérios que você marcou 'Sim'.");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    
    const { estado, ...restFormData } = formData;

    const experienciasFormatadas = experiencias.map(exp => ({
        cargo: exp.cargo,
        empresa: exp.empresa,
        descricao: exp.descricao,
        periodo: `${exp.data_inicio} - ${exp.emprego_atual ? 'Presente' : exp.data_fim}`
    }));

    const payload = {
      ...restFormData,
      vaga_id: parseInt(vagaId),
      experiencia_profissional: experienciasFormatadas,
      formacao: formacoes,
      idiomas: idiomas,
      respostas_criterios: respostas,
    };

    try {
      await inscreverTalento(payload);
      fireSuccess('Inscrição Realizada!', 'Sua candidatura foi enviada com sucesso.')
        .then((result) => {
          if (result.isConfirmed) {
            navigate(`/vagas`);
          }
        });
    } catch (err) {
      fireError("Ocorreu um erro!", "Não foi possível enviar sua inscrição. Por favor, tente novamente.");
      setError("Ocorreu um erro ao realizar a inscrição. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nivelOptions = [
    { value: 'A1 - Iniciante', label: 'A1 - Iniciante' },
    { value: 'A2 - Básico', label: 'A2 - Básico' },
    { value: 'B1 - Intermediário', label: 'B1 - Intermediário' },
    { value: 'B2 - Usuário Independente', label: 'B2 - Usuário Independente' },
    { value: 'C1 - Avançado', label: 'C1 - Avançado' },
    { value: 'C2 - Proficiente/Nativo', label: 'C2 - Proficiente/Nativo' },
  ];

  const objetoInicialFormacao = {
    curso: '',
    instituicao: '',
    data_inicio: '',
    data_fim: '',
    cursando: false,
    periodo_atual: '',
  };

  if (loading) return <div className="text-center mt-8">Carregando informações da vaga...</div>;
  if (error && !vaga) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="mb-8 lg:mb-0">
          {vaga && <InfoVaga vaga={vaga} />}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Formulário de Inscrição</h1>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8">
            
            <CamposPessoais 
              formData={formData} 
              onInputChange={handleInputChange} 
              onSelectChange={handleSelectChange}
            />

            <GerenciadorExperiencia itens={experiencias} setItens={setExperiencias} />
            
            <GerenciadorFormacao 
                itens={formacoes} 
                setItens={setFormacoes} 
                objetoInicial={objetoInicialFormacao} 
            />
            
            <GerenciadorDinamico 
                titulo="Idiomas" 
                itens={idiomas} 
                setItens={setIdiomas} 
                campos={[
                    {name: 'idioma', label: 'Idioma'}, 
                    {name: 'nivel', label: 'Nível', type: 'select', options: nivelOptions}
                ]} 
                objetoInicial={{idioma: '', nivel: ''}} 
            />

            <div className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Responda aos pré-requisitos da Vaga</h2>
              <div className="space-y-4">
                  {vaga && Object.entries(vaga.criterios_de_analise).map(([key, criterio]) => (
                      <ItemCriterioResposta key={key} criterioKey={key} criterio={criterio} resposta={respostas[key]} onRespostaChange={handleRespostaChange} />
                  ))}
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start">
                <input type="checkbox" id="aceita_termos" name="aceita_termos" checked={formData.aceita_termos} onChange={handleInputChange} className="h-4 w-4 mt-1 rounded border-gray-300"/>
                <label htmlFor="aceita_termos" className="ml-2 block text-sm text-gray-900">Eu aceito os termos e confirmo que as informações são verdadeiras.*</label>
              </div>
              {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
              <div className="text-right">
                <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                  {isSubmitting ? 'Enviando...' : 'Enviar Inscrição'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormInscricaoPage;