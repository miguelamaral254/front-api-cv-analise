import { useState } from 'react';
import { MdArrowBack, MdBlock, MdCheckCircle, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { useSwal } from '../../hooks/useSwal';
import { updateUserStatus, updateUserRole } from '../../services/users.service';
import { useAuth } from '../../hooks/useAuth.js';

const UserDetails = ({ user, onVoltarClick, onUserUpdate, availableRoles }) => {
    const { user: loggedInUser } = useAuth();
    const { fireConfirm, fireToast, fireError } = useSwal();
    const [isUpdating, setIsUpdating] = useState(false);

    const [isEditingRole, setIsEditingRole] = useState(false);
    const [selectedRole, setSelectedRole] = useState(user.role);

    const handleUpdateStatus = async (newStatus) => {
        const actionText = newStatus ? 'ativar' : 'inativar';
        const result = await fireConfirm(
            `Confirmar Ação`,
            `Você tem certeza que deseja ${actionText} o usuário ${user.nome}?`
        );

        if (result.isConfirmed) {
            if (!loggedInUser || !loggedInUser.id) {
                return fireError('Erro de Autenticação', 'Usuário não identificado. Faça login novamente.');
            }
            setIsUpdating(true);
            try {
                await updateUserStatus(user.id, newStatus, loggedInUser.id);
                onUserUpdate({ ...user, is_active: newStatus });
                fireToast('success', `Usuário ${actionText === 'ativar' ? 'ativado' : 'inativado'} com sucesso!`);
            } catch (err) {
                fireError('Erro!', `Não foi possível ${actionText} o usuário.`);
            } finally {
                setIsUpdating(false);
            }
        }
    };

    const handleCancelEditRole = () => {
        setIsEditingRole(false);
        setSelectedRole(user.role);
    };

    const handleSaveRole = async () => {
        const result = await fireConfirm(
            'Alterar Nível de Acesso',
            `Deseja alterar o nível de ${user.nome} para "${selectedRole}"?`
        );

        if (result.isConfirmed) {
            if (!loggedInUser || !loggedInUser.id) {
                return fireError('Erro de Autenticação', 'Usuário não identificado. Faça login novamente.');
            }
            setIsUpdating(true);
            try {
                await updateUserRole(user.id, { role: selectedRole }, loggedInUser.id);
                onUserUpdate({ ...user, role: selectedRole });
                fireToast('success', 'Nível de acesso atualizado com sucesso!');
                setIsEditingRole(false);
            } catch (err) {
                fireError('Erro!', 'Não foi possível atualizar o nível de acesso.');
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
                    {user.criado_por_nome && (
                        <div className="flex items-center">
                            <strong className="w-40 text-gray-600">Criado por:</strong>
                            <span className="text-gray-800">{user.criado_por_nome}</span>
                        </div>
                    )}
                    {user.atualizado_por_nome && (
                        <div className="flex items-center">
                            <strong className="w-40 text-gray-600">Atualizado por:</strong>
                            <span className="text-gray-800">{user.atualizado_por_nome}</span>
                        </div>
                    )}
                </div>

                <div className="border-t mt-6 pt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Ações</h2>
                    <div className="flex items-start gap-8">
                        <div>
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Status do Usuário</h3>
                            {user.is_active ? (
                                <button
                                    onClick={() => handleUpdateStatus(false)}
                                    disabled={isUpdating}
                                    className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 w-44"
                                >
                                    {isUpdating ? 'Salvando...' : <><MdBlock /> Inativar</>}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleUpdateStatus(true)}
                                    disabled={isUpdating}
                                    className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 w-44"
                                >
                                    {isUpdating ? 'Salvando...' : <><MdCheckCircle /> Ativar</>}
                                </button>
                            )}
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Nível de Acesso</h3>
                            {!isEditingRole ? (
                                <button
                                    onClick={() => setIsEditingRole(true)}
                                    disabled={isUpdating}
                                    className="flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
                                >
                                    <MdEdit /> Alterar Nível
                                </button>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        disabled={isUpdating}
                                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {availableRoles.map(role => (
                                            <option key={role.id} value={role.nome}>{role.nome}</option>
                                        ))}
                                    </select>

                                    {selectedRole !== user.role && (
                                        <button
                                            onClick={handleSaveRole}
                                            disabled={isUpdating}
                                            className="flex items-center gap-2 bg-primary text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-900 disabled:bg-gray-400"
                                        >
                                            <MdSave /> Salvar
                                        </button>
                                    )}

                                    <button
                                        onClick={handleCancelEditRole}
                                        disabled={isUpdating}
                                        className="flex items-center gap-2 bg-gray-200 text-gray-800 rounded-md py-2 px-4 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                        <MdCancel /> Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;