
import React from 'react';
import { BookOpen, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { storageService } from '../services/storageService';
import { User } from '../types';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [isSimulatingGoogle, setIsSimulatingGoogle] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const users = storageService.getUsers();
    const emailKey = email.toLowerCase();

    if (isLogin) {
      const user = users[emailKey];
      if (user && user.password === password) {
        storageService.setSession(emailKey);
        onLogin(user);
      } else {
        setError('E-mail ou senha incorretos.');
      }
    } else {
      if (users[emailKey]) {
        setError('Este e-mail já está cadastrado.');
        return;
      }
      const newUser: User = {
        email: emailKey,
        name,
        password,
        completedDays: []
      };
      storageService.saveUser(newUser);
      storageService.setSession(emailKey);
      onLogin(newUser);
    }
  };

  const handleGoogleLogin = () => {
    setIsSimulatingGoogle(true);
    setError('');
    
    // Simulação de delay de autenticação do Google
    setTimeout(() => {
      const mockGoogleEmail = "usuario.google@gmail.com";
      const mockGoogleName = "Usuário Google";
      const users = storageService.getUsers();
      
      let user = users[mockGoogleEmail];
      
      if (!user) {
        user = {
          email: mockGoogleEmail,
          name: mockGoogleName,
          completedDays: []
        };
        storageService.saveUser(user);
      }
      
      storageService.setSession(mockGoogleEmail);
      onLogin(user);
      setIsSimulatingGoogle(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 max-w-md mx-auto shadow-2xl">
      <div className="w-full flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="bg-[#556B2F] p-4 rounded-3xl mb-6 shadow-lg shadow-[#556B2F]/20">
          <BookOpen className="text-white" size={40} />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#3D3D3D] mb-2">Reading Saves</h1>
        <p className="text-gray-500 text-center text-sm px-8">
          Sua jornada diária através das Escrituras começa aqui.
        </p>
      </div>

      <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-sm border border-[#E8E1D5] animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex gap-4 mb-8 p-1 bg-[#FDFBF7] rounded-2xl border border-[#E8E1D5]">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${isLogin ? 'bg-white shadow-sm text-[#556B2F]' : 'text-gray-400'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${!isLogin ? 'bg-white shadow-sm text-[#556B2F]' : 'text-gray-400'}`}
          >
            Criar Conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]/20 transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FDFBF7] border border-[#E8E1D5] rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]/20 transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center font-medium animate-pulse">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSimulatingGoogle}
            className="w-full bg-[#556B2F] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-6 hover:bg-[#3D4D22] transition-colors shadow-lg shadow-[#556B2F]/20 group active:scale-[0.98] disabled:opacity-50"
          >
            {isLogin ? 'Entrar na Conta' : 'Começar Agora'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E1D5]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">ou</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isSimulatingGoogle}
          className="w-full bg-white border-2 border-[#E8E1D5] text-gray-600 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isSimulatingGoogle ? (
            <div className="w-5 h-5 border-2 border-[#556B2F] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continuar com Google</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-8 text-xs text-gray-400 text-center leading-relaxed">
        Ao continuar, você concorda em manter seu progresso de leitura salvo localmente neste dispositivo.
      </p>
    </div>
  );
};

export default AuthView;
