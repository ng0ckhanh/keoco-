import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, X, Medal, Flame, CheckCircle, Wifi, Award, Users } from 'lucide-react';
import { sound } from '../utils/sound';

interface LeaderboardModalProps {
  leaderboard: LeaderboardEntry[];
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  leaderboard,
  onClose,
}) => {
  const [filter, setFilter] = useState<'all' | 'weekly' | 'daily'>('all');

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner">
              🏆
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold font-display leading-tight">
                Bảng Xếp Hạng Trực Tuyến
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-amber-100 font-medium">
                <Wifi className="w-3 h-3 text-emerald-300" />
                <span>Đồng bộ tự động & Lưu ngoại tuyến</span>
              </div>
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

        {/* Filters bar */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl">
            <button
              onClick={() => {
                sound.playClick();
                setFilter('all');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mọi Thời Đại
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('weekly');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === 'weekly'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tuần Này
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setFilter('daily');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                filter === 'daily'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Hôm Nay
            </button>
          </div>

          <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
            Top 10 Cao Thủ Kéo Co
          </span>
        </div>

        {/* Leaderboard List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-stone-100">
          {leaderboard.map((item, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            const rankColor =
              rank === 1
                ? 'bg-amber-400 text-amber-950 font-black'
                : rank === 2
                ? 'bg-slate-300 text-slate-900 font-black'
                : rank === 3
                ? 'bg-amber-700 text-amber-50 font-black'
                : 'bg-stone-100 text-stone-600 font-bold';

            return (
              <div
                key={item.id}
                className={`pt-2 first:pt-0 flex items-center justify-between p-3 rounded-2xl transition ${
                  item.isCurrentUser
                    ? 'bg-red-50/80 border-2 border-red-300 shadow-xs'
                    : 'hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs sm:text-sm shrink-0 shadow-xs ${rankColor}`}
                  >
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                  </div>

                  {/* Avatar */}
                  <div className="text-2xl sm:text-3xl bg-stone-100 p-1 rounded-xl shadow-xs shrink-0">
                    {item.avatar}
                  </div>

                  {/* Name & Title */}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm sm:text-base text-stone-900">
                        {item.username}
                      </span>
                      {item.isCurrentUser && (
                        <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                          BẠN
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 font-semibold flex items-center gap-2">
                      <span className="text-amber-700 font-bold">{item.badge}</span>
                      <span>•</span>
                      <span>{item.wins} trận thắng</span>
                      <span>•</span>
                      <span>Tỉ lệ {item.winRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Score & Streak */}
                <div className="text-right">
                  <div className="font-extrabold text-sm sm:text-base text-red-600">
                    {item.score} <span className="text-[10px] text-stone-400 font-normal">điểm</span>
                  </div>
                  {item.maxStreak > 1 && (
                    <div className="text-[11px] text-amber-600 font-bold flex items-center justify-end gap-0.5">
                      <Flame className="w-3 h-3 text-red-500" />
                      <span>Kỷ lục {item.maxStreak}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          Chơi nhiều trận và trả lời đúng liên tiếp để nâng cao vị trí trên bảng xếp hạng!
        </div>
      </div>
    </div>
  );
};
