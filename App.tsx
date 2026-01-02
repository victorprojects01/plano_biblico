
import React from 'react';
import Layout from './components/Layout';
import HomeView from './components/Home';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';
import { ViewState, User } from './types';
import { generate2026Plan } from './constants';
import { storageService } from './services/storageService';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Zap, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [activeView, setActiveView] = React.useState<ViewState>('home');
  const [configMissing, setConfigMissing] = React.useState(false);
  
  const plan = React.useMemo(() => generate2026Plan(), []);

  const syncUserData = async (uid: string) => {
    try {
      const [profile, completedDays] = await Promise.all([
        storageService.getProfile(uid),
        storageService.getReadingProgress(uid)
      ]);

      if (profile) {
        setCurrentUser({
          email: profile.email || '',
          name: profile.full_name || 'Membro do Plano',
          completedDays: completedDays
        });
      }
    } catch (err) {
      console.error('Erro ao sincronizar dados:', err);
    }
  };

  React.useEffect(() => {
    // Se as chaves parecem estar corretas, tentamos iniciar
    if (!isSupabaseConfigured()) {
      setConfigMissing(true);
      setIsInitializing(false);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        await syncUserData(session.user.id);
      } else {
        setUserId(null);
        setCurrentUser(null);
      }
      setIsInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getTodayId = () => {
    const today = new Date();
    const d2026 = new Date(2026, today.getMonth(), today.getDate());
    return d2026.toISOString().split('T')[0];
  };

  const todayId = getTodayId();
  const todayReading = plan[todayId] || plan['2026-01-01'];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setActiveView('home');
  };

  const toggleComplete = async (id: string) => {
    if (!currentUser || !userId) return;

    const isCompleted = currentUser.completedDays.includes(id);
    
    // UI Otimista
    const newCompleted = isCompleted 
      ? currentUser.completedDays.filter(dayId => dayId !== id)
      : [...currentUser.completedDays, id];
    
    setCurrentUser({ ...currentUser, completedDays: newCompleted });

    try {
      if (isCompleted) {
        await storageService.uncompleteDay(userId, id);
      } else {
        await storageService.completeDay(userId, id);
      }
    } catch (err) {
      console.error('Erro ao persistir no banco:', err);
      await syncUserData(userId);
    }
  };

  if (configMissing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-4">Verifique as Credenciais</h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          As chaves do Supabase no arquivo <code className="bg-slate-200 px-1 rounded text-pink-600 font-mono">lib/supabase.ts</code> parecem estar ausentes ou incorretas.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all"
        >
          Já atualizei, recarregar app
        </button>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
          <Zap className="text-white" size={40} fill="currentColor" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter mt-6 mb-2">SAVE.</h1>
        <p className="text-indigo-400/60 font-bold uppercase tracking-[0.3em] text-[10px]">Conectando ao banco de dados...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthView onLogin={() => {}} />;
  }

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'home' && (
        <HomeView 
          todayReading={todayReading} 
          progress={currentUser} 
          onToggleComplete={toggleComplete} 
        />
      )}
      {activeView === 'calendar' && (
        <CalendarView 
          plan={plan} 
          progress={currentUser} 
          onDayClick={(day) => toggleComplete(day.id)} 
        />
      )}
      {activeView === 'profile' && (
        <ProfileView 
          user={currentUser} 
          onLogout={handleLogout}
        />
      )}
    </Layout>
  );
};

export default App;
