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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData(prev => ({ ...prev, role: selectedOption.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createUser(formData);
      alert('Usuário criado com sucesso!');
      navigate('/talentos'); // Ou para uma futura lista de usuários
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
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Criar Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        
        <div>
          <label htmlFor="nome" className="block text-lg font-semibold text-gray-700">Nome</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required className="mt-1 block w-full p-2 border rounded-md"/>
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full p-2 border rounded-md"/>
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Senha</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required className="mt-1 block w-full p-2 border rounded-md"/>
        </div>

        <div>
          <label htmlFor="role" className="block text-lg font-semibold text-gray-700 mb-1">Role (Permissão)</label>
          <Select
            name="role"
            options={roleOptions}
            classNamePrefix="select"
            value={roleOptions.find(opt => opt.value === formData.role)}
            onChange={handleSelectChange}
            required
          />
        </div>
        
        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}
        
        <div className="text-right border-t pt-6">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
            {isSubmitting ? 'Criando...' : 'Criar Usuário'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default FormUsersPage;