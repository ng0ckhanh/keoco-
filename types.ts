export type GameMode = 'pve' | 'pvp_local' | 'solo_rush';

export type BotDifficulty = 'easy' | 'medium' | 'hard';

export type TeamSide = 'red' | 'blue';

export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0-3
  category: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  options: [string, string, string, string];
  correctIndex: number;
  chosenIndex: number | null;
  isCorrect: boolean;
  timeTaken: number; // in seconds
  team: TeamSide;
}

export interface MatchRecord {
  id: string;
  date: string;
  mode: GameMode;
  botDifficulty?: BotDifficulty;
  redPlayerName: string;
  bluePlayerName: string;
  scoreRed: number;
  scoreBlue: number;
  correctRed: number;
  correctBlue: number;
  winner: TeamSide | 'draw';
  finalRopePosition: number; // -100 to 100
  durationSeconds: number;
  answers: AnswerRecord[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  level: number;
  exp: number;
  wins: number;
  losses: number;
  draws: number;
  winStreak: number;
  maxWinStreak: number;
  totalCorrect: number;
  totalQuestions: number;
  matchHistory: MatchRecord[];
  createdAt: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  score: number;
  wins: number;
  matchesPlayed: number;
  winRate: number; // 0 - 100
  maxStreak: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  musicVolume: number;
  timePerQuestion: number; // seconds (default 15)
  selectedCategories: string[];
  easyReadingFont: boolean;
}
