import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSwal } from "../../hooks/useSwal";
import { updateUserPassword } from "../../services/users.service";
import { MdVisibility, MdVisibilityOff, MdArrowBack } from 'react-icons/md';

const PasswordField = ({ id, label, value, name, onChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative mt-1">
                <input id={id} name={name} type={isVisible ? "text" : "password"} value={value} onChange={onChange} required className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary"/>
                <button type="button" onClick={() => setIsVisible(!isVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-secondary">
                    {isVisible ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
            </div>
        </div>
    );
};

export const PasswordForm = ({ onSwitchToProfile }) => {
    const { user } = useAuth();
    const { fireToast, fireError } = useSwal();
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword.length < 8) {
            return fireError("Senha Inválida", "A nova senha deve ter pelo menos 8 caracteres.");
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return fireError("Erro", "As novas senhas não coincidem.");
        }
        setIsSaving(true);
        try {
            await updateUserPassword(user.id, passwordData);
            fireToast('success', 'Senha alterada com sucesso!');
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            onSwitchToProfile();
        } catch (err) {
            fireError('Erro!', err?.response?.data?.detail || "Não foi possível alterar a senha.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const isFormValid = passwordData.newPassword.length >= 8 && passwordData.currentPassword && passwordData.newPassword === passwordData.confirmPassword;

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8 space-y-4 border-t">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Alterar Senha</h2>
                <PasswordField id="currentPassword" name="currentPassword" label="Senha Atual" value={passwordData.currentPassword} onChange={handleChange} />
                <PasswordField id="newPassword" name="newPassword" label="Nova Senha" value={passwordData.newPassword} onChange={handleChange} />
                <PasswordField id="confirmPassword" name="confirmPassword" label="Confirmar Nova Senha" value={passwordData.confirmPassword} onChange={handleChange} />
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-between items-center">
                <button type="button" onClick={onSwitchToProfile} className="flex items-center gap-2 font-semibold text-gray-600 hover:text-gray-800">
                  <MdArrowBack/> Voltar
                </button>
                <button type="submit" disabled={!isFormValid || isSaving} className="bg-secondary text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSaving ? "Alterando..." : "Alterar Senha"}
                </button>
            </div>
        </form>
    );
};