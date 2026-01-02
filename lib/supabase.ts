
import { createClient } from '@supabase/supabase-js';

/**
 * CONFIGURAÇÃO DO SUPABASE
 * Substitua as strings abaixo pelas suas credenciais reais.
 */
const supabaseUrl = 'https://pctqcrjmrhwqhaqmdjyo.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdHFjcmptcmh3cWhhcW1kanlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczODI0OTIsImV4cCI6MjA4Mjk1ODQ5Mn0.dU4D_pUz-v2aB8A4lcV3wcZieEyoBdeyb1hRriuDVQg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Verifica se o usuário alterou os placeholders padrão.
 * Se a URL contiver 'supabase.co' e a key for longa o suficiente, consideramos configurado.
 */
export const isSupabaseConfigured = () => {
  const isUrlValid = supabaseUrl.includes('supabase.co') && !supabaseUrl.includes('SUA_URL');
  const isKeyValid = supabaseAnonKey.length > 50 && !supabaseAnonKey.includes('SUA_KEY');
  return isUrlValid && isKeyValid;
};
