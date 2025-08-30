import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSwal } from '../../hooks/useSwal';
import { addComment, deleteComment } from '../../services/talentos.service';
import { MdClose, MdSend, MdDelete } from 'react-icons/md';

const ComentariosModal = ({ talento, onClose, onDataChange }) => {
  const { user } = useAuth();
  const { fireConfirm, fireToast, fireError } = useSwal();
  const [novoComentario, setNovoComentario] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatarDataHora = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!novoComentario.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment(talento.id, { texto: novoComentario });
      fireToast('success', 'Comentário adicionado!');
      setNovoComentario('');
      onDataChange(); // Atualiza os dados no componente pai
    } catch (err) {
      fireError('Erro!', 'Não foi possível adicionar o comentário.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await fireConfirm('Excluir comentário?', 'Esta ação não poderá ser revertida.');
    if (result.isConfirmed) {
      try {
        await deleteComment(commentId);
        fireToast('success', 'Comentário excluído.');
        onDataChange(); // Atualiza os dados no componente pai
      } catch (err) {
        fireError('Erro!', 'Não foi possível excluir o comentário.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
        <header className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Comentários</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <MdClose size={24} />
          </button>
        </header>

        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          {talento.comentarios && talento.comentarios.length > 0 ? (
            talento.comentarios.map(comentario => (
              <div key={comentario.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">{comentario.user_nome}</p>
                    <p className="text-xs text-gray-500">{formatarDataHora(comentario.criado_em)}</p>
                  </div>
                  {user && user.id === comentario.user_id && (
                    <button onClick={() => handleDeleteComment(comentario.id)} className="text-red-500 hover:text-red-700">
                      <MdDelete size={20} />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 mt-2 break-words">{comentario.texto}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum comentário ainda.</p>
          )}
        </div>

        <footer className="p-4 border-t">
          <form onSubmit={handleAddComment} className="flex items-start gap-3">
            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Adicionar um comentário..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
              rows="2"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !novoComentario.trim()}
              className="bg-secondary text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <MdSend size={24} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ComentariosModal;