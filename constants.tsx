
import { ReadingDay, BiblePlanData } from './types';

const WEEKLY_PLAN_DATA = [
  "Gênesis 1–9 | Mateus 1–3 | Salmos 1",
  "Gênesis 10–18 | Mateus 4–6 | Salmos 2",
  "Gênesis 19–27 | Mateus 7–9 | Salmos 3",
  "Gênesis 28–36 | Mateus 10–12 | Salmos 4",
  "Gênesis 37–45 | Mateus 13–15 | Salmos 5",
  "Gênesis 46–50 | Êxodo 1–8 | Mateus 16–17",
  "Êxodo 9–18 | Mateus 18–20 | Salmos 6",
  "Êxodo 19–28 | Mateus 21–23 | Salmos 7",
  "Êxodo 29–40 | Mateus 24–26",
  "Levítico 1–10 | Mateus 27–28 | Salmos 8",
  "Levítico 11–20 | Marcos 1–3",
  "Levítico 21–27 | Marcos 4–6 | Salmos 9",
  "Números 1–10 | Marcos 7–9",
  "Números 11–20 | Marcos 10–12",
  "Números 21–30 | Marcos 13–15",
  "Números 31–36 | Deuteronômio 1–6 | Marcos 16",
  "Deuteronômio 7–16 | Lucas 1–2",
  "Deuteronômio 17–26 | Lucas 3–5",
  "Deuteronômio 27–34 | Lucas 6–8",
  "Josué 1–12 | Lucas 9–10",
  "Josué 13–24 | Lucas 11–12",
  "Juízes 1–10 | Lucas 13–15",
  "Juízes 11–21 | Rute | Lucas 16",
  "1 Samuel 1–10 | Lucas 17–18",
  "1 Samuel 11–20 | Lucas 19–20",
  "1 Samuel 21–31 | Lucas 21–22",
  "2 Samuel 1–12 | Lucas 23–24",
  "2 Samuel 13–24 | João 1–2",
  "1 Reis 1–11 | João 3–4",
  "1 Reis 12–22 | João 5–6",
  "2 Reis 1–10 | João 7–8",
  "2 Reis 11–20 | João 9–10",
  "2 Reis 21–25 | 1 Crônicas 1–5",
  "1 Crônicas 6–15 | João 11–12",
  "1 Crônicas 16–29 | João 13–14",
  "2 Crônicas 1–12 | João 15–16",
  "2 Crônicas 13–24 | João 17–18",
  "2 Crônicas 25–36 | João 19–20",
  "Esdras | Neemias | João 21",
  "Ester | Jó 1–7",
  "Jó 8–21",
  "Jó 22–42",
  "Salmos 1–50",
  "Salmos 51–100",
  "Salmos 101–150",
  "Provérbios | Eclesiastes",
  "Cantares | Isaías 1–12",
  "Isaías 13–39",
  "Isaías 40–66",
  "Jeremias | Lamentações",
  "Ezequiel | Daniel",
  "Profetas Menores | Atos | Romanos | Apocalipse"
];

export const generate2026Plan = (): BiblePlanData => {
  const plan: BiblePlanData = {};
  const startDate = new Date(2026, 0, 1);
  
  for (let i = 0; i < 365; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const id = currentDate.toISOString().split('T')[0];
    
    // Calcula a semana (0 a 51)
    const weekIndex = Math.min(51, Math.floor(i / 7));
    const reading = WEEKLY_PLAN_DATA[weekIndex];

    plan[id] = {
      id,
      dayOfYear: i + 1,
      date: currentDate,
      reading: reading,
      chapters: reading.split('|').map(s => s.trim())
    };
  }
  return plan;
};

export const MOTIVATIONAL_MESSAGES = [
  "A tua palavra é lâmpada que ilumina os meus passos.",
  "Permaneça na Palavra, ela é vida.",
  "Um capítulo por vez, um dia mais perto de Deus.",
  "O conhecimento de Deus começa com a leitura de Sua vontade.",
  "Alimente sua alma hoje.",
  "A constância é a chave para a sabedoria.",
  "Deixe que a Palavra transforme o seu dia.",
  "Buscai primeiro o Reino de Deus.",
  "Tudo posso naquele que me fortalece.",
  "O Senhor é o meu pastor, nada me faltará."
];
