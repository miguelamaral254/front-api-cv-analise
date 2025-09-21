import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, getUserById } from '../services/users.service';

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
    const [userSelecionado, setUserSelecionado] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [error, setError] = useState(null);

    const initialFiltrosState = { termo: '', role: '' };
    const [filtros, setFiltros] = useState(initialFiltrosState);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError("Não foi possível carregar os usuários.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

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

    const handleFiltroChange = (name, value) => {
        setFiltros(prev => ({ ...prev, [name]: value }));
        setPaginaAtual(1);
    };

    const handlePaginaChange = (event, value) => {
        setPaginaAtual(value);
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

    const paginacao = useMemo(() => {
        const totalPaginas = Math.ceil(usersFiltrados.length / itensPorPagina);
        const indiceInicial = (paginaAtual - 1) * itensPorPagina;
        const usersPaginados = usersFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);
        return { totalPaginas, usersPaginados };
    }, [usersFiltrados, paginaAtual, itensPorPagina]);

    const colunasDaTabela = [
        {
            header: "Usuário",
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
            header: "Nível de Acesso",
            render: (user) => (
                <span className={`px-2.5 py-1 text-sm rounded-full font-medium ${
                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
            )
        }
    ];

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerenciamento de Usuários</h1>
                <FiltroUsersSkeleton />
                <TabelaSkeleton colunas={3} linhas={itensPorPagina} />
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
                />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
                        <Link
                            to="/users/criar"
                            className="flex items-center gap-2 bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <MdAdd /> Novo Usuário
                        </Link>
                    </div>

                    <FiltroUsers
                        filtros={filtros}
                        onFiltroChange={handleFiltroChange}
                    />

                    <ListaDeTalentos
                        talentos={paginacao.usersPaginados}
                        colunas={colunasDaTabela}
                        onTalentoClick={handleUserClick}
                        mensagemVazio="Nenhum usuário encontrado para os filtros selecionados."
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