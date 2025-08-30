import { useNavigate } from 'react-router-dom';
import { UserForm } from '../components/md-users/UserForm';

const FormUsersPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/talentos');
  };

  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
                Criar Novo Usuário
            </h1>
            <p className="text-gray-500 mt-1">Preencha os dados para cadastrar um novo acesso.</p>
        </div>
        
        <UserForm onSuccess={handleSuccess} />

      </div>
    </main>
  );
};

export default FormUsersPage;