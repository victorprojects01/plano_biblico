
import React from 'react';
import { ReadingDay, User } from '../types';
import { CheckCircle, Circle, Quote, BookOpen, Share2 } from 'lucide-react';
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
      weekday: 'long', 
      day: 'numeric', 
      month: 'long'
    }).format(date);
  };

  const currentWeek = Math.ceil(todayReading.dayOfYear / 7);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <section className="flex justify-between items-start">
        <div>
          <p className="text-[#556B2F] text-xs font-bold uppercase tracking-[0.2em] mb-1">
            {formatDate(todayReading.date)}
          </p>
          <h2 className="text-4xl font-serif font-bold text-[#3D3D3D]">Hoje</h2>
        </div>
        <div className="bg-[#556B2F] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          Semana {currentWeek}
        </div>
      </section>

      <div className={`bg-white rounded-[2.5rem] p-8 shadow-xl shadow-black/[0.03] border border-[#E8E1D5] relative overflow-hidden transition-all duration-500 ${isCompleted ? 'ring-2 ring-[#556B2F]' : ''}`}>
        <div className="absolute -top-10 -right-10 p-4 opacity-[0.03]">
          <BookOpen size={200} className="text-[#556B2F]" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-[#D4AF37]"></span>
            <p className="text-[#556B2F] text-[10px] font-bold uppercase tracking-widest">Plano de Leitura</p>
          </div>
          
          <div className="flex flex-col gap-4 mb-10">
            {todayReading.chapters.map((chunk, idx) => (
              <div key={idx} className="group flex items-start gap-4">
                <div className="mt-2 w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform"></div>
                <p className="text-2xl font-serif text-[#3D3D3D] leading-tight font-semibold">{chunk}</p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onToggleComplete(todayReading.id)}
            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 transform active:scale-95 shadow-lg ${
              isCompleted 
              ? 'bg-[#556B2F] text-white shadow-[#556B2F]/30' 
              : 'bg-white border-2 border-[#556B2F] text-[#556B2F] hover:bg-[#556B2F]/5 shadow-gray-200/50'
            }`}
          >
            {isCompleted ? <CheckCircle size={24} strokeWidth={2.5} /> : <Circle size={24} strokeWidth={2.5} />}
            <span className="font-bold tracking-wide">{isCompleted ? 'Concluído' : 'Marcar como Lido'}</span>
          </button>
        </div>
      </div>

      <div className="bg-[#556B2F]/5 rounded-[2rem] p-8 border border-[#556B2F]/10 relative group">
        <Quote className="absolute top-6 left-6 opacity-10 text-[#556B2F]" size={40} />
        <div className="relative z-10">
          <p className="text-xl leading-relaxed font-serif text-[#556B2F] text-center mb-4">
            "{randomQuote}"
          </p>
          <div className="flex justify-center">
            <div className="h-0.5 w-12 bg-[#D4AF37]/30"></div>
          </div>
        </div>
      </div>
      
      <button 
        className="flex items-center justify-center gap-2 text-gray-400 text-xs font-medium py-4 hover:text-[#556B2F] transition-colors"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Reading Saves',
              text: `Minha leitura de hoje: ${todayReading.reading}`,
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
