import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getUserById, getRoles } from '../services/users.service';

import ListaDeTalentos from '../components/md-talentos/ListaDeTalentos';
import TabelaSkeleton from '../components/global/skeletons/TabelaSkeleton';
import FiltroUsers from '../components/md-users/FiltroUsers';
import UserDetails from '../components/md-users/UserDetails';
import FiltroUsersSkeleton from '../components/md-users/FiltroUsersSkeleton';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { MdAdd } from 'react-icons/md';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [userSelecionado, setUserSelecionado] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [error, setError] = useState(null);

    const initialFiltrosState = { termo: '', role: '' };
    const [filtros, setFiltros] = useState(initialFiltrosState);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersData, rolesData] = await Promise.all([getUsers(), getRoles()]);
                setUsers(usersData);
                setAvailableRoles(rolesData);
            } catch (err) {
                setError("Não foi possível carregar os dados da página.");
            } finally {
                setLoading(false);
            }
        };
        if (!userSelecionado) {
            fetchData();
        }
    }, [userSelecionado]);

    const rolesUnicos = useMemo(() => {
        if (!users || users.length === 0) return [];
        const todosOsRoles = users.map(user => user.role).filter(Boolean);
        return [...new Set(todosOsRoles)];
    }, [users]);

    const handleUserClick = async (user) => {
        setIsDetailLoading(true);
        try {
            const dataCompleta = await getUserById(user.id);
            setUserSelecionado(dataCompleta);
        } catch (err) {
            setError("Não foi possível carregar os detalhes do usuário.");
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleUserUpdate = (updatedUser) => {
        setUserSelecionado(updatedUser);
        setUsers(currentUsers =>
            currentUsers.map(u => u.id === updatedUser.id ? updatedUser : u)
        );
    };

    const handleFiltroChange = (name, value) => {
        setFiltros(prev => ({ ...prev, [name]: value }));
        setPaginaAtual(1);
    };

    const handlePaginaChange = (event, value) => {
        setPaginaAtual(value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const usersFiltrados = useMemo(() => {
        return users.filter(user => {
            const termoBusca = filtros.termo.toLowerCase();
            const matchTermo = filtros.termo
                ? user.nome.toLowerCase().includes(termoBusca) || user.email.toLowerCase().includes(termoBusca)
                : true;
            const matchRole = filtros.role ? user.role === filtros.role : true;
            return matchTermo && matchRole;
        });
    }, [users, filtros]);

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...usersFiltrados];
        if (sortConfig.key !== null) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [usersFiltrados, sortConfig]);

    const paginacao = useMemo(() => {
        const totalPaginas = Math.ceil(sortedUsers.length / itensPorPagina);
        const indiceInicial = (paginaAtual - 1) * itensPorPagina;
        const usersPaginados = sortedUsers.slice(indiceInicial, indiceInicial + itensPorPagina);
        return { totalPaginas, usersPaginados };
    }, [sortedUsers, paginaAtual, itensPorPagina]);

    const colunasDaTabela = [
        {
            header: "Usuário",
            accessor: "nome",
            render: (user) => (
                <div className="flex items-center">
                    <img
                        className="h-10 w-10 rounded-full object-cover mr-4"
                        src={user.img_path || `https://ui-avatars.com/api/?name=${user.nome.replace(' ', '+')}&background=random`}
                        alt={user.nome}
                    />
                    <p className="font-semibold">{user.nome}</p>
                </div>
            )
        },
        { header: "Email", accessor: "email" },
        {
            header: "Status",
            accessor: "is_active",
            render: (user) => (
                <div className={`flex items-center gap-2 px-2.5 py-1 text-sm rounded-full font-medium w-fit ${
                    user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    <div className={`h-2 w-2 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {user.is_active ? 'Ativo' : 'Inativo'}
                </div>
            )
        },
        { header: "Nível de Acesso", accessor: "role" }
    ];

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerenciamento de Usuários</h1>
                <FiltroUsersSkeleton />
                <TabelaSkeleton colunas={4} linhas={itensPorPagina} />
            </div>
        );
    }

    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            {isDetailLoading ? (
                <div className="text-center mt-8 text-gray-600">Carregando detalhes...</div>
            ) : userSelecionado ? (
                <UserDetails
                    user={userSelecionado}
                    onVoltarClick={() => setUserSelecionado(null)}
                    onUserUpdate={handleUserUpdate}
                    availableRoles={availableRoles}
                />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
                        <Link to="/users/criar" className="flex items-center gap-2 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <MdAdd /> Novo Usuário
                        </Link>
                    </div>
                    <FiltroUsers
                        filtros={filtros}
                        onFiltroChange={handleFiltroChange}
                        rolesDisponiveis={rolesUnicos}
                    />
                    <ListaDeTalentos
                        talentos={paginacao.usersPaginados}
                        colunas={colunasDaTabela}
                        onTalentoClick={handleUserClick}
                        mensagemVazio="Nenhum usuário encontrado para os filtros selecionados."
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />
                    {paginacao.totalPaginas > 0 && (
                        <div className="flex justify-center mt-6">
                            <Stack spacing={2}>
                                <Pagination
                                    count={paginacao.totalPaginas}
                                    page={paginaAtual}
                                    onChange={handlePaginaChange}
                                    color="primary"
                                />
                            </Stack>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UsersPage;