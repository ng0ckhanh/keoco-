import { UserProfile, MatchRecord, LeaderboardEntry, GameSettings } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'keoco_user_profile_v1',
  SETTINGS: 'keoco_settings_v1',
  LEADERBOARD: 'keoco_leaderboard_cache_v1',
};

export const AVAILABLE_AVATARS = [
  { id: 'av1', emoji: '🦁', name: 'Sư Tử Oai Hùng' },
  { id: 'av2', emoji: '🐯', name: 'Hổ Dũng Mãnh' },
  { id: 'av3', emoji: '🦅', name: 'Đại Bàng Sấm Sét' },
  { id: 'av4', emoji: '🐉', name: 'Rồng Lửa Bất Diệt' },
  { id: 'av5', emoji: '🐼', name: 'Gấu Trúc Tinh Anh' },
  { id: 'av6', emoji: '🦊', name: 'Cáo Thông Thái' },
  { id: 'av7', emoji: '🥋', name: 'Võ Sĩ Vô Địch' },
  { id: 'av8', emoji: '🎓', name: 'Trạng Nguyên Trẻ' },
  { id: 'av9', emoji: '⚡', name: 'Tia Chớp Tri Thức' },
  { id: 'av10', emoji: '🚀', name: 'Nhà Du Hành Siêu Việt' },
  { id: 'av11', emoji: '⭐', name: 'Ngôi Sao Sáng' },
  { id: 'av12', emoji: '🤖', name: 'Cỗ Máy Chiến Thắng' },
];

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  musicEnabled: true,
  soundVolume: 0.8,
  musicVolume: 0.35,
  timePerQuestion: 15,
  selectedCategories: ['Tất cả'],
  easyReadingFont: false,
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'user_' + Math.random().toString(36).substring(2, 9),
  username: 'Đội Trưởng Tài Ba',
  avatar: '🦁',
  level: 1,
  exp: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  winStreak: 0,
  maxWinStreak: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  matchHistory: [],
  createdAt: new Date().toISOString(),
};

export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'l1', username: 'Quang Dũng', avatar: '🐉', score: 2850, wins: 45, matchesPlayed: 48, winRate: 94, maxStreak: 16, badge: 'Đại Kiện Tướng' },
  { id: 'l2', username: 'Minh Anh', avatar: '🎓', score: 2620, wins: 40, matchesPlayed: 44, winRate: 91, maxStreak: 12, badge: 'Bậc Thầy Kéo Co' },
  { id: 'l3', username: 'Hoàng Nam', avatar: '🦅', score: 2410, wins: 36, matchesPlayed: 42, winRate: 86, maxStreak: 9, badge: 'Dũng Tướng' },
  { id: 'l4', username: 'Thu Thảo', avatar: '🦊', score: 2190, wins: 31, matchesPlayed: 38, winRate: 82, maxStreak: 7, badge: 'Chiến Binh Đỏ' },
  { id: 'l5', username: 'Tuấn Kiệt', avatar: '🥋', score: 1980, wins: 28, matchesPlayed: 35, winRate: 80, maxStreak: 6, badge: 'Chiến Binh Xanh' },
  { id: 'l6', username: 'Bảo Châu', avatar: '⭐', score: 1740, wins: 24, matchesPlayed: 32, winRate: 75, maxStreak: 5, badge: 'Chiến Binh Tinh Anh' },
  { id: 'l7', username: 'Đức Huy', avatar: '🐯', score: 1530, wins: 20, matchesPlayed: 28, winRate: 71, maxStreak: 4, badge: 'Người Chơi Cừ Khôi' },
  { id: 'l8', username: 'Thanh Hà', avatar: '🐼', score: 1350, wins: 18, matchesPlayed: 26, winRate: 69, maxStreak: 4, badge: 'Người Chơi Cừ Khôi' },
  { id: 'l9', username: 'Gia Bảo', avatar: '🚀', score: 1120, wins: 14, matchesPlayed: 22, winRate: 64, maxStreak: 3, badge: 'Tân Binh Xuất Sắc' },
  { id: 'l10', username: 'Khánh Vy', avatar: '⚡', score: 980, wins: 11, matchesPlayed: 18, winRate: 61, maxStreak: 3, badge: 'Tân Binh Xuất Sắc' },
];

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PROFILE, ...parsed };
    }
  } catch {
    // fallback
  }
  saveUserProfile(DEFAULT_PROFILE);
  return DEFAULT_PROFILE;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch {
    // fallback
  }
}

