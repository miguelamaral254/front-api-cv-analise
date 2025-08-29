import { useState } from 'react';
import { MdWork, MdSchool, MdLanguage, MdQuestionAnswer, MdContentCopy, MdMailOutline, MdOutlineBookmarks, MdLocationOn, MdCalendarToday, MdFlag } from 'react-icons/md';
import { FaWhatsapp, FaGlobe, FaStar, FaWheelchair } from 'react-icons/fa';

const TalentoDetalhesModal = ({ talento, onClose }) => {
  const [copiedText, setCopiedText] = useState('');

  const formatarData = (dataString) => {
    if (!dataString) return 'Data não informada';
    return new Date(dataString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="container mx-auto p-0 lg:p-6 bg-gray-50 max-h-[100vh] overflow-y-auto rounded-2xl scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-7xl mx-auto">
          
          {/* CABEÇALHO */}
          <div className="flex justify-between items-start mb-6 border-b pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 break-words">{talento.nome}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg text-gray-500 break-words">{talento.email}</p>
                <button onClick={() => handleCopy(talento.email, 'email')} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><MdContentCopy className="text-gray-500" /></button>
                <a href={`mailto:${talento.email}`} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><MdMailOutline className="text-gray-500" /></a>
                {copiedText === 'email' && <span className="text-sm text-green-600 animate-pulse">Copiado!</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-lg text-gray-500">{talento.telefone || "Telefone não informado"}</p>
                {talento.telefone && (
                    <>
                        <button onClick={() => handleCopy(talento.telefone, 'telefone')} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><MdContentCopy className="text-gray-500" /></button>
                        <a href={`https://wa.me/${formatPhoneNumberForLink(talento.telefone)}`} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:bg-gray-200 transition-colors"><FaWhatsapp className="text-green-500" /></a>
                        {copiedText === 'telefone' && <span className="text-sm text-green-600 animate-pulse">Copiado!</span>}
                    </>
                )}
              </div>
            </div>
            <button onClick={onClose} className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors duration-200 font-medium flex-shrink-0">
              Fechar
            </button>
          </div>

          {/* BADGES DE INFORMAÇÕES RÁPIDAS */}
          <div className="flex flex-wrap items-center gap-3 mb-10 text-gray-700 text-base">
            <span className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <MdLocationOn /> {talento.cidade || "Não informada"}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <MdFlag /> Vaga ID: {talento.vaga_id}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                <MdCalendarToday /> Aplicação: {formatarData(talento.criado_em)}
            </span>
            {talento.deficiencia && (
                <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                    ♿ PCD
                </span>
            )}
          </div>
          
          {/* LAYOUT PRINCIPAL EM DUAS COLUNAS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12">

            {/* COLUNA PRINCIPAL (ESQUERDA) */}
            <div className="lg:col-span-2 space-y-10">
                <div className="bg-gray-50 p-6 rounded-xl shadow-inner border">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Sobre Mim</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{talento.sobre_mim || "Não há informações sobre este talento."}</p>
                </div>

                {talento.experiencia_profissional && talento.experiencia_profissional.length > 0 && (
                    <div>
                    <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><MdWork className="mr-3 text-secondary" /> Experiência Profissional</h2>
                    <ul className="space-y-6 border-l-2 border-gray-200 pl-6">
                        {talento.experiencia_profissional.map((exp, index) => (
                        <li key={index} className="relative">
                            <span className="absolute -left-[30.5px] top-1 h-4 w-4 rounded-full bg-secondary"></span>
                            <p className="text-lg font-semibold text-primary break-words">{exp.cargo}</p>
                            <p className="text-base text-gray-600 break-words"><span className="font-medium">{exp.empresa}</span> | {exp.periodo}</p>
                            <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap break-words">{exp.descricao}</p>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}

                {talento.respostas_criterios && Object.keys(talento.respostas_criterios).length > 0 && (
                    <div>
                    <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><MdQuestionAnswer className="mr-3 text-secondary" /> Respostas aos Critérios</h2>
                    <div className="space-y-4">
                        {Object.entries(talento.respostas_criterios).map(([criterio, resposta], index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <p className="font-semibold text-primary break-words">{criterio.replace(/_/g, ' ')}</p>
                            <p className="text-gray-700 mt-1 break-words">{resposta}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                )}

                {talento.respostas_diferenciais && Object.keys(talento.respostas_diferenciais).length > 0 && (
                    <div>
                        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><FaStar className="mr-3 text-green-500" /> Respostas aos Diferenciais</h2>
                        <div className="space-y-4">
                            {Object.entries(talento.respostas_diferenciais).map(([criterio, resposta], index) => (
                                <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="font-semibold text-green-800 break-words">{criterio.replace(/_/g, ' ')}</p>
                                    <p className="text-gray-700 mt-1 break-words">{resposta}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* COLUNA LATERAL (DIREITA) */}
            <div className="lg:col-span-1 space-y-10">
                {talento.deficiencia_detalhes && talento.deficiencia_detalhes.length > 0 && (
                    <div>
                        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><FaWheelchair className="mr-3 text-secondary" /> Acessibilidade</h2>
                        <div className="space-y-4">
                            {talento.deficiencia_detalhes.map((detalhe, index) => (
                                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <p className="font-semibold text-gray-800 break-words">{detalhe.tipo} {detalhe.cid && <span className="font-normal text-gray-500 text-sm">(CID: {detalhe.cid})</span>}</p>
                                    <p className="text-gray-700 mt-1 break-words">{detalhe.descricao}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {talento.formacao && talento.formacao.length > 0 && (
                    <div>
                        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><MdSchool className="mr-3 text-secondary" /> Formação</h2>
                        <ul className="space-y-4">
                        {talento.formacao.map((form, index) => (
                            <li key={index} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                            <p className="text-base font-semibold text-gray-800 break-words">{form.curso}</p>
                            <p className="text-gray-600 break-words"><span className="font-medium">{form.instituicao}</span></p>
                            <p className="text-sm text-gray-500 mt-1">{formatarPeriodoFormacao(form)}</p>
                            </li>
                        ))}
                        </ul>
                    </div>
                )}

                {talento.cursos_extracurriculares && talento.cursos_extracurriculares.length > 0 && (
                    <div>
                        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><MdOutlineBookmarks className="mr-3 text-secondary" /> Cursos e Certificações</h2>
                        <ul className="space-y-4">
                            {talento.cursos_extracurriculares.map((curso, index) => (
                                <li key={index} className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-lg">
                                    <p className="text-base font-semibold text-gray-800 break-words">{curso.curso}</p>
                                    <p className="text-gray-600 break-words"><span className="font-medium">{curso.instituicao}</span></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {talento.idiomas && talento.idiomas.length > 0 && (
                    <div>
                        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><MdLanguage className="mr-3 text-secondary" /> Idiomas</h2>
                        <ul className="flex flex-wrap gap-3">
                        {talento.idiomas.map((idioma, index) => (
                            <li key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium shadow-sm text-sm">
                            {idioma.idioma} ({idioma.nivel})
                            </li>
                        ))}
                        </ul>
                    </div>
                )}

                {talento.redes_sociais && talento.redes_sociais.length > 0 && (
                    <div>
                        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-5"><FaGlobe className="mr-3 text-secondary" /> Redes e Portfólios</h2>
                        <ul className="flex flex-wrap gap-3">
                            {talento.redes_sociais.map((rede, index) => (
                                <li key={index}>
                                    <a href={rede.url} target="_blank" rel="noopener noreferrer" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium shadow-sm hover:bg-blue-200 transition-colors break-all text-sm">
                                        {rede.rede}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentoDetalhesModal;

