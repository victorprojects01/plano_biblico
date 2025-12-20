
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
  const [currentUser, setCurrentUser] = React.useState<User | null>(() => storageService.getCurrentUser());
  const [activeView, setActiveView] = React.useState<ViewState>('home');
  
  const plan = React.useMemo(() => generate2026Plan(), []);

  // Determine today's reading in the context of 2026
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
