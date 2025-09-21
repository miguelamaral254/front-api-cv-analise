import Select from 'react-select';

const FiltroUsers = ({ filtros, onFiltroChange }) => {

    const roleOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'user1', label: 'User1' },
        // Adicione outras roles se existirem
    ];

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
                    options={roleOptions}
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