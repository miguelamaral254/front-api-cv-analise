import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTalentoById } from '../services/talentos.service';

const TalentoDetalhes = () => {
  const { talentoId } = useParams();
  const [talento, setTalento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalento = async () => {
      try {
        const data = await getTalentoById(talentoId);
        setTalento(data);
      } catch (err) {
        setError("Talento não encontrado ou erro ao buscar os dados.");
        console.error("Erro ao buscar detalhes do talento:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTalento();
  }, [talentoId]);

  if (loading) return <div className="text-center mt-8 text-lg font-semibold text-gray-700">Carregando detalhes do talento...</div>;
  if (error) return <div className="text-center mt-8 text-lg font-semibold text-red-500">{error}</div>;
  if (!talento) return <div className="text-center mt-8 text-lg font-semibold text-gray-500">Talento não encontrado.</div>;

  return (
    <div className="container mx-auto p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{talento.nome}</h1>
            <p className="text-xl text-gray-500 mt-1">{talento.email}</p>
          </div>
          <Link to="/talentos" className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
            Voltar para a Lista
          </Link>
        </div>

        {/* Contact and General Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Telefone:</span> {talento.telefone || "Não informado"}
          </p>
          <p>
            <span className="font-semibold">Aplicou na vagade ID:</span> {talento.vaga_id}
          </p>
          <p>
            <span className="font-semibold">Data da aplicação:</span> {new Date(talento.criado_em).toLocaleDateString()}
          </p>
        </div>
        
        {/* About Me Section */}
        <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Sobre Mim</h2>
          <p className="text-gray-700 leading-relaxed">
            {talento.sobre_mim || "Não há informações sobre este talento."}
          </p>
        </div>

        {/* Professional Experience Section */}
        {talento.experiencia_profissional && talento.experiencia_profissional.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiência Profissional</h2>
            <ul className="space-y-4">
              {talento.experiencia_profissional.map((exp, index) => (
                <li key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-lg font-semibold text-gray-800">{exp.cargo}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">{exp.empresa}</span> | {exp.periodo}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education Section */}
        {talento.formacao && talento.formacao.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Formação</h2>
            <ul className="space-y-4">
              {talento.formacao.map((form, index) => (
                <li key={index} className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-lg font-semibold text-gray-800">{form.curso}</p>
                  <p className="text-gray-600">
                    <span className="font-medium">{form.instituicao}</span> | {form.periodo}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages Section */}
        {talento.idiomas && talento.idiomas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Idiomas</h2>
            <ul className="flex flex-wrap gap-4">
              {talento.idiomas.map((idioma, index) => (
                <li key={index} className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full font-medium shadow-sm">
                  {idioma.idioma} ({idioma.nivel})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Terms Agreement */}
        <div className="text-right mt-6 pt-4 border-t">
          
        </div>

      </div>
    </div>
  );
};

export default TalentoDetalhes;