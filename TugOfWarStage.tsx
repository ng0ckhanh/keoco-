import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Flame, Shield } from 'lucide-react';

interface TugOfWarStageProps {
  ropePosition: number; // -100 (Blue max) to +100 (Red max), 0 is center
  isPullingRed: boolean;
  isPullingBlue: boolean;
  streakRed: number;
  streakBlue: number;
  redName?: string;
  blueName?: string;
  className?: string;
  heightClass?: string;
}

export const TugOfWarStage: React.FC<TugOfWarStageProps> = ({
  ropePosition,
  isPullingRed,
  isPullingBlue,
  streakRed,
  streakBlue,
  redName = 'Đội Đỏ',
  blueName = 'Đội Xanh',
  className = '',
  heightClass = 'h-44 sm:h-52 md:h-56',
}) => {
  // Map ropePosition (-100 to +100) to pixel offset in SVG.
  // Positive ropePosition means Red is winning (rope moves to the Left: -px)
  // Negative ropePosition means Blue is winning (rope moves to the Right: +px)
  const maxShiftPixels = 120;
  const shiftX = -(ropePosition / 100) * maxShiftPixels;

  return (
    <div className={`relative w-full bg-gradient-to-b from-amber-50/80 via-orange-50/50 to-emerald-100/70 rounded-2xl border-2 border-amber-200/90 shadow-md overflow-hidden p-2.5 sm:p-4 ${className}`}>
      {/* Top Banner / Tension Status */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-sm shadow-md">
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{redName}</span>
            {streakRed >= 2 && (
              <span className="bg-amber-400 text-red-900 text-xs px-1.5 py-0.5 rounded-full ml-1 flex items-center font-extrabold">
                <Zap className="w-3 h-3 mr-0.5" />x{streakRed}
              </span>
            )}
          </div>
        </div>

        {/* Center Meter Indicator */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
            {ropePosition > 20
              ? '🔥 Đội Đỏ đang chiếm ưu thế!'
              : ropePosition < -20
              ? '⚡ Đội Xanh đang dẫn trước!'
              : '⚖️ Cân bằng quyết liệt!'}
          </span>
          <div className="text-xs font-bold text-stone-800">
            {Math.abs(Math.round(ropePosition))}% Lực Kéo
          </div>
        </div>

        <div className="flex items-center gap-2">
          {streakBlue >= 2 && (
            <span className="bg-cyan-300 text-blue-900 text-xs px-1.5 py-0.5 rounded-full mr-1 flex items-center font-extrabold shadow">
              <Zap className="w-3 h-3 mr-0.5" />x{streakBlue}
            </span>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white font-bold text-sm shadow-md">
            <Shield className="w-4 h-4 text-cyan-200" />
            <span>{blueName}</span>
          </div>
        </div>
      </div>

      {/* Main Tug Arena Canvas (SVG) */}
      <div className={`relative w-full ${heightClass} select-none`}>
        <svg
          viewBox="0 0 800 240"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Ground Gradients */}
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="25%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="dirtGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Rope Pattern */}
            <pattern
              id="ropePattern"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <rect width="12" height="12" fill="#d97706" />
              <path d="M0,0 L12,12 M-3,9 L3,15 M9,-3 L15,3" stroke="#b45309" strokeWidth="2.5" />
              <path d="M0,6 L6,12 M6,0 L12,6" stroke="#fde68a" strokeWidth="1" />
            </pattern>

            {/* Red & Blue Glow Filters */}
            <filter id="redPullGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ef4444" />
            </filter>
            <filter id="bluePullGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3b82f6" />
            </filter>
          </defs>

          {/* Background Sky & Arena */}
          <rect x="0" y="0" width="800" height="175" fill="#f8fafc" opacity="0.4" />

          {/* Clouds in the sky */}
          <path d="M 60,40 Q 75,25 95,35 Q 115,20 130,40 Q 145,50 135,60 Q 110,65 70,60 Z" fill="#ffffff" opacity="0.8" />
          <path d="M 680,30 Q 700,18 720,28 Q 740,15 755,32 Q 770,45 750,55 Q 710,58 685,50 Z" fill="#ffffff" opacity="0.8" />

          {/* Pit / Playing Ground */}
          <rect x="0" y="175" width="800" height="65" fill="url(#groundGrad)" />
          {/* Middle arena dirt lane */}
          <ellipse cx="400" cy="190" rx="350" ry="28" fill="url(#dirtGrad)" opacity="0.85" />

          {/* Center Boundary Line & Markings */}
          <line x1="400" y1="165" x2="400" y2="215" stroke="#dc2626" strokeWidth="3.5" strokeDasharray="6 4" />
          <polygon points="392,165 408,165 400,153" fill="#dc2626" />
          <text x="400" y="230" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">
            VẠCH TRUNG TÂM
          </text>

          {/* Victory Threshold Markers (-80% and +80%) */}
          <line x1="280" y1="172" x2="280" y2="208" stroke="#ef4444" strokeWidth="2.5" opacity="0.75" />
          <text x="280" y="165" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
            THẮNG ĐỎ
          </text>

          <line x1="520" y1="172" x2="520" y2="208" stroke="#2563eb" strokeWidth="2.5" opacity="0.75" />
          <text x="520" y="165" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="bold">
            THẮNG XANH
          </text>

          {/* ============================================================== */}
          {/* DYNAMIC SHIFTING GROUP (Rope + Pulling Characters)            */}
          {/* ============================================================== */}
          <motion.g
            animate={{ x: shiftX }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            {/* The Stretched Tug of War Rope */}
            <path
              d="M 60,165 Q 400,167 740,165"
              fill="none"
              stroke="url(#ropePattern)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Rope highlight line */}
            <path
              d="M 60,163 Q 400,165 740,163"
              fill="none"
              stroke="#fef08a"
              strokeWidth="2.5"
              opacity="0.8"
            />

            {/* Red Center Ribbon attached to the rope (Victory Indicator) */}
            <g transform="translate(400, 165)">
              {/* Ribbon Knot */}
              <circle cx="0" cy="0" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
              {/* Hanging Red Ribbon tails waving */}
              <path
                d="M -3,5 Q -10,18 -4,28 Q 0,22 4,28 Q 8,16 3,5 Z"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="1"
              />
              <path
                d="M 2,5 Q 12,16 8,26 Q 5,20 1,26 Q -3,17 0,5 Z"
                fill="#ef4444"
              />
              {/* Little bell/marker on ribbon */}
              <circle cx="0" cy="1" r="3.5" fill="#facc15" />
            </g>

            {/* -------------------------------------------------------- */}
            {/* TEAM RED CHARACTERS (Left side, pulling leftwards)       */}
            {/* -------------------------------------------------------- */}
            <g
              transform="translate(100, 70)"
              filter={isPullingRed ? 'url(#redPullGlow)' : undefined}
              className={isPullingRed ? 'animate-rope-pull' : ''}
            >
              {/* Red Anchor Puller 1 (Back) */}
              <g transform="translate(0, 0)">
                {/* Dust puff at feet */}
                {isPullingRed && (
                  <ellipse cx="25" cy="110" rx="14" ry="5" fill="#d97706" opacity="0.6" />
                )}
                {/* Legs (leaning backward to left) */}
                <path d="M 30,70 L 15,108 L 2,108" stroke="#991b1b" strokeWidth="8" strokeLinecap="round" />
                <path d="M 40,70 L 36,108 L 48,108" stroke="#7f1d1d" strokeWidth="8" strokeLinecap="round" />
                {/* Body leaning back */}
                <ellipse cx="36" cy="55" rx="18" ry="24" fill="#dc2626" transform="rotate(-20 36 55)" />
                {/* Head */}
                <circle cx="28" cy="22" r="16" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
                {/* Red Headband */}
                <path d="M 12,18 Q 28,14 44,18" stroke="#b91c1c" strokeWidth="5" strokeLinecap="round" />
                <path d="M 10,20 L 2,30 M 10,20 L 0,22" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
                {/* Face expressions */}
                <circle cx="23" cy="23" r="2.5" fill="#1e293b" />
                <path d="M 18,17 L 26,20" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 23,28 Q 28,32 34,29" stroke="#991b1b" strokeWidth="2.5" fill="none" />
                {/* Arms gripping rope at y=95 */}
                <path d="M 38,48 L 52,95 L 68,95" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
                {/* Sweat drop */}
                <path d="M 12,12 Q 10,6 14,8 Q 16,12 12,12" fill="#38bdf8" />
              </g>

              {/* Red Middle Puller 2 */}
              <g transform="translate(70, 5)">
                {isPullingRed && (
                  <ellipse cx="25" cy="105" rx="12" ry="4" fill="#d97706" opacity="0.6" />
                )}
                <path d="M 30,68 L 16,104 L 5,104" stroke="#991b1b" strokeWidth="7.5" strokeLinecap="round" />
                <path d="M 40,68 L 38,104 L 50,104" stroke="#7f1d1d" strokeWidth="7.5" strokeLinecap="round" />
                <ellipse cx="36" cy="54" rx="16" ry="22" fill="#ef4444" transform="rotate(-18 36 54)" />
                <circle cx="28" cy="20" r="15" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
                {/* Cap/Hair */}
                <path d="M 14,18 Q 28,6 42,16" stroke="#991b1b" strokeWidth="4" fill="#7f1d1d" />
                {/* Face */}
                <circle cx="24" cy="21" r="2" fill="#1e293b" />
                <path d="M 20,16 L 27,19" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 22,27 Q 27,31 33,28" stroke="#991b1b" strokeWidth="2" fill="none" />
                <path d="M 36,46 L 50,90 L 65,90" stroke="#fed7aa" strokeWidth="6.5" strokeLinecap="round" />
              </g>

              {/* Red Front Puller 3 (Leader) */}
              <g transform="translate(140, 10)">
                {isPullingRed && (
                  <ellipse cx="25" cy="100" rx="12" ry="4" fill="#d97706" opacity="0.6" />
                )}
                <path d="M 28,66 L 14,98 L 3,98" stroke="#991b1b" strokeWidth="7" strokeLinecap="round" />
                <path d="M 38,66 L 36,98 L 48,98" stroke="#7f1d1d" strokeWidth="7" strokeLinecap="round" />
                <ellipse cx="34" cy="52" rx="15" ry="20" fill="#dc2626" transform="rotate(-15 34 52)" />
                <circle cx="28" cy="22" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                {/* Cheerful grit smile */}
                <circle cx="23" cy="21" r="2" fill="#1e293b" />
                <path d="M 22,26 Q 28,31 32,27" stroke="#854d0e" strokeWidth="2" fill="none" />
                <path d="M 34,44 L 48,85 L 62,85" stroke="#fde047" strokeWidth="6" strokeLinecap="round" />
              </g>
            </g>

            {/* -------------------------------------------------------- */}
            {/* TEAM BLUE CHARACTERS (Right side, pulling rightwards)    */}
            {/* -------------------------------------------------------- */}
            <g
              transform="translate(450, 70)"
              filter={isPullingBlue ? 'url(#bluePullGlow)' : undefined}
              className={isPullingBlue ? 'animate-rope-pull' : ''}
            >
              {/* Blue Front Puller 1 */}
              <g transform="translate(0, 10)">
                {isPullingBlue && (
                  <ellipse cx="35" cy="100" rx="12" ry="4" fill="#d97706" opacity="0.6" />
                )}
                <path d="M 32,66 L 46,98 L 57,98" stroke="#1e40af" strokeWidth="7" strokeLinecap="round" />
                <path d="M 22,66 L 24,98 L 12,98" stroke="#1e3a8a" strokeWidth="7" strokeLinecap="round" />
                <ellipse cx="26" cy="52" rx="15" ry="20" fill="#2563eb" transform="rotate(15 26 52)" />
                <circle cx="32" cy="22" r="14" fill="#a7f3d0" stroke="#047857" strokeWidth="1.5" />
                <circle cx="37" cy="21" r="2" fill="#1e293b" />
                <path d="M 38,26 Q 32,31 28,27" stroke="#065f46" strokeWidth="2" fill="none" />
                <path d="M 26,44 L 12,85 L -2,85" stroke="#a7f3d0" strokeWidth="6" strokeLinecap="round" />
              </g>

              {/* Blue Middle Puller 2 */}
              <g transform="translate(70, 5)">
                {isPullingBlue && (
                  <ellipse cx="35" cy="105" rx="12" ry="4" fill="#d97706" opacity="0.6" />
                )}
                <path d="M 30,68 L 44,104 L 55,104" stroke="#1e40af" strokeWidth="7.5" strokeLinecap="round" />
                <path d="M 20,68 L 22,104 L 10,104" stroke="#1e3a8a" strokeWidth="7.5" strokeLinecap="round" />
                <ellipse cx="24" cy="54" rx="16" ry="22" fill="#3b82f6" transform="rotate(18 24 54)" />
                <circle cx="32" cy="20" r="15" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
                <path d="M 46,18 Q 32,6 18,16" stroke="#1e40af" strokeWidth="4" fill="#172554" />
                <circle cx="36" cy="21" r="2" fill="#1e293b" />
                <path d="M 40,16 L 33,19" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 38,27 Q 33,31 27,28" stroke="#1e3a8a" strokeWidth="2" fill="none" />
                <path d="M 24,46 L 10,90 L -5,90" stroke="#fed7aa" strokeWidth="6.5" strokeLinecap="round" />
              </g>

              {/* Blue Anchor Puller 3 (Back) */}
              <g transform="translate(140, 0)">
                {isPullingBlue && (
                  <ellipse cx="35" cy="110" rx="14" ry="5" fill="#d97706" opacity="0.6" />
                )}
                <path d="M 30,70 L 45,108 L 58,108" stroke="#1e40af" strokeWidth="8" strokeLinecap="round" />
                <path d="M 20,70 L 24,108 L 12,108" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />
                <ellipse cx="24" cy="55" rx="18" ry="24" fill="#1d4ed8" transform="rotate(20 24 55)" />
                <circle cx="32" cy="22" r="16" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
                {/* Blue Headband */}
                <path d="M 48,18 Q 32,14 16,18" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" />
                <path d="M 50,20 L 58,30 M 50,20 L 60,22" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
                <circle cx="37" cy="23" r="2.5" fill="#1e293b" />
                <path d="M 42,17 L 34,20" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
                <path d="M 37,28 Q 32,32 26,29" stroke="#1e3a8a" strokeWidth="2.5" fill="none" />
                <path d="M 22,48 L 8,95 L -8,95" stroke="#e0e7ff" strokeWidth="7" strokeLinecap="round" />
                <path d="M 48,12 Q 50,6 46,8 Q 44,12 48,12" fill="#38bdf8" />
              </g>
            </g>
          </motion.g>

          {/* Shout Text Bubbles when Pulling */}
          {isPullingRed && (
            <g transform="translate(190, 45)" className="animate-bounce">
              <rect x="-10" y="-18" width="115" height="26" rx="12" fill="#ef4444" stroke="#fff" strokeWidth="2" />
              <text x="47" y="-1" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                KÉO MẠNH LÊN! 💥
              </text>
            </g>
          )}

          {isPullingBlue && (
            <g transform="translate(500, 45)" className="animate-bounce">
              <rect x="-10" y="-18" width="115" height="26" rx="12" fill="#2563eb" stroke="#fff" strokeWidth="2" />
              <text x="47" y="-1" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                DỒN HẾT SỨC! ⚡
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Visual Pull Progress Bar Gauge */}
      <div className="mt-2 space-y-1">
        <div className="relative h-4 bg-stone-200 rounded-full overflow-hidden border border-stone-300 shadow-inner flex">
          {/* Left Red Zone */}
          <div
            className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300"
            style={{ width: `${Math.max(0, 50 + (ropePosition / 2))}%` }}
          />
          {/* Right Blue Zone */}
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300"
            style={{ width: `${Math.max(0, 50 - (ropePosition / 2))}%` }}
          />
          {/* Center Marker Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 -ml-0.5 bg-stone-800 z-10 opacity-70" />
          {/* Moving Indicator Pin */}
          <div
            className="absolute top-0 bottom-0 w-3 h-4 bg-amber-300 border-2 border-stone-900 rounded-full shadow -ml-1.5 transition-all duration-300 z-20 flex items-center justify-center"
            style={{ left: `${50 - (ropePosition / 2)}%` }}
          >
            <div className="w-1 h-1 bg-stone-900 rounded-full" />
          </div>
        </div>

        <div className="flex justify-between text-[11px] font-medium text-stone-500 px-1">
          <span className="text-red-600 font-bold">◄ 100% Vạch Đích Đỏ</span>
          <span className="text-stone-400">0 (Cân bằng)</span>
          <span className="text-blue-600 font-bold">Vạch Đích Xanh 100% ►</span>
        </div>
      </div>
    </div>
  );
};
