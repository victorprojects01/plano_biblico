
import React from 'react';
import { ReadingDay, UserProgress } from '../types';
import { CheckCircle, Circle, Quote, BookOpen } from 'lucide-react';
import { MOTIVATIONAL_MESSAGES } from '../constants';

interface HomeProps {
  todayReading: ReadingDay;
  progress: UserProgress;
  onToggleComplete: (id: string) => void;
}

const HomeView: React.FC<HomeProps> = ({ todayReading, progress, onToggleComplete }) => {
  const isCompleted = progress.completedDays.includes(todayReading.id);
  const randomQuote = React.useMemo(() => {
    return MOTIVATIONAL_MESSAGES[todayReading.dayOfYear % MOTIVATIONAL_MESSAGES.length];
  }, [todayReading.dayOfYear]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const currentWeek = Math.ceil(todayReading.dayOfYear / 7);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <section>
        <div className="flex justify-between items-end mb-1">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            {formatDate(todayReading.date)}
          </p>
          <span className="bg-[#556B2F]/10 text-[#556B2F] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
            Semana {currentWeek}
          </span>
        </div>
        <h2 className="text-4xl font-serif font-bold text-[#3D3D3D]">Leitura de Hoje</h2>
      </section>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E1D5] relative overflow-hidden">
        <div className="absolute -top-4 -right-4 p-4 opacity-[0.03]">
          <BookOpen size={160} className="text-[#556B2F]" />
        </div>
        
        <div className="relative z-10">
          <p className="text-[#556B2F] text-xs font-bold uppercase tracking-widest mb-4 opacity-70">Metas da Semana</p>
          
          <div className="flex flex-col gap-3 mb-10">
            {todayReading.chapters.map((chunk, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                <p className="text-2xl font-serif text-[#3D3D3D] leading-tight">{chunk}</p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onToggleComplete(todayReading.id)}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-sm ${
              isCompleted 
              ? 'bg-[#556B2F] text-white shadow-[#556B2F]/20' 
              : 'bg-white border-2 border-[#556B2F] text-[#556B2F] hover:bg-[#556B2F]/5'
            }`}
          >
            {isCompleted ? <CheckCircle size={22} /> : <Circle size={22} />}
            <span className="font-semibold">{isCompleted ? 'Leitura Concluída' : 'Marcar como lida'}</span>
          </button>
        </div>
      </div>

      <div className="bg-[#556B2F]/5 rounded-3xl p-8 border border-[#556B2F]/10 italic text-[#556B2F]">
        <Quote className="mb-4 opacity-40" size={32} />
        <p className="text-lg leading-relaxed font-serif">
          "{randomQuote}"
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest opacity-60">— Permaneça na Palavra</p>
      </div>
      
      {!progress.name && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-800 text-xs leading-relaxed flex items-start gap-3">
          <span className="text-lg">💡</span>
          <span>Dica: Registre seu nome no <strong>Perfil</strong> para acompanhar seu progresso anual detalhado.</span>
        </div>
      )}
    </div>
  );
};

export default HomeView;
