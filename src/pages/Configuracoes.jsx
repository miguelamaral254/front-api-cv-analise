import { useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PasswordForm } from "../components/md-users/PasswordForm";
import { ProfileForm } from "../components/md-users/ProfileForm";

const Configuracoes = () => {
  const { user } = useAuth();
  const [view, setView] = useState('profile');

  const initials = useMemo(() => {
    const name = (user?.nome || "").trim();
    if (!name) return "?";
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }, [user?.nome]);

  const roleLabel = ({ admin: "Administrador", user1: "Recrutador", user2: "Usuário" }[user?.role]) || "—";

  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center bg-gray-50 p-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
          <p className="mt-3 text-lg text-gray-600">Você precisa estar logado para acessar esta página.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-full bg-secondary text-white grid place-items-center text-3xl font-semibold flex-shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.nome}</h1>
                <span className="mt-1 inline-flex items-center rounded-full bg-blue-100 text-secondary text-sm font-semibold px-3 py-1">
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>
          
          {view === 'profile' ? (
            <ProfileForm onSwitchToPassword={() => setView('password')} />
          ) : (
            <PasswordForm onSwitchToProfile={() => setView('profile')} />
          )}

        </div>
      </div>
    </main>
  );
};

export default Configuracoes;