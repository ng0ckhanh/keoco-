import React, { useState } from 'react';
import { GameMode, BotDifficulty, UserProfile, GameSettings } from '../types';
import { sound } from '../utils/sound';
import { Play, Bot, Users, Sparkles, Flame, Shield, Trophy, History, BookOpen, Settings, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeLobbyProps {
  profile: UserProfile;
  settings: GameSettings;
  onStartGame: (mode: GameMode, botDiff: BotDifficulty, redName: string, blueName: string) => void;
  onOpenLeaderboard: () => void;
  onOpenProfile: () => void;
  onOpenRules: () => void;
}

export const HomeLobby: React.FC<HomeLobbyProps> = ({
  profile,
  settings,
  onStartGame,
  onOpenLeaderboard,
  onOpenProfile,
  onOpenRules,
}) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('pve');
  const [botDiff, setBotDiff] = useState<BotDifficulty>('medium');
  const [redName, setRedName] = useState<string>(profile.username || 'Đội Đỏ');
  const [blueName, setBlueName] = useState<string>('Robot Trí Tuệ');

  const handleModeSelect = (mode: GameMode) => {
    sound.playClick();
    setSelectedMode(mode);
    if (mode === 'pve') {
      setBlueName(botDiff === 'easy' ? 'Bot Tập Sự' : botDiff === 'medium' ? 'Robot Trí Tuệ' : 'Siêu AI Vô Địch');
    } else if (mode === 'pvp_local') {
      setBlueName('Đội Xanh (Bạn bè)');
    } else {
      setBlueName('Cỗ Máy Thời Gian');
    }
  };

  const handleDiffSelect = (diff: BotDifficulty) => {
    sound.playClick();
    setBotDiff(diff);
    setBlueName(diff === 'easy' ? 'Bot Tập Sự' : diff === 'medium' ? 'Robot Trí Tuệ' : 'Siêu AI Vô Địch');
  };

  const handleStart = () => {
    sound.playWhistle();
    onStartGame(selectedMode, botDiff, redName.trim() || 'Đội Đỏ', blueName.trim() || 'Đội Xanh');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-3 sm:px-4 py-4 sm:py-6">
      {/* Hero Welcome Banner with Animated Rope Visual */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-amber-500 to-blue-600 p-6 sm:p-8 text-white shadow-xl">
        {/* Background decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-60 h-60 rounded-full bg-red-800/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-bold shadow-inner">
            <span>🎉 Trò Chơi Kéo Co Kiến Thức Nhanh</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
            <span className="text-amber-200">10 Câu Quyết Định</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
            KÉO CO TRI THỨC
          </h1>

          <p className="text-sm sm:text-base text-amber-50 font-medium leading-relaxed max-w-xl mx-auto">
            Mỗi đội có 10 câu hỏi kiến thức nhanh. Đội nào trả lời đúng và chuẩn xác sẽ kéo đối phương về phía mình để giành chiến thắng chung cuộc!
          </p>

          {/* User Quick Trophy Banner */}
          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-bold text-white/90">
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              {profile.wins} Trận thắng
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5 text-red-300" />
              Chuỗi: {profile.winStreak}
            </span>
          </div>
        </div>
      </div>

      {/* Main Mode Selection Card */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-lg p-5 sm:p-7 space-y-6">
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
            1. Chọn Chế Độ Chơi
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Mode 1: Vs AI Bot */}
            <button
              id="mode-pve-btn"
              onClick={() => handleModeSelect('pve')}
              className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex items-start gap-3.5 ${
                selectedMode === 'pve'
                  ? 'border-red-600 bg-red-50/70 shadow-md ring-2 ring-red-200'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  selectedMode === 'pve' ? 'bg-red-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                🤖
              </div>
              <div className="flex-1">
                <div className="font-black text-stone-900 text-base flex items-center justify-between">
                  <span>Đấu Với Máy (AI Bot)</span>
                  {selectedMode === 'pve' && (
                    <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-extrabold">
                      ĐÃ CHỌN
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Thi tài kéo co với đối thủ máy. Có thể chơi hoàn toàn offline mọi lúc mọi nơi!
                </p>
              </div>
            </button>

            {/* Mode 2: 2 Players (Local Pass & Play) */}
            <button
              id="mode-pvp-btn"
              onClick={() => handleModeSelect('pvp_local')}
              className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex items-start gap-3.5 ${
                selectedMode === 'pvp_local'
                  ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-200'
                  : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  selectedMode === 'pvp_local' ? 'bg-blue-600 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                👥
              </div>
              <div className="flex-1">
                <div className="font-black text-stone-900 text-base flex items-center justify-between">
                  <span>2 Người Chơi (Cùng Máy)</span>
                  {selectedMode === 'pvp_local' && (
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-extrabold">
                      ĐÃ CHỌN
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Hai người cùng chơi trên một màn hình điện thoại hoặc máy tính, mỗi bên 10 câu hỏi!
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Bot Difficulty Settings (If mode === 'pve') */}
        {selectedMode === 'pve' && (
          <div className="space-y-2.5 pt-2">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">
              2. Độ Khó Của Máy
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'easy', label: 'Dễ (Tập Sự)', desc: 'Bot ~45% đúng', emoji: '🌱' },
                { id: 'medium', label: 'Vừa (Thách Thức)', desc: 'Bot ~70% đúng', emoji: '⚡' },
                { id: 'hard', label: 'Khó (Cao Thủ)', desc: 'Bot ~90% đúng', emoji: '🔥' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDiffSelect(d.id as BotDifficulty)}
                  className={`p-3 rounded-xl border-2 text-center transition cursor-pointer ${
                    botDiff === d.id
                      ? 'border-red-600 bg-red-50 text-red-950 font-bold shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100 font-medium'
                  }`}
                >
                  <div className="text-xl mb-1">{d.emoji}</div>
                  <div className="text-xs font-extrabold">{d.label}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Player Names Input */}
        <div className="space-y-2.5 pt-2">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">
            {selectedMode === 'pve' ? '2. Tên Đội Thi Đấu' : '2. Tên Hai Đội Đối Kháng'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-bold text-red-600 mb-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Đội Đỏ (Bên Trái)</span>
              </div>
              <input
                type="text"
                maxLength={20}
                value={redName}
                onChange={(e) => setRedName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border-2 border-stone-200 focus:border-red-500 focus:outline-none font-bold text-stone-800 text-sm"
                placeholder="Nhập tên Đội Đỏ"
              />
            </div>

            <div>
              <div className="text-xs font-bold text-blue-600 mb-1 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                <span>Đội Xanh (Bên Phải)</span>
              </div>
              <input
                type="text"
                maxLength={20}
                value={blueName}
                onChange={(e) => setBlueName(e.target.value)}
                disabled={selectedMode === 'pve'}
                className={`w-full px-3.5 py-2.5 rounded-xl border-2 font-bold text-sm ${
                  selectedMode === 'pve'
                    ? 'border-stone-200 bg-stone-100 text-stone-500'
                    : 'border-stone-200 focus:border-blue-500 focus:outline-none text-stone-800'
                }`}
                placeholder="Nhập tên Đội Xanh"
              />
            </div>
          </div>
        </div>

        {/* Big Action Button: Start Tug of War! */}
        <div className="pt-4">
          <button
            id="start-tug-game-btn"
            onClick={handleStart}
            className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-700 hover:via-amber-600 hover:to-red-700 text-white font-black font-display text-xl sm:text-2xl rounded-2xl transition-all duration-200 cursor-pointer shadow-xl transform active:scale-98 flex items-center justify-center gap-3 border-2 border-amber-300"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>BẮT ĐẦU KÉO CO!</span>
            <Zap className="w-6 h-6 text-amber-200 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onOpenLeaderboard();
          }}
          className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/80 border border-amber-200 hover:bg-amber-100/80 transition text-center cursor-pointer shadow-xs"
        >
          <div className="text-2xl sm:text-3xl mb-1">🏆</div>
          <div className="font-extrabold text-xs sm:text-sm text-amber-950">Bảng Xếp Hạng</div>
          <div className="text-[10px] text-amber-700 font-medium mt-0.5">Cao thủ trực tuyến</div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenProfile();
          }}
          className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/80 border border-blue-200 hover:bg-blue-100/80 transition text-center cursor-pointer shadow-xs"
        >
          <div className="text-2xl sm:text-3xl mb-1">📜</div>
          <div className="font-extrabold text-xs sm:text-sm text-blue-950">Lịch Sử Đấu</div>
          <div className="text-[10px] text-blue-700 font-medium mt-0.5">Xem thành tích cá nhân</div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenRules();
          }}
          className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 hover:bg-emerald-100/80 transition text-center cursor-pointer shadow-xs"
        >
          <div className="text-2xl sm:text-3xl mb-1">📖</div>
          <div className="font-extrabold text-xs sm:text-sm text-emerald-950">Luật Kéo Co</div>
          <div className="text-[10px] text-emerald-700 font-medium mt-0.5">10 câu hỏi & mẹo chơi</div>
        </button>
      </div>
    </div>
  );
};
