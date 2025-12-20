
import React from 'react';
import Layout from './components/Layout';
import HomeView from './components/Home';
import CalendarView from './components/CalendarView';
import ProfileView from './components/ProfileView';
import { ViewState, UserProgress, ReadingDay } from './types';
import { generate2026Plan } from './constants';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [activeView, setActiveView] = React.useState<ViewState>('home');
  const [progress, setProgress] = React.useState<UserProgress>(() => storageService.loadProgress());
  
  const plan = React.useMemo(() => generate2026Plan(), []);

  // Determine today's reading in the context of 2026
  const getTodayId = () => {
    const today = new Date();
    // For demo/consistency, we map current month/day to 2026
    const d2026 = new Date(2026, today.getMonth(), today.getDate());
    return d2026.toISOString().split('T')[0];
  };

  const todayId = getTodayId();
  const todayReading = plan[todayId] || plan['2026-01-01'];

  const toggleComplete = (id: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedDays.includes(id);
      const newCompleted = isCompleted 
        ? prev.completedDays.filter(dayId => dayId !== id)
        : [...prev.completedDays, id];
      
      const newProgress = { ...prev, completedDays: newCompleted };
      storageService.saveProgress(newProgress);
      return newProgress;
    });
  };

  const updateName = (name: string) => {
    setProgress(prev => {
      const newProgress = { ...prev, name };
      storageService.saveProgress(newProgress);
      return newProgress;
    });
  };

  const handleDayClickInCalendar = (day: ReadingDay) => {
    // If user clicks a day in calendar, we could either jump to Home with that date
    // Or show a modal. For simplicity, we just toggle it in calendar or stay there.
    // Let's just scroll to the day's detail (Mocked here as jump to home for that date if we wanted, 
    // but the spec says "mark readings as concluded", so we'll just allow marking from home).
    // Let's improve by allowing toggle directly in calendar or showing a small summary.
    toggleComplete(day.id);
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'home' && (
        <HomeView 
          todayReading={todayReading} 
          progress={progress} 
          onToggleComplete={toggleComplete} 
        />
      )}
      {activeView === 'calendar' && (
        <CalendarView 
          plan={plan} 
          progress={progress} 
          onDayClick={handleDayClickInCalendar} 
        />
      )}
      {activeView === 'profile' && (
        <ProfileView 
          progress={progress} 
          onUpdateName={updateName} 
        />
      )}
    </Layout>
  );
};

export default App;
