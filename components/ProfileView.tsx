
import React from 'react';
import { UserProgress } from '../types';
import { Award, Target, BookOpen } from 'lucide-react';

interface ProfileViewProps {
  progress: UserProgress;
  onUpdateName: (name: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ progress, onUpdateName }) => {
  const [editingName, setEditingName] = React.useState(progress.name);
  const totalDays = 365;
  const completedCount = progress.completedDays.length;
  const percentage = Math.round((completedCount / totalDays) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(editingName);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <section>
        <h2 className="text-3xl font-serif font-bold text-[#3D3D3D] mb-2">Seu Progresso</h2>
        <p className="text-gray-500 text-sm">Personalize sua jornada e veja suas conquistas.</p>
      </section>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8E1D5]">
        <form onSubmit={handleSubmit} className="mb-8">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nome</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Como deseja ser chamado?"
              className="flex-1 bg-[#FDFBF7] border border-[#E8E1D5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#556B2F]/20"
            />
            <button 
              type="submit"
              className="bg-[#556B2F] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#3D4D22] transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-gray-600">Progresso Anual</span>
              <span className="text-2xl font-serif font-bold text-[#556B2F]">{percentage}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#556B2F] transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8E1D5] flex flex-col items-center gap-2">
              <Target size={20} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">Lidos</span>
              <span className="text-xl font-bold">{completedCount}</span>
            </div>
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8E1D5] flex flex-col items-center gap-2">
              <Award size={20} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">Restantes</span>
              <span className="text-xl font-bold">{totalDays - completedCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#556B2F] text-white p-6 rounded-3xl">
        <div className="bg-white/20 p-3 rounded-2xl">
          <BookOpen size={24} />
        </div>
        <div>
          <h4 className="font-bold text-lg font-serif">A Palavra Salva</h4>
          <p className="text-sm opacity-80">Continue firme no seu propósito diário de ler a Bíblia.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
