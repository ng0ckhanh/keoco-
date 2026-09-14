import React, { useEffect } from 'react';
import { MatchRecord, UserProfile } from '../types';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { Trophy, Award, Flame, RotateCcw, Home, Eye, CheckCircle, XCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface GameOverModalProps {
  match: MatchRecord;
  profile: UserProfile;
  onPlayAgain: () => void;
  onHome: () => void;
  onReviewAnswers: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  match,
  profile,
  onPlayAgain,
  onHome,
  onReviewAnswers,
}) => {
  const isRedWinner = match.winner === 'red';
  const isBlueWinner = match.winner === 'blue';
  const isDraw = match.winner === 'draw';

  // Determine if the user (Red team in PvE) won
  const userWon = (match.mode === 'pve' && isRedWinner) || (match.mode !== 'pve' && !isDraw);

  useEffect(() => {
    if (userWon || !isDraw) {
      sound.playVictory();
      // Trigger festive multi-burst confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ef4444', '#f59e0b'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#3b82f6', '#10b981'],
          });
        }, 300);
      } catch {
        // ignore
      }
    } else {
      sound.playDefeat();
    }
  }, [userWon, isDraw]);

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden my-auto"
      >
        {/* Banner Header */}
        <div
          className={`p-6 text-center text-white ${
            isRedWinner
              ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600'
              : isBlueWinner
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600'
              : 'bg-gradient-to-r from-stone-700 to-stone-900'
          }`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg mb-2 animate-bounce">
            {isRedWinner ? '🏆' : isBlueWinner ? '👑' : '🤝'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            {isRedWinner
              ? `${match.redPlayerName.toUpperCase()} CHIẾN THẮNG!`
              : isBlueWinner
              ? `${match.bluePlayerName.toUpperCase()} CHIẾN THẮNG!`
              : 'HÒA NHAU BẤT PHÂN THẮNG BẠI!'}
          </h2>
          <p className="text-sm text-white/90 font-medium mt-1">
            {Math.abs(match.finalRopePosition) >= 80
              ? '⚡ Chiến thắng Knockout tuyệt đỉnh!'
              : 'Trận kéo co tri thức vô cùng kịch tính!'}
          </p>
        </div>

        {/* Scorecard comparison */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            {/* Red Results */}
            <div className="text-center border-r border-stone-200 pr-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 mb-1">
                {match.redPlayerName}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-red-600">
                {match.correctRed} <span className="text-sm font-semibold text-stone-400">/ 10</span>
              </div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">
                Điểm kéo: <span className="font-bold text-stone-700">{match.scoreRed}</span>
              </div>
            </div>

            {/* Blue Results */}
            <div className="text-center pl-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 mb-1">
                {match.bluePlayerName}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-600">
                {match.correctBlue} <span className="text-sm font-semibold text-stone-400">/ 10</span>
              </div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">
                Điểm kéo: <span className="font-bold text-stone-700">{match.scoreBlue}</span>
              </div>
            </div>
          </div>

          {/* Player Progression & Rewards */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{profile.avatar}</div>
              <div>
                <div className="text-xs font-bold text-stone-800">
                  {profile.username} • Cấp {profile.level}
                </div>
                <div className="text-[11px] text-amber-800 font-medium">
                  Tổng kinh nghiệm: <span className="font-bold">{profile.exp} EXP</span>
                </div>
              </div>
            </div>

            {profile.winStreak > 1 && (
              <div className="flex items-center gap-1 bg-red-100 text-red-700 text-xs font-black px-2.5 py-1 rounded-full border border-red-300">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>Chuỗi thắng {profile.winStreak}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              id="gameover-play-again-btn"
              onClick={() => {
                sound.playClick();
                onPlayAgain();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-extrabold text-base rounded-xl transition cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Chơi Lại Trận Mới</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                id="gameover-review-btn"
                onClick={() => {
                  sound.playClick();
                  onReviewAnswers();
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl border border-stone-300 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-stone-600" />
                <span>Xem Đáp Án</span>
              </button>

              <button
                id="gameover-home-btn"
                onClick={() => {
                  sound.playClick();
                  onHome();
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm rounded-xl border border-stone-300 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Home className="w-4 h-4 text-stone-600" />
                <span>Màn Hình Chính</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
