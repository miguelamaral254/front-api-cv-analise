import { MdArrowBack } from 'react-icons/md';

const UserDetails = ({ user, onVoltarClick }) => {
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
                        <strong className="w-40 text-gray-600">ID do Usuário:</strong>
                        <span className="text-gray-800">{user.id}</span>
                    </div>
                    <div className="flex items-center">
                        <strong className="w-40 text-gray-600">Nível de Acesso:</strong>
                        <span className={`px-2.5 py-1 text-sm rounded-full font-medium ${
                            user.role === 'admin'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
              {user.role}
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;