import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import logoOficial from '../assets/logoOficial.png';
import web from '../assets/web.svg';
import instagram from '../assets/instagram.svg';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/vagas');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Email ou senha incorretos.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen bg-body flex items-center justify-center">
        <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl bg-white rounded-[14px] border [border-color:rgba(23,32,74,.2)] shadow-[0_30px_60px_rgba(20,30,70,.40)] overflow-hidden">

          <div className="hidden md:block absolute inset-y-0 right-0 md:w-[120px] lg:w-[150px] xl:w-[250px]  bg-gradient-to-b from-white to-[#9ea5a9]"></div>

          <div className="relative z-10 p-6 sm:p-8 md:pr-10 md:w-[calc(100%-120px)] lg:w-[calc(100%-150px)] xl:w-[calc(100%-180px)]">
            <img src={logoOficial} alt="LogoOficial" className="h-[60px] md:h-[72px] mb-4" />

            <h2 className="mb-6 uppercase tracking-wide font-semibold text-primary ml-6">
              Carreiras
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
              <div>
                <label className="block font-bold text-primary text-[0.92rem] mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 w-full px-5 rounded-[10px] bg-white border border-[#d7def3] outline-none focus:ring-2 focus:ring-[#203a8a]/30"
                    placeholder="Usuário"
                    autoComplete="username"
                />
              </div>

              <div>
                <label className="block font-bold text-primary text-[0.92rem] mb-1">Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 w-full px-5 rounded-[10px] bg-white border border-[#d7def3] outline-none focus:ring-2 focus:ring-[#203a8a]/30"
                    placeholder="Senha"
                    autoComplete="current-password"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center h-10 px-6 rounded-[12px] bg-[#203a8a]
              text-white font-extrabold tracking-[.02em] shadow-[0_10px_24px_rgba(32,58,138,.22)]
              hover:brightness-95 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className="ml-3">Entrando...</span>
                    </>
                ) : (
                    'Entrar'
                )}
              </button>

              <button
                  type="button"
                  onClick={() => navigate('/recuperar-senha')}
                  className="block mt-0 text-slate-500 text-sm underline underline-offset-4
              hover:text-slate-700 focus:outline-none cursor-pointer"
              >
                Esqueceu a Senha?
              </button>
            </form>
          </div>

          <div className="hidden md:flex absolute bottom-0 right-0 h-16 md:w-[120px] lg:w-[150px] xl:w-[250px] items-center justify-center gap-8 bg-[#6c757dS] backdrop-blur-sm ring-1 ring-white/30">
            <img src={web} alt="Web" className="h-6 w-6 cursor-pointer hover:scale-110 transition" />
            <img src={instagram} alt="Instagram" className="h-6 w-6 cursor-pointer hover:scale-110 transition" />
            <span className="text-white font-bold text-xl">@</span>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;