// src/pages/Configuracoes.jsx
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Configuracoes = () => {
  const { user } = useAuth();

  // Estados do formulário (dados básicos)
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [emailTouched, setEmailTouched] = useState(false);

  // Estados de senha
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  // Estado de envio
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'success' | 'error', text: string }

  // Atualiza inputs se o user chegar depois
  useEffect(() => {
    setNome(user?.nome || "");
    setEmail(user?.email || "");
  }, [user]);

  // Iniciais para o avatar
  const initials = useMemo(() => {
    const name = (user?.nome || "").trim();
    if (!name) return "?";
    const parts = name.split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }, [user?.nome]);

  // Role somente leitura
  const roleLabel =
    ({ admin: "Admin", user1: "User 1", user2: "User 2" }[user?.role]) ||
    user?.role ||
    "—";

  // Validações
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const newPassProvided = newPassword.length > 0;
  const newPassValid = !newPassProvided || newPassword.length >= 8; // só valida se o usuário digitar
  const passwordsMatch = !newPassProvided || newPassword === confirmNewPassword;

  // Controle de habilitação de "Salvar"
  const hasProfileChanges =
    nome !== (user?.nome || "") || email !== (user?.email || "");
  const needsCurrentForChange = newPassProvided && currentPassword.length === 0;
  const blockSaveForPassword =
    newPassProvided && (!newPassValid || !passwordsMatch || needsCurrentForChange);
  const disableSave =
    isSaving ||
    (!hasProfileChanges && !newPassProvided) ||
    !emailValid ||
    blockSaveForPassword;

  // Não logado
  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center bg-body_color">
        <div className="bg-white p-10 rounded-2xl shadow w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
          <p className="mt-3 text-lg text-gray-600">
            Você precisa estar logado para ver e alterar suas informações.
          </p>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setEmailTouched(true);
    setConfirmTouched(true);

    if (!emailValid) {
      setMsg({ type: "error", text: "Informe um e-mail válido." });
      return;
    }
    if (newPassProvided) {
      if (!newPassValid) {
        setMsg({
          type: "error",
          text: "A nova senha deve ter pelo menos 8 caracteres.",
        });
        return;
      }
      if (!passwordsMatch) {
        setMsg({ type: "error", text: "As senhas não coincidem." });
        return;
      }
      if (needsCurrentForChange) {
        setMsg({
          type: "error",
          text: "Informe sua senha atual para confirmar a alteração.",
        });
        return;
      }
    }

    setIsSaving(true);
    try {
      // TODO: troque pelos seus endpoints reais
      await new Promise((r) => setTimeout(r, 600));
      setMsg({ type: "success", text: "Dados atualizados com sucesso." });

      // Limpa campos de senha
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setConfirmTouched(false);
    } catch (err) {
      setMsg({
        type: "error",
        text:
          err?.response?.data?.detail ||
          "Não foi possível atualizar seus dados.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setNome(user?.nome || "");
    setEmail(user?.email || "");
    setEmailTouched(false);
    setMsg(null);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setConfirmTouched(false);
  };

  return (
    <main className="min-h-screen bg-body_color py-14">
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="bg-white rounded-2xl shadow p-8 md:p-10">
          {/* Cabeçalho */}
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary grid place-items-center text-3xl font-semibold">
              {initials}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
              <span className="mt-2 inline-flex items-center rounded-full bg-primary text-white text-base font-semibold px-3 py-1">
                {roleLabel}
              </span>
            </div>
          </div>

          {/* Formulário: tudo em 1 coluna */}
          <form onSubmit={handleSubmit} className="mt-8 border-t pt-8 space-y-8">
            {/* Nome */}
            <div>
              <label className="block text-base text-gray-600" htmlFor="nome">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 block w-full p-4 text-base border rounded-xl"
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-base text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={[
                  "mt-2 block w-full p-4 text-base border rounded-xl",
                  emailTouched
                    ? emailValid
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300",
                ].join(" ")}
                autoComplete="email"
              />
              {emailTouched && !emailValid && (
                <p className="mt-2 text-sm text-red-600">
                  E-mail em formato inválido.
                </p>
              )}
            </div>

            {/* Permissão (somente leitura) */}
            <div>
              <label className="block text-base text-gray-600" htmlFor="role">
                Permissão
              </label>
              <input
                id="role"
                type="text"
                value={roleLabel}
                readOnly
                disabled
                className="mt-2 block w-full p-4 text-base border rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Senha atual */}
            <div>
              <label
                className="block text-base text-gray-600"
                htmlFor="currentPassword"
              >
                Senha atual
              </label>
              <input
                id="currentPassword"
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 block w-full p-4 text-base border rounded-xl"
                autoComplete="current-password"
                placeholder="Obrigatória se você for alterar a senha"
              />
            </div>

            {/* Nova senha */}
            <div>
              <label
                className="block text-base text-gray-600"
                htmlFor="newPassword"
              >
                Nova senha
              </label>
              <input
                id="newPassword"
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={[
                  "mt-2 block w-full p-4 text-base border rounded-xl",
                  newPassProvided
                    ? newPassValid
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300",
                ].join(" ")}
                autoComplete="new-password"
                placeholder="Deixe em branco para não alterar"
              />
              {newPassProvided && !newPassValid && (
                <p className="mt-2 text-sm text-red-600">
                  A nova senha deve ter pelo menos 8 caracteres.
                </p>
              )}
            </div>

            {/* Confirmar nova senha */}
            <div>
              <label
                className="block text-base text-gray-600"
                htmlFor="confirmNewPassword"
              >
                Confirmar nova senha
              </label>
              <input
                id="confirmNewPassword"
                type={showPasswords ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                onBlur={() => setConfirmTouched(true)}
                className={[
                  "mt-2 block w-full p-4 text-base border rounded-xl",
                  confirmTouched && newPassProvided
                    ? passwordsMatch
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300",
                ].join(" ")}
                autoComplete="new-password"
                placeholder="Digite novamente para confirmar"
              />
              {confirmTouched && newPassProvided && !passwordsMatch && (
                <p className="mt-2 text-sm text-red-600">
                  As senhas não coincidem.
                </p>
              )}
              {confirmTouched &&
                newPassProvided &&
                passwordsMatch &&
                newPassValid && (
                  <p className="mt-2 text-sm text-green-600">
                    Senhas conferem.
                  </p>
                )}
            </div>

            {/* Mostrar senhas (AGORA aqui embaixo) */}
            <div className="flex items-center gap-3">
              <input
                id="toggle-visibility"
                type="checkbox"
                className="h-5 w-5"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
              />
              <label
                htmlFor="toggle-visibility"
                className="text-base text-gray-700"
              >
                Mostrar senhas
              </label>
            </div>

            <p className="text-base text-gray-500">
              Dica: use pelo menos 8 caracteres. Misture letras
              maiúsculas/minúsculas, números e símbolos para maior segurança.
            </p>

            {/* Mensagens */}
            {msg && (
              <p
                className={[
                  "text-base font-medium",
                  msg.type === "success" ? "text-green-600" : "text-red-600",
                ].join(" ")}
              >
                {msg.text}
              </p>
            )}

            {/* Ações */}
            <div className="flex items-center justify-end gap-4 border-t pt-8">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={isSaving || (!hasProfileChanges && !newPassProvided)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={disableSave}
                className="bg-primary text-white font-semibold px-7 py-3 rounded-xl hover:brightness-95 disabled:opacity-60"
              >
                {isSaving ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Configuracoes;
