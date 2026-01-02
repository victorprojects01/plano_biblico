
import React from 'react';
import { ReadingDay, User } from '../types';
import { CheckCircle2, Circle, Share2, Sparkles, TrendingUp, BookOpen } from 'lucide-react';
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
    return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(date);
  };

  const hasReading = todayReading.chapters.length > 0;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Olá, {progress.name.split(' ')[0]}</h2>
          <p className="text-slate-400 font-medium text-sm">Sua jornada espiritual continua.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
          <TrendingUp size={12} />
          {formatDate(todayReading.date)}
        </div>
      </header>

      {/* Hero Card */}
      <div className={`relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500 ${
        isCompleted ? 'bg-slate-900 text-white' : 'bg-white shadow-xl shadow-indigo-100/40 border border-indigo-50/50'
      }`}>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className={isCompleted ? 'text-indigo-400' : 'text-indigo-600'} size={18} />
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCompleted ? 'text-indigo-300' : 'text-indigo-600/60'}`}>
              {hasReading ? 'Leitura de Hoje' : 'Momento de Preparação'}
            </span>
          </div>

          <div className="space-y-3 mb-10">
            {hasReading ? (
              todayReading.chapters.map((chunk, idx) => (
                <h3 key={idx} className="text-3xl font-extrabold tracking-tighter leading-tight">
                  {chunk}
                </h3>
              ))
            ) : (
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl font-extrabold tracking-tighter leading-tight text-indigo-600">
                  {todayReading.reading}
                </h3>
                <p className={`text-sm font-medium ${isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>
                  Aproveite para organizar seu local de leitura e preparar o coração para o plano de 2026.
                </p>
              </div>
            )}
          </div>

          <button 
            onClick={() => onToggleComplete(todayReading.id)}
            className={`w-full py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-lg ${
              isCompleted 
              ? 'bg-emerald-500 text-white shadow-emerald-200' 
              : 'bg-indigo-600 text-white shadow-indigo-200'
            }`}
          >
            {isCompleted ? <CheckCircle2 size={22} /> : (hasReading ? <Circle size={22} /> : <BookOpen size={22} />)}
            <span className="font-bold text-lg">
              {isCompleted ? 'Concluído' : (hasReading ? 'Marcar como Lido' : 'Concluir Preparação')}
            </span>
          </button>
        </div>
      </div>

      {/* Quote Card */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm text-slate-500">
        <p className="text-sm font-semibold leading-relaxed mb-4 italic text-slate-600">
          "{randomQuote}"
        </p>
        <div className="w-8 h-1 bg-indigo-200 rounded-full"></div>
      </div>

      <button 
        className="flex items-center justify-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:text-indigo-600 transition-colors"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Save - Plano de Leitura',
              text: hasReading ? `Minha leitura bíblica de hoje: ${todayReading.reading}` : `Estou iniciando minha jornada no Save! Hoje é dia de preparação.`,
              url: window.location.href
            });
          }
        }}
      >
        <Share2 size={14} />
        Compartilhar progresso
      </button>
    </div>
  );
};

export default HomeView;
