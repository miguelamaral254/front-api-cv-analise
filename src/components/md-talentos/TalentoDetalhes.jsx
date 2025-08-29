import { useState } from 'react';
import { MdWork, MdSchool, MdLanguage, MdQuestionAnswer, MdArrowBack, MdContentCopy, MdMailOutline } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const TalentoDetalhes = ({ talento, onVoltarClick }) => {
  const [copiedText, setCopiedText] = useState('');

  const formatarData = (dataString) => {
    if (!dataString) return 'Data não informada';
    return new Date(dataString).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const formatarPeriodoFormacao = (formacao) => {
    const inicio = formatarData(formacao.data_inicio);
    if (formacao.cursando) {
      return `${inicio} - Presente (Cursando ${formacao.periodo_atual}º período)`;
    }
    const fim = formatarData(formacao.data_fim);
    return `${inicio} - ${fim}`;
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(type);
      setTimeout(() => setCopiedText(''), 2000);
    });
  };

  const formatPhoneNumberForLink = (phone) => {
    return phone ? phone.replace(/\D/g, '') : '';
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-5xl w-full mx-auto animate-fade-in">
      <div className="flex justify-between items-start mb-8 border-b pb-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{talento.nome}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xl text-gray-500">{talento.email}</p>
            <button onClick={() => handleCopy(talento.email, 'email')} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><MdContentCopy className="text-gray-500" /></button>
            <a href={`mailto:${talento.email}`} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><MdMailOutline className="text-gray-500" /></a>
            {copiedText === 'email' && <span className="text-sm text-green-600">Copiado!</span>}
          </div>
        </div>
        <button
          onClick={onVoltarClick}
          className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
        >
          <MdArrowBack /> Voltar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-gray-700 text-lg">
        <p><span className="font-semibold text-gray-800">Cidade:</span> {talento.cidade || "Não informada"}</p>
        <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">Telefone:</span> {talento.telefone || "Não informado"}
            {talento.telefone && (
                <>
                    <button onClick={() => handleCopy(talento.telefone, 'telefone')} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><MdContentCopy className="text-gray-500" /></button>
                    <a href={`https://wa.me/${formatPhoneNumberForLink(talento.telefone)}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:bg-gray-200 transition-colors"><FaWhatsapp className="text-green-500" /></a>
                    {copiedText === 'telefone' && <span className="text-sm text-green-600">Copiado!</span>}
                </>
            )}
        </div>
        <p><span className="font-semibold text-gray-800">Aplicou na vaga (ID):</span> {talento.vaga_id}</p>
        <p><span className="font-semibold text-gray-800">Data da aplicação:</span> {new Date(talento.criado_em).toLocaleDateString()}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl mb-10 shadow-inner border">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Sobre Mim</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {talento.sobre_mim || "Não há informações sobre este talento."}
        </p>
      </div>

      {talento.experiencia_profissional && talento.experiencia_profissional.length > 0 && (
        <div className="mb-10">
          <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6"><MdWork className="mr-3 text-secondary" /> Experiência Profissional</h2>
          <ul className="space-y-6 border-l-2 border-gray-200 pl-6">
            {talento.experiencia_profissional.map((exp, index) => (
              <li key={index} className="relative">
                <span className="absolute -left-[30px] top-1 h-4 w-4 rounded-full bg-secondary"></span>
                <p className="text-xl font-semibold text-primary">{exp.cargo}</p>
                <p className="text-lg text-gray-600">
                  <span className="font-medium">{exp.empresa}</span> | {exp.periodo}
                </p>
                <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {talento.respostas_criterios && Object.keys(talento.respostas_criterios).length > 0 && (
        <div className="mb-10">
          <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6"><MdQuestionAnswer className="mr-3 text-secondary" /> Respostas aos Critérios</h2>
          <div className="space-y-4">
            {Object.entries(talento.respostas_criterios).map(([criterio, resposta], index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-primary">{criterio.replace(/_/g, ' ')}</p>
                <p className="text-gray-700 mt-1">{resposta}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {talento.formacao && talento.formacao.length > 0 && (
          <div className="mb-8">
            <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6"><MdSchool className="mr-3 text-secondary" /> Formação</h2>
            <ul className="space-y-4">
              {talento.formacao.map((form, index) => (
                <li key={index} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                  <p className="text-lg font-semibold text-gray-800">{form.curso}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">{form.instituicao}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{formatarPeriodoFormacao(form)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {talento.idiomas && talento.idiomas.length > 0 && (
          <div className="mb-8">
            <h2 className="flex items-center text-3xl font-bold text-gray-800 mb-6"><MdLanguage className="mr-3 text-secondary" /> Idiomas</h2>
            <ul className="flex flex-wrap gap-4">
              {talento.idiomas.map((idioma, index) => (
                <li key={index} className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full font-medium shadow-sm">
                  {idioma.idioma} ({idioma.nivel})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentoDetalhes;