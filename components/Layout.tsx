
import React from 'react';
import { ViewState } from '../types';
import { Home, Calendar, User, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto shadow-xl bg-[#FDFBF7]">
      {/* Header */}
      <header className="pt-8 pb-4 px-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10 border-b border-[#E8E1D5]">
        <div className="flex items-center gap-2">
          <BookOpen className="text-[#556B2F]" size={24} />
          <h1 className="text-2xl font-semibold text-[#556B2F] tracking-tight">Reading Saves</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E1D5] safe-bottom max-w-md mx-auto z-20">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => onViewChange('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'home' ? 'text-[#556B2F]' : 'text-gray-400'}`}
          >
            <Home size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Hoje</span>
          </button>
          <button 
            onClick={() => onViewChange('calendar')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'calendar' ? 'text-[#556B2F]' : 'text-gray-400'}`}
          >
            <Calendar size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Plano</span>
          </button>
          <button 
            onClick={() => onViewChange('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeView === 'profile' ? 'text-[#556B2F]' : 'text-gray-400'}`}
          >
            <User size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
