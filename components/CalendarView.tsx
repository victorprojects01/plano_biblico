
import React from 'react';
import { BiblePlanData, UserProgress, ReadingDay } from '../types';
import { Check, ChevronLeft, ChevronRight, Book } from 'lucide-react';

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

  const handleSelectDay = (day: ReadingDay) => {
    setSelectedDay(day);
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth);
    const startDay = firstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-11 w-full"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateId = new Date(2026, currentMonth.getMonth(), d).toISOString().split('T')[0];
      const dayData = plan[dateId];
      const isCompleted = progress.completedDays.includes(dateId);
      const isToday = dateId === new Date().toISOString().split('T')[0];
      const isSelected = selectedDay?.id === dateId;

      days.push(
        <button
          key={dateId}
          onClick={() => handleSelectDay(dayData)}
          className={`h-11 w-full flex flex-col items-center justify-center relative rounded-xl transition-all ${
            isCompleted ? 'bg-[#556B2F]/10 text-[#556B2F]' : 'text-gray-700'
          } ${isToday ? 'ring-2 ring-[#D4AF37] ring-inset' : ''} ${
            isSelected ? 'bg-[#556B2F] text-white' : 'hover:bg-gray-100'
          }`}
        >
          <span className={`text-xs ${isSelected ? 'font-bold' : 'font-medium'}`}>{d}</span>
          {isCompleted && !isSelected && <Check size={10} className="text-[#556B2F] mt-0.5" />}
        </button>
      );
    }

    return days;
  };

  const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(currentMonth);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h2 className="text-3xl font-serif font-bold text-[#3D3D3D] mb-2">Plano de Leitura</h2>
        <p className="text-gray-500 text-sm">Explore as 52 semanas do plano de 2026.</p>
      </section>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E1D5]">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => changeMonth(-1)}
            disabled={currentMonth.getMonth() === 0}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-20 transition-opacity"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="capitalize font-bold text-[#556B2F] tracking-tight">{monthName}</h3>
          <button 
            onClick={() => changeMonth(1)}
            disabled={currentMonth.getMonth() === 11}
            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-20 transition-opacity"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-3">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
            <span key={i} className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {renderDays()}
        </div>
      </div>

      {selectedDay ? (
        <div className="bg-[#556B2F] text-white p-6 rounded-3xl shadow-lg animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(selectedDay.date)}
              </p>
              <h4 className="text-xl font-serif font-bold">Leitura Selecionada</h4>
            </div>
            <button 
              onClick={() => onDayClick(selectedDay)}
              className={`p-2 rounded-full ${progress.completedDays.includes(selectedDay.id) ? 'bg-white text-[#556B2F]' : 'bg-white/20 text-white'}`}
            >
              <Check size={18} />
            </button>
          </div>
          <p className="text-lg leading-snug">{selectedDay.reading}</p>
          <p className="mt-4 text-[10px] opacity-60 italic">* Toque no check acima para concluir este dia.</p>
        </div>
      ) : (
        <div className="flex gap-4 items-center p-5 bg-white rounded-3xl border border-[#E8E1D5] text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#556B2F]/20 border border-[#556B2F]/30"></div>
            <span>Concluído</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-[#E8E1D5]"></div>
            <span>Pendente</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full ring-2 ring-[#D4AF37] ring-offset-1"></div>
            <span>Hoje</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
