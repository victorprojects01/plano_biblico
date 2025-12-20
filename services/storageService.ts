
import { User } from '../types';

const USERS_KEY = 'reading_saves_users_v2';
const SESSION_KEY = 'reading_saves_session_v2';

export const storageService = {
  // Get all registered users
  getUsers: (): Record<string, User> => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  },

  // Save/Update a specific user
  saveUser: (user: User) => {
    const users = storageService.getUsers();
    users[user.email.toLowerCase()] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Set currently logged in user email
  setSession: (email: string | null) => {
    if (email) {
      localStorage.setItem(SESSION_KEY, email.toLowerCase());
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  },

  // Get current session user object
  getCurrentUser: (): User | null => {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const users = storageService.getUsers();
    return users[email] || null;
  }
};
