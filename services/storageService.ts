
import { UserProgress } from '../types';

const STORAGE_KEY = 'reading_saves_v1';

export const storageService = {
  saveProgress: (progress: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },
  
  loadProgress: (): UserProgress => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Failed to parse progress data", e);
      }
    }
    return { name: '', completedDays: [] };
  }
};
