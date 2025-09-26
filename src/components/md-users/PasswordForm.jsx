import { useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth.js";
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

const PasswordStrengthMeter = ({ password }) => {
    const calculateStrength = (pass) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = useMemo(() => {
        const score = calculateStrength(password);
        if (score <= 2) return { label: 'Fraca', color: 'bg-red-500', width: 'w-1/3' };
        if (score <= 4) return { label: 'Média', color: 'bg-orange-500', width: 'w-2/3' };
        return { label: 'Forte', color: 'bg-green-500', width: 'w-full' };
    }, [password]);

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-2 w-full">
                <div className={`h-2 rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}></div>
            </div>
            <p className={`text-sm mt-1 font-medium ${strength.color.replace('bg-', 'text-')}`}>
                Força: {strength.label}
            </p>
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
                <div>
                    <PasswordField id="newPassword" name="newPassword" label="Nova Senha" value={passwordData.newPassword} onChange={handleChange} />
                    <PasswordStrengthMeter password={passwordData.newPassword} />
                </div>
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