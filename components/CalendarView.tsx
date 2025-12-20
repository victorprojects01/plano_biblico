
import React from 'react';
import { BiblePlanData, UserProgress, ReadingDay } from '../types';
import { Check, ChevronLeft, ChevronRight, Zap, Star } from 'lucide-react';

interface CalendarViewProps {
  plan: BiblePlanData;
  progress: UserProgress;
  onDayClick: (day: ReadingDay) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ plan, progress, onDayClick }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2026, 0, 1));
  const [selectedDay, setSelectedDay] = React.useState<ReadingDay | null>(null);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (offset: number) => {
    const next = new Date(currentMonth);
    next.setMonth(currentMonth.getMonth() + offset);
    if (next.getFullYear() === 2026) {
      setCurrentMonth(next);
      setSelectedDay(null);
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-full"></div>);
    }

    const todayId = new Date().toISOString().split('T')[0];

    for (let d = 1; d <= totalDays; d++) {
      const dateId = new Date(2026, currentMonth.getMonth(), d).toISOString().split('T')[0];
      const dayData = plan[dateId];
      const isCompleted = progress.completedDays.includes(dateId);
      const isToday = dateId === todayId || (d === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth());
      const isSelected = selectedDay?.id === dateId;

      days.push(
        <button
          key={dateId}
          onClick={() => setSelectedDay(dayData)}
          className={`h-12 w-full flex flex-col items-center justify-center relative rounded-2xl transition-all duration-300 ${
            isCompleted 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : isSelected
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-100 hover:border-indigo-300'
          } ${isToday ? 'ring-2 ring-pink-500 ring-offset-2 z-10' : ''}`}
        >
          <span className={`text-xs font-black`}>{d}</span>
          {isCompleted && <Zap size={8} className="absolute top-1 right-1 text-indigo-200" fill="currentColor" />}
        </button>
      );
    }

    return days;
  };

  const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(currentMonth);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tighter mb-1">Seu Plano</h2>
        <p className="text-slate-400 font-medium text-sm italic">2026 é o ano da sua constância.</p>
      </section>

      <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-50">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => changeMonth(-1)}
            disabled={currentMonth.getMonth() === 0}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 disabled:opacity-20 transition-all hover:bg-slate-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="capitalize font-black text-slate-900 tracking-widest text-sm uppercase">{monthName} 2026</h3>
          <button 
            onClick={() => changeMonth(1)}
            disabled={currentMonth.getMonth() === 11}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 disabled:opacity-20 transition-all hover:bg-slate-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-[10px] font-black text-slate-300 uppercase">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderDays()}
        </div>
      </div>

      {selectedDay ? (
        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Star size={80} fill="currentColor" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 block mb-1">
                  {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(selectedDay.date)}
                </span>
                <h4 className="text-2xl font-extrabold tracking-tight">Leitura do Dia</h4>
              </div>
              <button 
                onClick={() => onDayClick(selectedDay)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  progress.completedDays.includes(selectedDay.id) 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                <Check size={28} strokeWidth={3} />
              </button>
            </div>
            
            <div className="space-y-2 mb-4">
              {selectedDay.chapters.map((chunk, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                   <p className="text-xl font-bold text-slate-100">{chunk}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Toque no ícone ao lado para concluir</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-around items-center p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Lido</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-white border border-slate-200"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Pendente</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full ring-2 ring-pink-500 ring-offset-1"></div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Hoje</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