export function getGameSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SETTINGS;
}

export function saveGameSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // fallback
  }
}

export function recordMatch(match: MatchRecord, playerTeam: 'red' | 'blue' = 'red'): UserProfile {
  const profile = getUserProfile();

  const isWin = match.winner === playerTeam;
  const isDraw = match.winner === 'draw';
  const isLoss = !isWin && !isDraw;

  const currentWins = profile.wins + (isWin ? 1 : 0);
  const currentLosses = profile.losses + (isLoss ? 1 : 0);
  const currentDraws = profile.draws + (isDraw ? 1 : 0);
  
  const newStreak = isWin ? profile.winStreak + 1 : 0;
  const newMaxStreak = Math.max(profile.maxWinStreak, newStreak);

  const playerCorrect = playerTeam === 'red' ? match.correctRed : match.correctBlue;
  const totalCorrect = profile.totalCorrect + playerCorrect;
  const totalQuestions = profile.totalQuestions + 10;

  // Calculate EXP: Win = 150 exp, Draw = 60 exp, Loss = 30 exp + (playerCorrect * 20)
  const expGain = (isWin ? 150 : isDraw ? 60 : 30) + (playerCorrect * 20);
  const totalExp = profile.exp + expGain;
  // Each level requires Level * 300 exp
  const newLevel = Math.max(1, Math.floor(Math.sqrt(totalExp / 100)) + 1);

  const updatedHistory = [match, ...(profile.matchHistory || [])].slice(0, 50); // Keep last 50 matches

  const updatedProfile: UserProfile = {
    ...profile,
    level: newLevel,
    exp: totalExp,
    wins: currentWins,
    losses: currentLosses,
    draws: currentDraws,
    winStreak: newStreak,
    maxWinStreak: newMaxStreak,
    totalCorrect,
    totalQuestions,
    matchHistory: updatedHistory,
  };

  saveUserProfile(updatedProfile);
  return updatedProfile;
}

export function getLeaderboard(): LeaderboardEntry[] {
  const profile = getUserProfile();
  const matchesPlayed = profile.wins + profile.losses + profile.draws;
  const winRate = matchesPlayed > 0 ? Math.round((profile.wins / matchesPlayed) * 100) : 0;
  const userScore = profile.wins * 60 + profile.totalCorrect * 15;

  let badge = 'Tân Binh';
  if (profile.wins >= 30) badge = 'Đại Kiện Tướng';
  else if (profile.wins >= 20) badge = 'Bậc Thầy Kéo Co';
  else if (profile.wins >= 10) badge = 'Chiến Binh Tinh Anh';
  else if (profile.wins >= 3) badge = 'Người Chơi Cừ Khôi';

  const userEntry: LeaderboardEntry = {
    id: profile.id,
    username: profile.username || 'Bạn',
    avatar: profile.avatar || '🦁',
    score: userScore,
    wins: profile.wins,
    matchesPlayed,
    winRate,
    maxStreak: profile.maxWinStreak,
    badge,
    isCurrentUser: true,
  };

  // Merge with seed leaderboard
  let cached: LeaderboardEntry[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (raw) {
      cached = JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  const baseList = cached.length > 0 ? cached : SEED_LEADERBOARD;
  // Filter out any existing user entry then insert updated
  const filtered = baseList.filter((e) => e.id !== userEntry.id);
  filtered.push(userEntry);

  // Sort descending by score, then wins, then winRate
  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.winRate - a.winRate;
  });

  // Save back to local storage for offline retrieval
  try {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(filtered.filter(e => !e.isCurrentUser)));
  } catch {
    // ignore
  }

  return filtered;
}
