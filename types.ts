
export interface ReadingDay {
  id: string; // YYYY-MM-DD
  dayOfYear: number;
  date: Date;
  reading: string;
  chapters: string[];
}

export interface UserProgress {
  name: string;
  completedDays: string[]; // List of IDs (YYYY-MM-DD)
}

export type ViewState = 'home' | 'calendar' | 'profile';

export interface BiblePlanData {
  [key: string]: ReadingDay;
}
