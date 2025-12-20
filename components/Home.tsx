
import React from 'react';
import { ReadingDay, User } from '../types';
import { CheckCircle2, Circle, Share2, Sparkles, TrendingUp } from 'lucide-react';
import { MOTIVATIONAL_MESSAGES } from '../constants';

interface HomeProps {
  todayReading: ReadingDay;
  progress: User;
  onToggleComplete: (id: string) => void;
}

const HomeView: React.FC<HomeProps> = ({ todayReading, progress, onToggleComplete }) => {
  const isCompleted = progress.completedDays.includes(todayReading.id);
  const randomQuote = React.useMemo(() => {
    return MOTIVATIONAL_MESSAGES[todayReading.dayOfYear % MOTIVATIONAL_MESSAGES.length];
  }, [todayReading.dayOfYear]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'short'
    }).format(date);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Fala, {progress.name.split(' ')[0]}!</h2>
          <p className="text-slate-400 font-medium">Bora pra leitura de hoje?</p>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-2xl text-xs font-bold border border-indigo-100 flex items-center gap-2">
          <TrendingUp size={14} />
          {formatDate(todayReading.date)}
        </div>
      </header>

      {/* Card de Leitura Principal */}
      <div className={`relative group overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500 transform ${
        isCompleted ? 'bg-slate-900 text-white' : 'bg-white shadow-xl shadow-indigo-100/50'
      }`}>
        {/* Glow Decorativo */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className={isCompleted ? 'text-indigo-400' : 'text-indigo-600'} size={20} />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCompleted ? 'text-indigo-300' : 'text-indigo-600/60'}`}>
              Missão do Dia
            </span>
          </div>

          <div className="space-y-4 mb-10">
            {todayReading.chapters.map((chunk, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-1.5 h-6 rounded-full ${isCompleted ? 'bg-indigo-400' : 'bg-indigo-600'}`}></div>
                <h3 className="text-3xl font-extrabold tracking-tight leading-tight">{chunk}</h3>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onToggleComplete(todayReading.id)}
            className={`w-full py-5 rounded-3xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 btn-glow ${
              isCompleted 
              ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white' 
              : 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white'
            }`}
          >
            {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            <span className="font-bold text-lg">{isCompleted ? 'Missão Cumprida!' : 'Concluir Agora'}</span>
          </button>
        </div>
      </div>

      {/* Card de Quote / Insights */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-[2rem] p-6 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
          <Sparkles size={80} />
        </div>
        <p className="text-lg font-semibold leading-relaxed relative z-10 mb-4 italic text-slate-200">
          "{randomQuote}"
        </p>
        <div className="w-10 h-1 bg-indigo-500 rounded-full"></div>
      </div>

      <button 
        className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest py-4 hover:text-indigo-600 transition-colors"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Save. App',
              text: `Minha leitura de hoje no Save: ${todayReading.reading}`,
              url: window.location.href
            });
          }
        }}
      >
        <Share2 size={16} />
        Compartilhar vibe
      </button>
    </div>
  );
};

export default HomeView;
