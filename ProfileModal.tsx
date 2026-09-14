import React, { useState } from 'react';
import { UserProfile, MatchRecord } from '../types';
import { AVAILABLE_AVATARS, saveUserProfile } from '../utils/storage';
import { sound } from '../utils/sound';
import { User, X, Check, Award, History, Flame, Trophy, Calendar, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ProfileModalProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  profile,
  onUpdateProfile,
  onClose,
}) => {
  const [username, setUsername] = useState<string>(profile.username);
  const [avatar, setAvatar] = useState<string>(profile.avatar);
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [isSavedNotice, setIsSavedNotice] = useState<boolean>(false);

  const totalMatches = profile.wins + profile.losses + profile.draws;
  const winRate = totalMatches > 0 ? Math.round((profile.wins / totalMatches) * 100) : 0;
  const accuracy = profile.totalQuestions > 0 ? Math.round((profile.totalCorrect / profile.totalQuestions) * 100) : 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const updated: UserProfile = {
      ...profile,
      username: username.trim() || 'Người chơi',
      avatar,
    };
    saveUserProfile(updated);
    onUpdateProfile(updated);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl sm:text-4xl bg-white/20 p-2 rounded-2xl backdrop-blur-md">
              {avatar}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold font-display leading-tight">
                Hồ Sơ & Lịch Sử Đấu
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                Cấp {profile.level} • {profile.exp} EXP
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('profile');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'profile'
                ? 'border-red-600 text-red-600 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Tài Khoản & Danh Hiệu</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('history');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'history'
                ? 'border-red-600 text-red-600 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Lịch Sử Đấu ({profile.matchHistory?.length || 0})</span>
          </button>
        </div>

        {/* Tab 1: Profile & Stats */}
        {activeTab === 'profile' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                <div className="text-xs text-stone-500 font-medium">Trận Thắng</div>
                <div className="text-xl font-black text-emerald-600">{profile.wins}</div>
                <div className="text-[10px] text-stone-400">/{totalMatches} trận</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                <div className="text-xs text-stone-500 font-medium">Tỉ Lệ Thắng</div>
                <div className="text-xl font-black text-blue-600">{winRate}%</div>
                <div className="text-[10px] text-stone-400">{profile.losses} bại, {profile.draws} hòa</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                <div className="text-xs text-stone-500 font-medium">Chuỗi Thắng</div>
                <div className="text-xl font-black text-amber-600 flex items-center justify-center gap-0.5">
                  <Flame className="w-4 h-4 text-red-500" />
                  <span>{profile.winStreak}</span>
                </div>
                <div className="text-[10px] text-stone-400">Kỷ lục: {profile.maxWinStreak}</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                <div className="text-xs text-stone-500 font-medium">Độ Chính Xác</div>
                <div className="text-xl font-black text-purple-600">{accuracy}%</div>
                <div className="text-[10px] text-stone-400">{profile.totalCorrect} câu đúng</div>
              </div>
            </div>

            {/* Profile Edit Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Tên Người Chơi
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-300 focus:border-red-500 focus:outline-none font-bold text-stone-800 text-base transition"
                  placeholder="Nhập biệt danh của bạn"
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Chọn Biểu Tượng Đại Diện ({AVAILABLE_AVATARS.length} Biểu Tượng)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {AVAILABLE_AVATARS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setAvatar(av.emoji);
                      }}
                      className={`p-2 sm:p-2.5 rounded-xl text-2xl border-2 transition cursor-pointer flex flex-col items-center gap-1 ${
                        avatar === av.emoji
                          ? 'border-red-600 bg-red-50 shadow-md scale-105'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                      title={av.name}
                    >
                      <span>{av.emoji}</span>
                      <span className="text-[9px] text-stone-500 font-semibold truncate max-w-[45px]">
                        {av.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-md flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Thay Đổi</span>
                </button>

                {isSavedNotice && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Đã lưu thông tin tài khoản!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Match History */}
        {activeTab === 'history' && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
            {(!profile.matchHistory || profile.matchHistory.length === 0) ? (
              <div className="py-12 text-center text-stone-400 space-y-2">
                <div className="text-4xl">📜</div>
                <div className="font-bold text-stone-600">Chưa có lịch sử đấu nào</div>
                <p className="text-xs text-stone-400">
                  Hãy bắt đầu một trận Kéo Co Tri Thức để lưu lại chiến tích của bạn!
                </p>
              </div>
            ) : (
              profile.matchHistory.map((m) => {
                const isWin = m.winner === 'red';
                const isDraw = m.winner === 'draw';
                const isExpanded = expandedMatchId === m.id;

                return (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-2xl border-2 border-stone-200 bg-stone-50 hover:border-stone-300 transition"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedMatchId(isExpanded ? null : m.id)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase ${
                            isWin
                              ? 'bg-emerald-100 text-emerald-800'
                              : isDraw
                              ? 'bg-stone-200 text-stone-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isWin ? 'THẮNG' : isDraw ? 'HÒA' : 'THUA'}
                        </span>
                        <div>
                          <div className="font-extrabold text-sm text-stone-800">
                            {m.redPlayerName} <span className="text-stone-400">vs</span> {m.bluePlayerName}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-2">
                            <span className="flex items-center gap-0.5">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              {m.date}
                            </span>
                            <span>•</span>
                            <span>
                              {m.mode === 'pve' ? 'Đấu Máy' : '2 Người Chơi'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-stone-900">
                            {m.correctRed} - {m.correctBlue}
                          </div>
                          <div className="text-[10px] text-stone-500">
                            (Đúng / 10 câu)
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-stone-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500" />
                        )}
                      </div>
                    </div>

                    {/* Expandable answers detail */}
                    {isExpanded && m.answers && m.answers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                        <div className="text-xs font-bold text-stone-700">
                          Chi tiết các câu hỏi trong trận:
                        </div>
                        <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                          {m.answers.map((ans, aIdx) => (
                            <div
                              key={aIdx}
                              className={`p-2 rounded-xl text-xs flex items-center justify-between gap-2 ${
                                ans.isCorrect
                                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                                  : 'bg-rose-50 border border-rose-200 text-rose-950'
                              }`}
                            >
                              <div className="truncate flex-1">
                                <span className="font-bold mr-1">
                                  {ans.team === 'red' ? 'Đỏ' : 'Xanh'}:
                                </span>
                                <span>{ans.questionText}</span>
                              </div>
                              <span className="font-bold shrink-0">
                                {ans.isCorrect ? '✅ Đúng' : '❌ Sai'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
