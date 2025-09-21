import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVagaById } from '../services/vagas.service';
import { inscreverTalento } from '../services/talentos.service';
import { getIdiomas } from '../services/idiomas.service';
import GerenciadorDinamico from '../components/md-talentos/form/GerenciadorDinamico';
import GerenciadorExperiencia from '../components/md-talentos/form/GerenciadorExperiencia';
import GerenciadorFormacao from '../components/md-talentos/form/GerenciadorFormacao';
import ItemCriterioResposta from '../components/md-talentos/form/ItemCriterioResposta';
import CamposPessoais from '../components/md-talentos/form/CamposPessoais';
import { useSwal } from '../hooks/useSwal';
import InfoVaga from '../components/md-vagas/InfoVaga';
import * as FaIcons from 'react-icons/fa';
import socialData from '../data/socials.json';
import FormInscricaoPageSkeleton from '../components/md-vagas/FormInscricaoPageSkeleton';

const FormInscricaoPage = () => {
  const { vagaId } = useParams();
  const navigate = useNavigate();
  const { fireSuccess, fireError } = useSwal();

  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [languageOptions, setLanguageOptions] = useState([]);

  const [formData, setFormData] = useState({
    nome: '', email: '', estado: null, cidade: null, telefone: '', sobre_mim: '',
    deficiencia: false,
    aceita_termos: false,
    confirmar_dados_verdadeiros: false,
  });
  const [experiencias, setExperiencias] = useState([]);
  const [formacoes, setFormacoes] = useState([]);
  const [idiomas, setIdiomas] = useState([]);
  const [redesSociais, setRedesSociais] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [deficienciaDetalhes, setDeficienciaDetalhes] = useState([]);
  const [respostasCriterios, setRespostasCriterios] = useState({});
  const [respostasDiferenciais, setRespostasDiferenciais] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const socialOptions = socialData.map(social => {
    const IconComponent = FaIcons[social.icon];
    return {
      value: social.name,
      label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconComponent style={{ marginRight: '8px' }} />
            {social.name}
          </div>
      )
    };
  });

  useEffect(() => {
    const fetchDadosIniciais = async () => {
      try {
        const vagaData = await getVagaById(vagaId);
        setVaga(vagaData);

        const initRespostas = (criteriosObj) => {
          if (!criteriosObj) return {};
          return Object.keys(criteriosObj).reduce((acc, key) => {
            acc[key] = "Não possui o critério";
            return acc;
          }, {});
        };

        setRespostasCriterios(initRespostas(vagaData.criterios_de_analise));
        setRespostasDiferenciais(initRespostas(vagaData.criterios_diferenciais_de_analise));

        const idiomasData = await getIdiomas();
        setLanguageOptions(idiomasData);
      } catch (err) {
        console.log(err)
        setError("Vaga não encontrada ou erro de rede.");
      } finally {
        setLoading(false);
      }
    };
    fetchDadosIniciais();
  }, [vagaId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormData(prev => ({ ...prev, [name]: selectedOption }));
  };

  const handleRespostaChange = (key, value, isDiferencial = false) => {
    const setRespostas = isDiferencial ? setRespostasDiferenciais : setRespostasCriterios;
    setRespostas(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.aceita_termos || !formData.confirmar_dados_verdadeiros) {
      fireError("Atenção", "Você precisa aceitar os termos e confirmar a veracidade dos dados para continuar.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const experienciasFormatadas = experiencias.map(exp => ({
      ...exp,
      periodo: `${exp.data_inicio} - ${exp.emprego_atual ? 'Presente' : exp.data_fim}`
    }));

    const redesSociaisFormatadas = redesSociais.map(rs => {
      if (!rs.rede) return null;
      const mediaName = rs.rede;
      const socialInfo = socialData.find(social => social.name === mediaName);
      return {
        mediaName: mediaName,
        icon: socialInfo ? socialInfo.icon : 'FaLink',
        url: rs.url
      };
    }).filter(Boolean);

    const idiomasFormatados = idiomas.map(idioma => ({
      idioma: idioma.idioma,
      nivel: idioma.nivel,
    }));

    const payload = {
      ...formData,
      cidade: formData.cidade?.value || null,
      vaga_id: parseInt(vagaId),
      experiencia_profissional: experienciasFormatadas,
      formacao: formacoes,
      idiomas: idiomasFormatados,
      redes_sociais: redesSociaisFormatadas,
      cursos_extracurriculares: cursos,
      deficiencia_detalhes: formData.deficiencia ? deficienciaDetalhes : null,
      respostas_criterios: respostasCriterios,
      respostas_diferenciais: respostasDiferenciais,
    };
    delete payload.estado;

    try {
      await inscreverTalento(payload);
      fireSuccess('Inscrição Realizada!', 'Sua candidatura foi enviada com sucesso.')
          .then(() => navigate('/vagas'));
    } catch (err) {
      console.error("ERRO AO ENVIAR:", err);
      fireError("Ocorreu um erro!", "Não foi possível enviar sua inscrição. Por favor, tente novamente.", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nivelOptions = [
    { value: 'A1 - Iniciante 1', label: 'A1 - Iniciante 1'},
    { value: 'A2 - Iniciante 2', label: 'A2 - Iniciante 2'},
    { value: 'B1 - Intermediário 1', label: 'B1 - Intermediário 1' },
    { value: 'B2 - Intermediário 2', label: 'B2 - Intermediário 2' },
    { value: 'C1 - Avançado', label: 'C1 - Avançado' },
    { value: 'C2 - Proficiente/Nativo', label: 'C2 - Proficiente/Nativo' },
  ];

  if (loading) return <FormInscricaoPageSkeleton />;

  if (error && !vaga) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          <div className="mb-8 lg:mb-0 lg:col-span-1">
            {vaga && <InfoVaga vaga={vaga} />}
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Formulário de Inscrição</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8">
              <CamposPessoais
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSelectChange={handleSelectChange}
                  deficienciaDetalhes={deficienciaDetalhes}
                  setDeficienciaDetalhes={setDeficienciaDetalhes}
              />
              <GerenciadorExperiencia itens={experiencias} setItens={setExperiencias} />
              <GerenciadorFormacao itens={formacoes} setItens={setFormacoes} objetoInicial={{ curso: '', instituicao: '', data_inicio: '', data_fim: '', cursando: false, periodo_atual: '' }} />
              <GerenciadorDinamico titulo="Idiomas" itens={idiomas} setItens={setIdiomas} campos={[{name: 'idioma', label: 'Idioma', type: 'react-select', options: languageOptions, placeholder: 'Selecione...'}, {name: 'nivel', label: 'Nível', type: 'react-select', options: nivelOptions, placeholder: 'Selecione...'}]} objetoInicial={{idioma: '', nivel: ''}} />
              <GerenciadorDinamico
                  titulo="Cursos Extracurriculares"
                  itens={cursos}
                  setItens={setCursos}
                  campos={[
                    {name: 'curso', label: 'Nome do Curso'},
                    {name: 'instituicao', label: 'Instituição'},
                    {name: 'carga_horaria', label: 'Carga Horária (horas)', type: 'number'}
                  ]}
                  objetoInicial={{curso: '', instituicao: '', carga_horaria: ''}}
              />
              <GerenciadorDinamico
                  titulo="Redes Sociais"
                  itens={redesSociais}
                  setItens={setRedesSociais}
                  objetoInicial={{ rede: '', url: '' }}
                  campos={[
                    { name: 'rede', label: 'Rede Social', type: 'react-select', options: socialOptions, fullWidth: true },
                    { name: 'url', label: 'URL do Perfil', placeholder: 'https://...', fullWidth: true }
                  ]}
              />
              {vaga && Object.keys(vaga.criterios_de_analise).length > 0 && (
                  <div className="border-t pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Pré-requisitos da Vaga</h2>
                    <div className="space-y-4">
                      {Object.entries(vaga.criterios_de_analise).map(([key, criterio]) => (
                          <ItemCriterioResposta key={key} criterioKey={key} criterio={criterio} resposta={respostasCriterios[key]} onRespostaChange={handleRespostaChange} />
                      ))}
                    </div>
                  </div>
              )}
              {vaga && vaga.criterios_diferenciais_de_analise && Object.keys(vaga.criterios_diferenciais_de_analise).length > 0 && (
                  <div className="border-t pt-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Diferenciais (Opcional)</h2>
                    <div className="space-y-4">
                      {Object.entries(vaga.criterios_diferenciais_de_analise).map(([key, criterio]) => (
                          <ItemCriterioResposta key={key} criterioKey={key} criterio={criterio} resposta={respostasDiferenciais[key]} onRespostaChange={(k, v) => handleRespostaChange(k, v, true)} />
                      ))}
                    </div>
                  </div>
              )}
              <div className="border-t pt-6 space-y-4">
                <label className="flex items-start">
                  <input type="checkbox" name="confirmar_dados_verdadeiros" checked={formData.confirmar_dados_verdadeiros} onChange={handleInputChange} className="h-4 w-4 mt-1 rounded border-gray-300" required/>
                  <span className="ml-2 block text-sm text-gray-900">Confirmo que todas as informações fornecidas neste formulário são verdadeiras e precisas.*</span>
                </label>
                <label className="flex items-start">
                  <input type="checkbox" name="aceita_termos" checked={formData.aceita_termos} onChange={handleInputChange} className="h-4 w-4 mt-1 rounded border-gray-300" required/>
                  <span className="ml-2 block text-sm text-gray-900">Eu aceito os termos e a política de privacidade da Cognvox.*</span>
                </label>
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