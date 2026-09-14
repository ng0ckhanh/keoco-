import React, { useState, useEffect } from 'react';
import { UserProfile, GameSettings } from '../types';
import { Trophy, History, Volume2, VolumeX, Settings, HelpCircle, Wifi, WifiOff, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderNavProps {
  profile: UserProfile;
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onOpenLeaderboard: () => void;
  onOpenProfile: () => void;
  onOpenRules: () => void;
  onOpenSettings: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  profile,
  settings,
  onUpdateSettings,
  onOpenLeaderboard,
  onOpenProfile,
  onOpenRules,
  onOpenSettings,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSound = () => {
    const next = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: next };
    onUpdateSettings(updated);
    sound.setSoundEnabled(next);
    if (next) sound.playClick();
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm sticky top-0 z-30 px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Logo & App Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-blue-600 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl">
              🎯
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-display font-extrabold text-lg sm:text-xl text-stone-900 leading-tight tracking-tight">
                Kéo Co <span className="text-red-600">Tri</span> <span className="text-blue-600">Thức</span>
              </h1>
              {/* Online / Offline status pill */}
              <div
                className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  isOnline
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
                title={isOnline ? 'Đang kết nối trực tuyến' : 'Chế độ ngoại tuyến (vẫn chơi mượt mà)'}
              >
                {isOnline ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <Wifi className="w-3 h-3 text-emerald-600" />
                    <span className="hidden md:inline">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 text-amber-600" />
                    <span>Offline</span>
                  </>
                )}
              </div>
            </div>
            <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
              10 Câu Hỏi Nhanh • Kéo Dây Chiến Thắng
            </p>
          </div>
        </div>

        {/* User Quick Profile & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* User Profile Button */}
          <button
            id="nav-profile-btn"
            onClick={() => {
              sound.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition cursor-pointer text-left"
          >
            <div className="text-xl sm:text-2xl leading-none bg-white p-1 rounded-lg shadow-xs">
              {profile.avatar || '🦁'}
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-stone-800 truncate max-w-[100px]">
                {profile.username || 'Người chơi'}
              </div>
              <div className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                <span>Cấp {profile.level}</span>
                {profile.winStreak > 1 && (
                  <span className="text-red-600 font-bold">🔥x{profile.winStreak}</span>
                )}
              </div>
            </div>
          </button>

          {/* Leaderboard Button */}
          <button
            id="nav-leaderboard-btn"
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Bảng xếp hạng"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="hidden md:inline">Bảng Xếp Hạng</span>
          </button>

          {/* Quick Sound Toggle */}
          <button
            id="nav-sound-toggle-btn"
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              settings.soundEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-stone-100 text-stone-400 border-stone-300 hover:bg-stone-200'
            }`}
            title={settings.soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Rules / Help */}
          <button
            id="nav-rules-btn"
            onClick={() => {
              sound.playClick();
              onOpenRules();
            }}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition cursor-pointer"
            title="Luật chơi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Settings Button */}
          <button
            id="nav-settings-btn"
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition cursor-pointer"
            title="Cài đặt"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
