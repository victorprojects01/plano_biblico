
import { supabase } from '../lib/supabase';

export const storageService = {
  // Busca o progresso de leitura do banco
  getReadingProgress: async (userId: string): Promise<string[]> => {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('reading_day_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao buscar progresso:', error);
      return [];
    }

    return data.map(item => item.reading_day_id);
  },

  // Salva a conclusão de um dia
  completeDay: async (userId: string, dayId: string) => {
    const { error } = await supabase
      .from('reading_progress')
      .upsert({ 
        user_id: userId, 
        reading_day_id: dayId 
      }, { onConflict: 'user_id, reading_day_id' });
    
    if (error) throw error;
  },

  // Remove a conclusão de um dia
  uncompleteDay: async (userId: string, dayId: string) => {
    const { error } = await supabase
      .from('reading_progress')
      .delete()
      .eq('user_id', userId)
      .eq('reading_day_id', dayId);
    
    if (error) throw error;
  },

  // Busca dados do perfil do usuário
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    return data;
  }
};
