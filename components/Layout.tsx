
import React from 'react';
import { ViewState } from '../types';
import { Home, Calendar, User, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#F8FAFC] relative">
      {/* Header Minimalista */}
      <header className="pt-8 pb-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#6366F1] to-[#EC4899] rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="text-white" size={18} fill="currentColor" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            SAVE<span className="text-[#6366F1]">.</span>
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-6 pb-32">
        {children}
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-40 max-w-md mx-auto">
        <nav className="glass rounded-[2rem] shadow-2xl shadow-indigo-200/50 p-2 flex justify-between items-center">
          <button 
            onClick={() => onViewChange('home')}
            className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all duration-300 ${
              activeView === 'home' ? 'bg-[#6366F1] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Início</span>
          </button>
          
          <button 
            onClick={() => onViewChange('calendar')}
            className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all duration-300 ${
              activeView === 'calendar' ? 'bg-[#6366F1] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Calendar size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Plano</span>
          </button>
          
          <button 
            onClick={() => onViewChange('profile')}
            className={`flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all duration-300 ${
              activeView === 'profile' ? 'bg-[#6366F1] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Perfil</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
