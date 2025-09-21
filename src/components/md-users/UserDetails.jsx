import { useState } from 'react';
import { MdArrowBack, MdBlock, MdCheckCircle } from 'react-icons/md';
import { useSwal } from '../../hooks/useSwal';
import { updateUserStatus } from '../../services/users.service';

const UserDetails = ({ user, onVoltarClick, onUserUpdate }) => {
    const { fireConfirm, fireToast, fireError } = useSwal();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateStatus = async (newStatus) => {
        const actionText = newStatus ? 'ativar' : 'inativar';
        const result = await fireConfirm(
            `Confirmar Ação`,
            `Você tem certeza que deseja ${actionText} o usuário ${user.nome}?`
        );

        if (result.isConfirmed) {
            setIsUpdating(true);
            try {
                await updateUserStatus(user.id, newStatus);
                onUserUpdate({ ...user, is_active: newStatus });
                fireToast('success', `Usuário ${actionText === 'ativar' ? 'ativado' : 'inativado'} com sucesso!`);
            } catch (err) {
                fireError('Erro!', `Não foi possível ${actionText} o usuário.`);
            } finally {
                setIsUpdating(false);
            }
        }
    };

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-2xl w-full mx-auto animate-fade-in">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
                <div className="flex items-center gap-6">
                    <img
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-secondary"
                        src={user.img_path || `https://ui-avatars.com/api/?name=${user.nome.replace(' ', '+')}&background=random&size=128`}
                        alt={user.nome}
                    />
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">{user.nome}</h1>
                        <p className="text-lg text-gray-500">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={onVoltarClick}
                    className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                    <MdArrowBack /> Voltar
                </button>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Informações do Usuário</h2>
                <div className="space-y-3">
                    <div className="flex items-center">
                        <strong className="w-40 text-gray-600">Status:</strong>
                        <div className={`flex items-center gap-2 px-2.5 py-1 text-sm rounded-full font-medium w-fit ${
                            user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            <div className={`h-2 w-2 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            {user.is_active ? 'Ativo' : 'Inativo'}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <strong className="w-40 text-gray-600">Nível de Acesso:</strong>
                        <span className={`px-2.5 py-1 text-sm rounded-full font-medium ${
                            user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="border-t mt-6 pt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Ações</h2>
                    {user.is_active ? (
                        <button
                            onClick={() => handleUpdateStatus(false)}
                            disabled={isUpdating}
                            className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 w-40"
                        >
                            {isUpdating ? 'Salvando...' : <><MdBlock /> Inativar Usuário</>}
                        </button>
                    ) : (
                        <button
                            onClick={() => handleUpdateStatus(true)}
                            disabled={isUpdating}
                            className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 w-40"
                        >
                            {isUpdating ? 'Salvando...' : <><MdCheckCircle /> Ativar Usuário</>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;