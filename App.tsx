
import React from 'react';
import Layout from './components/Layout';
import HomeView from './components/Home';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';
import AuthView from './components/AuthView';
import { ViewState, ReadingDay, User } from './types';
import { generate2026Plan } from './constants';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [isInitializing, setIsInitializing] = React.useState(true);
  const [activeView, setActiveView] = React.useState<ViewState>('home');
  
  const plan = React.useMemo(() => generate2026Plan(), []);

  React.useEffect(() => {
    // Simula carregamento de sessão para suavizar entrada
    const timer = setTimeout(() => {
      const user = storageService.getCurrentUser();
      setCurrentUser(user);
      setIsInitializing(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const getTodayId = () => {
    const today = new Date();
    const d2026 = new Date(2026, today.getMonth(), today.getDate());
    return d2026.toISOString().split('T')[0];
  };

  const todayId = getTodayId();
  const todayReading = plan[todayId] || plan['2026-01-01'];

  const handleLogin = (user: User) => {
    setCurrentUser(user);
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

  const handleDayClickInCalendar = (day: ReadingDay) => {
    toggleComplete(day.id);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <div className="w-16 h-16 border-4 border-[#556B2F] border-t-transparent rounded-full animate-spin mb-6"></div>
        <h1 className="text-2xl font-serif font-bold text-[#556B2F] animate-pulse">Reading Saves</h1>
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
          onDayClick={handleDayClickInCalendar} 
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
