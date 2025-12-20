
export interface ReadingDay {
  id: string; // YYYY-MM-DD
  dayOfYear: number;
  date: Date;
  reading: string;
  chapters: string[];
}

export interface User {
  email: string;
  name: string;
  password?: string; // Optional for this simulation
  completedDays: string[]; // List of IDs (YYYY-MM-DD)
}

export interface UserProgress {
  name: string;
  completedDays: string[];
}

export type ViewState = 'home' | 'calendar' | 'profile';

export interface BiblePlanData {
  [key: string]: ReadingDay;
}
