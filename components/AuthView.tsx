import React from 'react';
import { Zap, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password || (!isLogin && !name)) {
        setError('Por favor, preencha todos os campos.');
        setIsLoading(false);
        return;
      }

      const users = storageService.getUsers();
      const emailKey = email.toLowerCase().trim();

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
          setIsLoading(false);
          return;
        }
        const newUser: User = { 
          email: emailKey, 
          name: name.trim(), 
          password, 
          completedDays: [] 
        };
        storageService.saveUser(newUser);
        storageService.setSession(emailKey);
        onLogin(newUser);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-8 max-w-md mx-auto relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute top-[-10%] right-[-20%] w-80 h-80 bg-indigo-100 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-pink-100 rounded-full blur-[80px] opacity-60"></div>

      <div className="mt-12 mb-12 relative z-10">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#6366F1] to-[#EC4899] rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200 mb-8 float-animation">
          <Zap className="text-white" size={32} fill="currentColor" />
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 tracking-tighter mb-2">SAVE<span className="text-indigo-600">.</span></h1>
        <p className="text-slate-500 font-medium text-lg leading-tight">Seu plano de leitura bíblica diário.</p>
      </div>

      <div className="space-y-6 relative z-10">
        <div className="flex bg-slate-100 p-1.5 rounded-[1.25rem]">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
          >
            Acessar
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" placeholder="Nome completo" value={name} onChange={(e)=>setName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold focus:border-indigo-600 focus:bg-white outline-none transition-all"
              />
            </div>
          )}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold focus:border-indigo-600 focus:bg-white outline-none transition-all"
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="password" placeholder="Senha" value={password} onChange={(e)=>setPassword(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold focus:border-indigo-600 focus:bg-white outline-none transition-all"
            />
          </div>

          {error && (
            <div className="bg-pink-50 text-pink-600 p-4 rounded-xl text-xs font-bold border border-pink-100">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-extrabold flex items-center justify-center gap-3 active:scale-95 shadow-2xl shadow-slate-200 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isLogin ? 'Entrar' : 'Finalizar cadastro'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthView;