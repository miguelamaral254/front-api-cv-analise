// src/pages/FormUsersPage.jsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/users.service';
import Select from 'react-select';

const FormUsersPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    role: 'user1',  
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [touchedConfirm, setTouchedConfirm] = useState(false);
  const [touchedRole, setTouchedRole] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const passwordsMatch =
    formData.password.length > 0 &&
    confirmPassword.length > 0 &&
    formData.password === confirmPassword;
  const roleInvalid = touchedRole && !formData.role;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, role: selectedOption?.value || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTouchedConfirm(true);
    setTouchedRole(true);

    if (!formData.role) {
      setError('Selecione um tipo de permissão.');
      return;
    }
    if (!passwordsMatch) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createUser(formData);
      alert('Usuário criado com sucesso!');
      navigate('/talentos');
    } catch (err) {
      setError(err.response?.data?.detail || 'Ocorreu um erro ao criar o usuário.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleOptions = useMemo(() => [
    { value: 'admin', label: 'Admin' },
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
  ], []);

  return (
    <main className="min-h-screen grid place-items-center bg-gray-100">
      <div className="w-full max-w-lg p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Criar Novo Usuário
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div>
            <label htmlFor="nome" className="block text-lg font-semibold text-gray-700">Nome</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required
              className="mt-1 block w-full p-2 border rounded-md"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required
              className="mt-1 block w-full p-2 border rounded-md"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Senha</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required
              className="mt-1 block w-full p-2 border rounded-md"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700">
              Confirmar senha
            </label>

            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouchedConfirm(true)}
             required
              className={[
                "mt-1 block w-full p-2 border rounded-md",
                touchedConfirm
                  ? (passwordsMatch ? "border-green-500" : "border-red-500")
                  : "border-gray-300" ].join(" ")}

              autoComplete="new-password"
            />
            {touchedConfirm && !passwordsMatch && (
              <p className="mt-1 text-sm text-red-600">As senhas não coincidem.</p>
            )}
            {touchedConfirm && passwordsMatch && (
              <p className="mt-1 text-sm text-green-600">Senhas conferem.</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-lg font-semibold text-gray-700 mb-1">
              Tipo (Permissão)
            </label>
            <Select inputId="role" name="role" options={roleOptions}
              value={roleOptions.find(opt => opt.value === formData.role) ?? null}
              onChange={handleSelectChange}
              onBlur={() => setTouchedRole(true)}
              isClearable
              placeholder="Selecione…"
              classNamePrefix="select"
            />
            {roleInvalid && (
              <p className="mt-1 text-sm text-red-600">Selecione um tipo de permissão.</p>
            )}
          </div>

          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

          <div className="text-right border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting || !passwordsMatch || !formData.role}
              className="bg-thertiary text-white font-bold px-8 py-3 rounded-lg hover:brightness-95 disabled:opacity-60">
              {isSubmitting ? 'Criando...' : 'Criar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FormUsersPage;
