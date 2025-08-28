import { Link } from 'react-router-dom';
import RankingCandidatos from './RankingCandidatos';
import DOMPurify from 'dompurify';
import { useAuth } from '../../contexts/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VagaDetalhes = ({ vaga, onVoltarClick, onTalentoClick }) => {
  const { user } = useAuth();
  const isRecruiter = user && (user.role === 'admin' || user.role === 'user1');

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-4xl w-full mx-auto">
      <div className="flex justify-between items-start mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">{vaga.titulo_vaga}</h1>
          <p className="text-lg lg:text-xl text-gray-500 mt-1">
            Status: {vaga.finalizada_em ? "Finalizada" : "Em andamento"}
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          
          <Link
            to={`/vagas/${vaga.id}/inscrever`}
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            {isRecruiter ? 'Visualizar formulário' : 'Inscrever-se'}
          </Link>

          <button
            onClick={onVoltarClick}
            className="flex items-center gap-2 text-blue-900 font-semibold text-sm hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowBackIcon sx={{ fontSize: '1rem' }} />
            VOLTAR
          </button>
        </div>
      </div>

      {isRecruiter && (
        <div className="mb-8">
            <RankingCandidatos vagaId={vaga.id} onTalentoClick={onTalentoClick} />
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded-xl mb-8 shadow-inner">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações Gerais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-lg">
          
          {/* Campos com o novo estilo de badge */}
          <p className="flex items-center">
            <strong className="font-semibold mr-2">Localização:</strong>
            <span className="bg-gray-200 text-gray-800 px-2.5 py-1 rounded-full text-sm">
                📍 {vaga.cidade}
            </span>
          </p>
          <p className="flex items-center">
            <strong className="font-semibold mr-2">Modelo:</strong>
            <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-sm">
                🏢 {vaga.modelo_trabalho}
            </span>
          </p>
          <p className="flex items-center">
            <strong className="font-semibold mr-2">Área:</strong>
            <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm">
                🏷️ {vaga.nome_area}
            </span>
          </p>

          <p><strong className="font-semibold">Aberta desde:</strong> {new Date(vaga.criado_em).toLocaleDateString()}</p>
          {vaga.finalizada_em && (
            <p><strong className="font-semibold">Finalizada em:</strong> {new Date(vaga.finalizada_em).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <div className="mb-8 prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 not-prose">Descrição da Vaga</h2>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vaga.descricao) }} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Requisitos da Vaga</h2>
        <ul className="space-y-4">
          {Object.entries(vaga.criterios_de_analise).map(([key, value]) => (
            <li key={key} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
              <p className="text-lg font-semibold text-gray-800">{key.replace(/_/g, ' ')}</p>
              <p className="text-gray-600 mt-1">{value.descricao}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VagaDetalhes;