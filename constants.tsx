
import { ReadingDay, BiblePlanData } from './types';

// Mensagens motivacionais para os usuários
export const MOTIVATIONAL_MESSAGES = [
  "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.",
  "Tudo posso naquele que me fortalece.",
  "O Senhor é o meu pastor; de nada terei falta.",
  "Deem graças ao Senhor, porque ele é bom; o seu amor dura para sempre.",
  "Não fui eu que ordenei a você? Seja forte e corajoso!",
  "Busquem, pois, em primeiro lugar o Reino de Deus e a sua justiça.",
  "O coração alegre aformoseia o rosto.",
  "O amor é paciente, o amor é bondoso.",
  "Confie no Senhor de todo o seu coração.",
  "Mil cairão ao teu lado, e dez mil, à tua direita, mas tu não serás atingido.",
  "Elevo os meus olhos para os montes; de onde me vem o socorro?",
  "O Senhor te guardará de todo o mal; ele guardará a tua alma.",
  "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração.",
  "Se Deus é por nós, quem será contra nós?",
  "O que vem a mim de maneira nenhuma o lançarei fora.",
  "O SENHOR é a minha luz e a minha salvação; a quem temerei?",
  "Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.",
  "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
  "As misericórdias do Senhor são a causa de não sermos consumidos.",
  "Peçam, e lhes será dado; busquem, e encontrarão; batam, e a porta será aberta."
];

// Lista completa e sequencial cobrindo toda a bíblia em 365 dias
const BIBLE_BOOKS = [
  { name: "Gênesis", chapters: 50 }, { name: "Êxodo", chapters: 40 }, { name: "Levítico", chapters: 27 },
  { name: "Números", chapters: 36 }, { name: "Deuteronômio", chapters: 34 }, { name: "Josué", chapters: 24 },
  { name: "Juízes", chapters: 21 }, { name: "Rute", chapters: 4 }, { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 }, { name: "1 Reis", chapters: 22 }, { name: "2 Reis", chapters: 25 },
  { name: "1 Crônicas", chapters: 29 }, { name: "2 Crônicas", chapters: 36 }, { name: "Esdras", chapters: 10 },
  { name: "Neemias", chapters: 13 }, { name: "Ester", chapters: 10 }, { name: "Jó", chapters: 42 },
  { name: "Salmos", chapters: 150 }, { name: "Provérbios", chapters: 31 }, { name: "Eclesiastes", chapters: 12 },
  { name: "Cantares", chapters: 8 }, { name: "Isaías", chapters: 66 }, { name: "Jeremias", chapters: 52 },
  { name: "Lamentações", chapters: 5 }, { name: "Ezequiel", chapters: 48 }, { name: "Daniel", chapters: 12 },
  { name: "Oseias", chapters: 14 }, { name: "Joel", chapters: 3 }, { name: "Amós", chapters: 9 },
  { name: "Obadias", chapters: 1 }, { name: "Jonas", chapters: 4 }, { name: "Miqueias", chapters: 7 },
  { name: "Naum", chapters: 3 }, { name: "Habacuque", chapters: 3 }, { name: "Sofonias", chapters: 3 },
  { name: "Ageu", chapters: 2 }, { name: "Zacarias", chapters: 14 }, { name: "Malaquias", chapters: 4 },
  { name: "Mateus", chapters: 28 }, { name: "Marcos", chapters: 16 }, { name: "Lucas", chapters: 24 },
  { name: "João", chapters: 21 }, { name: "Atos", chapters: 28 }, { name: "Romanos", chapters: 16 },
  { name: "1 Coríntios", chapters: 16 }, { name: "2 Coríntios", chapters: 13 }, { name: "Gálatas", chapters: 6 },
  { name: "Efésios", chapters: 6 }, { name: "Filipenses", chapters: 4 }, { name: "Colossenses", chapters: 4 },
  { name: "1 Tessalonicenses", chapters: 5 }, { name: "2 Tessalonicenses", chapters: 3 }, { name: "1 Timóteo", chapters: 6 },
  { name: "2 Timóteo", chapters: 4 }, { name: "Tito", chapters: 3 }, { name: "Filemom", chapters: 1 },
  { name: "Hebreus", chapters: 13 }, { name: "Tiago", chapters: 5 }, { name: "1 Pedro", chapters: 5 },
  { name: "2 Pedro", chapters: 3 }, { name: "1 João", chapters: 5 }, { name: "2 João", chapters: 1 },
  { name: "3 João", chapters: 1 }, { name: "Judas", chapters: 1 }, { name: "Apocalipse", chapters: 22 }
];

/**
 * Gera o plano de leitura para 2026.
 * Os dias 01/01 e 02/01 são dias de preparação.
 * A leitura começa em 03/01 redistribuindo os 1189 capítulos nos 363 dias restantes.
 */
export const generate2026Plan = (): BiblePlanData => {
  const plan: BiblePlanData = {};
  
  let currentBookIndex = 0;
  let currentChapter = 1;
  
  for (let day = 1; day <= 365; day++) {
    const date = new Date(2026, 0, day);
    const id = date.toISOString().split('T')[0];
    const dayChapters: string[] = [];
    
    // Redistribuição: 
    // Dias 1 e 2: Preparação (0 capítulos)
    // Dias 3 a 102 (100 dias): 4 capítulos/dia = 400 capítulos
    // Dias 103 a 365 (263 dias): 3 capítulos/dia = 789 capítulos
    // Total: 0 + 400 + 789 = 1189 capítulos (Toda a Bíblia)
    let chaptersToday = 0;
    if (day > 2) {
      chaptersToday = day <= 102 ? 4 : 3;
    }
    
    for (let c = 0; c < chaptersToday; c++) {
      if (currentBookIndex >= BIBLE_BOOKS.length) break;
      
      const book = BIBLE_BOOKS[currentBookIndex];
      dayChapters.push(`${book.name} ${currentChapter}`);
      
      currentChapter++;
      if (currentChapter > book.chapters) {
        currentChapter = 1;
        currentBookIndex++;
      }
    }
    
    plan[id] = {
      id,
      dayOfYear: day,
      date,
      reading: dayChapters.length > 0 ? dayChapters.join(', ') : "Dia de Preparação",
      chapters: dayChapters
    };
  }
  
  return plan;
};
