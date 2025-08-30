import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSwal } from "../../hooks/useSwal";
import { updateUserProfile } from "../../services/users.service";

const InputField = ({ id, label, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input id={id} {...props} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary" />
  </div>
);

export const ProfileForm = ({ onSwitchToPassword }) => {
  const { user, updateUserContext } = useAuth();
  const { fireError, fireSuccess, firePasswordConfirm } = useSwal();
  const [profileData, setProfileData] = useState({ nome: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({ nome: user.nome, email: user.email });
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await firePasswordConfirm('Confirmar Alterações', 'Para salvar, insira sua senha atual');

    if (result.isConfirmed && result.value) {
      setIsSaving(true);
      try {
        const payload = { ...profileData, currentPassword: result.value };
        const updatedUser = await updateUserProfile(user.id, payload);
        updateUserContext(updatedUser);
        fireSuccess('Sucesso!', 'Seu perfil foi atualizado.');
      } catch (err) {
        const detail = err?.response?.data?.detail;
        if (detail === "Senha atual incorreta.") {
            fireError('Senha Inválida', detail);
        } else {
            fireError('Erro!', detail || "Não foi possível atualizar o perfil.");
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  const isChanged = profileData.nome !== user?.nome || profileData.email !== user?.email;

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 md:p-8 space-y-4 border-t">
        <InputField id="nome" name="nome" label="Nome Completo" value={profileData.nome} onChange={handleChange} />
        <InputField id="email" name="email" label="Email" type="email" value={profileData.email} onChange={handleChange} />
      </div>
      <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-between items-center">
        <button type="button" onClick={onSwitchToPassword} className="font-semibold text-secondary hover:text-blue-700">
          Alterar Senha
        </button>
        <button type="submit" disabled={!isChanged || isSaving} className="bg-secondary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSaving ? "Salvando..." : "Salvar Perfil"}
        </button>
      </div>
    </form>
  );
};