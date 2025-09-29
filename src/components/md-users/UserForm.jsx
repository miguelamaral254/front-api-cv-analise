import { useState, useMemo, useEffect } from 'react';
import { useSwal } from '../../hooks/useSwal';
import { createUser, getRoles } from '../../services/users.service';
import Select from 'react-select';
import { PasswordField } from './PasswordField';
import { useAuth } from '../../hooks/useAuth.js';

const InputField = ({ id, label, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input id={id} {...props} className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-secondary focus:border-secondary" />
    </div>
);

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

export const UserForm = ({ onSuccess }) => {
    const { user } = useAuth();
    const { fireSuccess, fireError } = useSwal();
    const [roles, setRoles] = useState([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(true);
    const [rolesError, setRolesError] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        password: '',
        confirmPassword: '',
        user_role_id: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                setRolesError('Não foi possível carregar as permissões.');
                console.error("Erro ao buscar roles:", error);
            } finally {
                setIsLoadingRoles(false);
            }
        };
        fetchRoles();
    }, []);

    const roleOptions = useMemo(() =>
            roles.map(role => ({ value: role.id, label: role.nome })),
        [roles]);

    const passwordsMatch = formData.password && formData.password === formData.confirmPassword;
    const isFormValid = formData.nome && formData.email && formData.user_role_id && passwordsMatch && formData.password.length >= 8;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prev => ({ ...prev, user_role_id: selectedOption?.value || null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            return fireError('Erro de Autenticação', 'Usuário não identificado. Faça login novamente.');
        }
        if (!isFormValid) {
            return fireError("Formulário Inválido", "Por favor, preencha todos os campos corretamente e garanta que as senhas coincidem.");
        }
        setIsSubmitting(true);
        try {
            const payload = {
                nome: formData.nome,
                email: formData.email,
                password: formData.password,
                user_role_id: formData.user_role_id,
                criado_por: user.id,
            };
            await createUser(payload);
            fireSuccess('Sucesso!', 'Usuário criado com sucesso!')
                .then(() => onSuccess());
        } catch (err) {
            fireError('Erro!', err.response?.data?.detail || 'Ocorreu um erro ao criar o usuário.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <InputField id="nome" name="nome" label="Nome Completo" value={formData.nome} onChange={handleInputChange} required />
            <InputField id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleInputChange} required />

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Permissão</label>
                <Select
                    inputId="role"
                    name="role"
                    options={roleOptions}
                    isLoading={isLoadingRoles}
                    value={roleOptions.find(opt => opt.value === formData.user_role_id)}
                    onChange={handleSelectChange}
                    placeholder="Selecione um tipo de permissão"
                    isClearable
                    noOptionsMessage={() => {
                        if (isLoadingRoles) return "Carregando permissões...";
                        if (rolesError) return rolesError;
                        return "Nenhuma permissão encontrada.";
                    }}
                />
            </div>

            <div>
                <PasswordField id="password" name="password" label="Senha" value={formData.password} onChange={handleInputChange} />
                <PasswordStrengthMeter password={formData.password} />
            </div>

            <PasswordField id="confirmPassword" name="confirmPassword" label="Confirmar Senha" value={formData.confirmPassword} onChange={handleInputChange} />

            {formData.confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-600 -mt-2">As senhas não coincidem.</p>
            )}

            <div className="text-right border-t pt-6">
                <button type="submit" disabled={!isFormValid || isSubmitting} className="bg-secondary text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Salvando...' : 'Criar Usuário'}
                </button>
            </div>
        </form>
    );
};