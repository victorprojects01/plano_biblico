
import React from 'react';
import { User } from '../types';
import { Award, Target, BookOpen, LogOut, Mail, Flame } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const totalDays = 365;
  const completedCount = user.completedDays.length;
  const percentage = Math.round((completedCount / totalDays) * 100);
  
  // Fake streak for motivation based on recent checks
  const streak = completedCount > 0 ? Math.min(completedCount, 7) : 0;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#556B2F] rounded-full flex items-center justify-center text-white text-xl font-serif font-bold shadow-lg shadow-[#556B2F]/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#3D3D3D]">{user.name}</h2>
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
              <Mail size={10} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="p-3 bg-white border border-[#E8E1D5] text-gray-400 rounded-2xl hover:text-red-500 hover:border-red-100 transition-all active:scale-95"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </section>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/[0.02] border border-[#E8E1D5]">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Progresso 2026</p>
                <span className="text-3xl font-serif font-bold text-[#3D3D3D]">{percentage}%</span>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Flame size={16} fill="currentColor" />
                  <span className="text-lg font-bold font-serif">{streak}</span>
                </div>
                <p className="text-[8px] font-bold text-gray-400 uppercase">Sequência</p>
              </div>
            </div>
            <div className="w-full h-4 bg-[#FDFBF7] rounded-full overflow-hidden p-1 border border-[#E8E1D5] shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#556B2F] to-[#7A934E] transition-all duration-1000 ease-out rounded-full shadow-sm"
                style={{ width: `${Math.max(percentage, 2)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FDFBF7] p-6 rounded-[2rem] border border-[#E8E1D5] flex flex-col items-center gap-2 group hover:border-[#556B2F] transition-colors">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#E8E1D5] mb-2 group-hover:scale-110 transition-transform">
                <Target size={24} className="text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest text-center">Dias Lidos</span>
              <span className="text-2xl font-bold text-[#3D3D3D]">{completedCount}</span>
            </div>
            <div className="bg-[#FDFBF7] p-6 rounded-[2rem] border border-[#E8E1D5] flex flex-col items-center gap-2 group hover:border-[#556B2F] transition-colors">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#E8E1D5] mb-2 group-hover:scale-110 transition-transform">
                <Award size={24} className="text-[#D4AF37]" />
              </div>
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest text-center">Restantes</span>
              <span className="text-2xl font-bold text-[#3D3D3D]">{totalDays - completedCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#556B2F] text-white p-8 rounded-[2.5rem] shadow-2xl shadow-[#556B2F]/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
           <BookOpen size={100} />
        </div>
        <div className="relative z-10">
          <h4 className="font-bold text-2xl font-serif mb-2">Continue firme</h4>
          <p className="text-sm opacity-90 leading-relaxed font-medium">
            "Não se aparte da tua boca o livro desta lei; antes medita nele dia e noite."
          </p>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-60">Josué 1:8</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
