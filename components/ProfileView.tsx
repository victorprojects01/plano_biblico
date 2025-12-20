
import React from 'react';
import { User } from '../types';
import { Award, Target, BookOpen, LogOut, Mail } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const totalDays = 365;
  const completedCount = user.completedDays.length;
  const percentage = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <section className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#3D3D3D] mb-1">Olá, {user.name}</h2>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Mail size={12} />
            <span>{user.email}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </section>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#E8E1D5]">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progresso do Plano 2026</span>
              <span className="text-3xl font-serif font-bold text-[#556B2F]">{percentage}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 border border-gray-50">
              <div 
                className="h-full bg-[#556B2F] transition-all duration-1000 ease-out rounded-full shadow-inner"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8E1D5] flex flex-col items-center gap-2">
              <div className="bg-white p-2 rounded-xl shadow-sm border border-[#E8E1D5] mb-2">
                <Target size={24} className="text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest text-center">Dias Lidos</span>
              <span className="text-2xl font-bold text-[#3D3D3D]">{completedCount}</span>
            </div>
            <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#E8E1D5] flex flex-col items-center gap-2">
              <div className="bg-white p-2 rounded-xl shadow-sm border border-[#E8E1D5] mb-2">
                <Award size={24} className="text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest text-center">Dias Restantes</span>
              <span className="text-2xl font-bold text-[#3D3D3D]">{totalDays - completedCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E8E1D5] rounded-3xl p-6 flex flex-col gap-4">
        <h3 className="font-serif font-bold text-xl text-[#3D3D3D]">Estatísticas da Jornada</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm py-2 border-b border-gray-50">
            <span className="text-gray-500">Média de leitura</span>
            <span className="font-semibold text-[#556B2F]">{Math.round(completedCount / 12) || 0} dias/mês</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-gray-50">
            <span className="text-gray-500">Status do Plano</span>
            <span className="font-semibold text-[#D4AF37]">{percentage > 50 ? 'Excelente' : 'Constante'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#556B2F] text-white p-8 rounded-[2.5rem] shadow-lg shadow-[#556B2F]/10">
        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
          <BookOpen size={28} />
        </div>
        <div>
          <h4 className="font-bold text-xl font-serif">A Palavra é Vida</h4>
          <p className="text-sm opacity-80 leading-snug">Seu compromisso com a leitura bíblica transforma seu coração dia após dia.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
