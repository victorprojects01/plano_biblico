
import React from 'react';
import Layout from './components/Layout';
import HomeView from './components/Home';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';
import { ViewState, ReadingDay, User } from './types';
import { generate2026Plan } from './constants';
import { storageService } from './services/storageService';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [activeView, setActiveView] = React.useState<ViewState>('home');
  
  const plan = React.useMemo(() => generate2026Plan(), []);

  React.useEffect(() => {
    // Carregamento imediato da sessão
    const user = storageService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    
    // Pequeno delay apenas para a animação de splash screen
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const getTodayId = () => {
    const today = new Date();
    // No contexto do app 2026, projetamos o dia atual para 2026
    const d2026 = new Date(2026, today.getMonth(), today.getDate());
    return d2026.toISOString().split('T')[0];
  };

  const todayId = getTodayId();
  const todayReading = plan[todayId] || plan['2026-01-01'];

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    // Força o scroll para o topo
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    storageService.setSession(null);
    setCurrentUser(null);
    setActiveView('home');
  };

  const toggleComplete = (id: string) => {
    if (!currentUser) return;

    const isCompleted = currentUser.completedDays.includes(id);
    const newCompleted = isCompleted 
      ? currentUser.completedDays.filter(dayId => dayId !== id)
      : [...currentUser.completedDays, id];
    
    const updatedUser = { ...currentUser, completedDays: newCompleted };
    setCurrentUser(updatedUser);
    storageService.saveUser(updatedUser);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 rounded-[2rem] blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 animate-bounce">
            <Zap className="text-white" size={48} fill="currentColor" />
          </div>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter mb-2">SAVE.</h1>
        <div className="w-12 h-1 bg-indigo-500 rounded-full mb-8 animate-pulse"></div>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Preparando seu 2026</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthView onLogin={handleLogin} />;
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
