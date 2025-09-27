// src/components/FiltroUsers.jsx

import Select from 'react-select';
import { useMemo } from 'react'; // Importe o useMemo

const FiltroUsers = ({ filtros, onFiltroChange, rolesDisponiveis }) => {

    // Transforma a lista de roles recebida em opções para o Select
    const roleOptions = useMemo(() => {
        if (!rolesDisponiveis) return [];
        return rolesDisponiveis.map(role => ({
            value: role,
            label: role.charAt(0).toUpperCase() + role.slice(1) // Deixa a primeira letra maiúscula (ex: Admin)
        }));
    }, [rolesDisponiveis]);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <input
                    type="text"
                    name="termo"
                    value={filtros.termo}
                    onChange={(e) => onFiltroChange('termo', e.target.value)}
                    placeholder="Buscar por nome ou email..."
                    className="p-2 border rounded-lg w-full h-[38px]"
                />
                <Select
                    name="role"
                    options={roleOptions} // Agora usa as opções dinâmicas
                    className="basic-single-select"
                    classNamePrefix="select"
                    placeholder="Filtrar por nível..."
                    value={roleOptions.find(opt => opt.value === filtros.role)}
                    onChange={(option) => onFiltroChange('role', option ? option.value : '')}
                    isClearable
                />
            </div>
        </div>
    );
};

export default FiltroUsers;