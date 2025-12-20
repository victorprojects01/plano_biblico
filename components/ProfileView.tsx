
import React from 'react';
import { User } from '../types';
import { Award, Zap, Flame, LogOut, Mail, Settings } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const totalDays = 365;
  const completedCount = user.completedDays.length;
  const percentage = Math.round((completedCount / totalDays) * 100);
  const streak = completedCount > 0 ? Math.min(completedCount, 7) : 0;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-[1.5rem] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-indigo-200">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{user.name}</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{user.email}</p>
          </div>
        </div>
        <button onClick={onLogout} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-pink-500 transition-all">
          <LogOut size={20} />
        </button>
      </header>

      {/* Progress Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-50/50 border border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-1 block">Level do App</span>
            <h3 className="text-4xl font-extrabold text-slate-900">{percentage}%</h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-orange-500">
              <Flame size={24} fill="currentColor" />
              <span className="text-2xl font-black tracking-tighter">{streak}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dais On</span>
          </div>
        </div>
        
        <div className="w-full h-5 bg-slate-50 rounded-full border-2 border-slate-100 p-1 mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg transition-all duration-1000"
            style={{ width: `${Math.max(percentage, 5)}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 flex flex-col items-center gap-1 group">
            <Zap className="text-indigo-500 mb-2 group-hover:scale-125 transition-transform" size={28} fill="currentColor" />
            <span className="text-3xl font-black text-slate-900">{completedCount}</span>
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Lidos</span>
          </div>
          <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-slate-100 flex flex-col items-center gap-1 group">
            <Award className="text-pink-500 mb-2 group-hover:scale-125 transition-transform" size={28} fill="currentColor" />
            <span className="text-3xl font-black text-slate-900">{totalDays - completedCount}</span>
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Faltam</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
        <h4 className="text-xl font-extrabold mb-3 relative z-10 flex items-center gap-2">
          Keep going! <Zap size={20} className="text-indigo-400" />
        </h4>
        <p className="text-slate-400 font-medium leading-relaxed relative z-10">
          Você já está à frente de 85% dos usuários que começaram o plano. Constância é o seu superpoder.
        </p>
      </div>
    </div>
  );
};

export default ProfileView;
