import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, GameMode, BotDifficulty, AnswerRecord, MatchRecord, GameSettings } from '../types';
import { TugOfWarStage } from './TugOfWarStage';
import { sound } from '../utils/sound';
import { Timer, Zap, Flame, Shield, CheckCircle2, XCircle, ArrowRight, HelpCircle, RefreshCw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameArenaProps {
  mode: GameMode;
  botDifficulty: BotDifficulty;
  redPlayerName: string;
  bluePlayerName: string;
  redQuestions: Question[];
  blueQuestions: Question[];
  settings: GameSettings;
  onMatchComplete: (match: MatchRecord) => void;
  onExitToMenu: () => void;
  onRefreshQuestions?: () => void;
}

export const GameArena: React.FC<GameArenaProps> = ({
  mode,
  botDifficulty,
  redPlayerName,
  bluePlayerName,
  redQuestions,
  blueQuestions,
  settings,
  onMatchComplete,
  onExitToMenu,
  onRefreshQuestions,
}) => {
  // Current Round (0 to 9 -> 10 rounds total for 10 questions each)
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [ropePosition, setRopePosition] = useState<number>(0); // -100 (Blue) to +100 (Red)

  // Scores & Correct count
  const [scoreRed, setScoreRed] = useState<number>(0);
  const [scoreBlue, setScoreBlue] = useState<number>(0);
  const [correctRed, setCorrectRed] = useState<number>(0);
  const [correctBlue, setCorrectBlue] = useState<number>(0);

  // Streaks
  const [streakRed, setStreakRed] = useState<number>(0);
  const [streakBlue, setStreakBlue] = useState<number>(0);

  // Visual pulling indicators
  const [isPullingRed, setIsPullingRed] = useState<boolean>(false);
  const [isPullingBlue, setIsPullingBlue] = useState<boolean>(false);

  // Questions for current round
  const currentRedQ: Question = redQuestions[currentRound % redQuestions.length] || redQuestions[0];
  const currentBlueQ: Question = blueQuestions[currentRound % blueQuestions.length] || blueQuestions[0];

  // Timer
  const timeLimit = settings.timePerQuestion > 0 ? settings.timePerQuestion : 15;
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

  // Red Team answering state
  const [selectedOptionRed, setSelectedOptionRed] = useState<number | null>(null);
  const [hasAnsweredRed, setHasAnsweredRed] = useState<boolean>(false);
  const [redAnswerTime, setRedAnswerTime] = useState<number>(0);

  // Blue Team answering state
  const [selectedOptionBlue, setSelectedOptionBlue] = useState<number | null>(null);
  const [hasAnsweredBlue, setHasAnsweredBlue] = useState<boolean>(false);
  const [blueAnswerTime, setBlueAnswerTime] = useState<number>(0);
  const [botThinking, setBotThinking] = useState<boolean>(false);

  // Round resolution state
  const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false);
  const [roundFeedback, setRoundFeedback] = useState<string | null>(null);

  // Match History
  const [answersList, setAnswersList] = useState<AnswerRecord[]>([]);

  // Time tracking
  const roundStartTimeRef = useRef<number>(Date.now());
  const matchStartTimeRef = useRef<number>(Date.now());

  // Start sound battle BGM when arena mounts
  useEffect(() => {
    sound.playWhistle();
    sound.startBattleBgm();
    return () => {
      sound.stopBattleBgm();
    };
  }, []);

  // Timer countdown hook
  useEffect(() => {
    if (isRoundFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        if (prev <= 4) {
          sound.playTick(true);
        } else if (prev % 3 === 0) {
          sound.playTick(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRoundFinished, currentRound]);

  // Handle Bot Turn in PvE mode for Blue Team
  useEffect(() => {
    if (mode === 'pve' && !hasAnsweredBlue && !isRoundFinished) {
      setBotThinking(true);
      const delay = Math.floor(Math.random() * 1800) + 1600;

      const botTimeout = setTimeout(() => {
        if (hasAnsweredBlue || isRoundFinished) return;

        let accuracyRate = 0.70;
        if (botDifficulty === 'easy') accuracyRate = 0.45;
        if (botDifficulty === 'hard') accuracyRate = 0.90;

        const isCorrect = Math.random() < accuracyRate;
        let chosen = currentBlueQ.correctIndex;

        if (!isCorrect) {
          const wrongIndices = [0, 1, 2, 3].filter((i) => i !== currentBlueQ.correctIndex);
          chosen = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
        }

        setBotThinking(false);
        resolveBlueAnswer(chosen);
      }, delay);

      return () => clearTimeout(botTimeout);
    }
  }, [currentRound, hasAnsweredBlue, isRoundFinished, mode, botDifficulty, currentBlueQ]);

  // When time runs out
  const handleTimeOut = useCallback(() => {
    if (!hasAnsweredRed) {
      resolveRedAnswer(null);
    }
    if (!hasAnsweredBlue) {
      resolveBlueAnswer(null);
    }
  }, [hasAnsweredRed, hasAnsweredBlue]);

  // Check if both sides answered, then finalize round
  useEffect(() => {
    if (hasAnsweredRed && hasAnsweredBlue && !isRoundFinished) {
      setIsRoundFinished(true);

      const redCorrect = selectedOptionRed === currentRedQ.correctIndex;
      const blueCorrect = selectedOptionBlue === currentBlueQ.correctIndex;

      let msg = '';
      if (redCorrect && !blueCorrect) {
        msg = `🚩 ${redPlayerName} trả lời đúng, giật dây mạnh về bên Đỏ!`;
      } else if (!redCorrect && blueCorrect) {
        msg = `🏁 ${bluePlayerName} trả lời đúng, giật dây mạnh về bên Xanh!`;
      } else if (redCorrect && blueCorrect) {
        if (redAnswerTime < blueAnswerTime) {
          msg = `⚡ Cả hai đều đúng! ${redPlayerName} nhanh hơn một chút!`;
        } else if (blueAnswerTime < redAnswerTime) {
          msg = `⚡ Cả hai đều đúng! ${bluePlayerName} nhanh hơn một chút!`;
        } else {
          msg = '⚖️ Cả hai đều đúng! Thế trận giằng co nghẹt thở!';
        }
      } else {
        msg = '❌ Cả hai đội đều chưa chính xác trong vòng này!';
      }
      setRoundFeedback(msg);

      // Auto advance to next round after 2.8s
      const nextTimer = setTimeout(() => {
        handleNextRound();
      }, 2800);

      return () => clearTimeout(nextTimer);
    }
  }, [hasAnsweredRed, hasAnsweredBlue, isRoundFinished]);

  // Resolve Red Answer
  const resolveRedAnswer = (optionIdx: number | null) => {
    if (hasAnsweredRed) return;
    setHasAnsweredRed(true);
    setSelectedOptionRed(optionIdx);

    const now = Date.now();
    const timeSpent = Math.max(1, Math.round((now - roundStartTimeRef.current) / 1000));
    setRedAnswerTime(timeSpent);

    const isCorrect = optionIdx !== null && optionIdx === currentRedQ.correctIndex;

    const record: AnswerRecord = {
      questionId: currentRedQ.id,
      questionText: currentRedQ.question,
      options: currentRedQ.options,
      correctIndex: currentRedQ.correctIndex,
      chosenIndex: optionIdx,
      isCorrect,
      timeTaken: timeSpent,
      team: 'red',
    };
    setAnswersList((prev) => [...prev, record]);

    if (isCorrect) {
      sound.playCorrect();
      const isQuick = timeSpent <= 4;
      const currentStreak = streakRed + 1;
      const isCombo = currentStreak >= 2;

      let pull = 10;
      if (isQuick) pull += 3;
      if (isCombo) pull += 4;

      setRopePosition((prev) => Math.min(100, prev + pull));
      setIsPullingRed(true);
      setStreakRed(currentStreak);
      setCorrectRed((c) => c + 1);
      setScoreRed((s) => s + pull * 10);
      sound.playRopePull(isCombo);
      setTimeout(() => setIsPullingRed(false), 900);
    } else {
      sound.playWrong();
      setStreakRed(0);
    }
  };

  // Resolve Blue Answer
  const resolveBlueAnswer = (optionIdx: number | null) => {
    if (hasAnsweredBlue) return;
    setHasAnsweredBlue(true);
    setSelectedOptionBlue(optionIdx);

    const now = Date.now();
    const timeSpent = Math.max(1, Math.round((now - roundStartTimeRef.current) / 1000));
    setBlueAnswerTime(timeSpent);

    const isCorrect = optionIdx !== null && optionIdx === currentBlueQ.correctIndex;

    const record: AnswerRecord = {
      questionId: currentBlueQ.id,
      questionText: currentBlueQ.question,
      options: currentBlueQ.options,
      correctIndex: currentBlueQ.correctIndex,
      chosenIndex: optionIdx,
      isCorrect,
      timeTaken: timeSpent,
      team: 'blue',
    };
    setAnswersList((prev) => [...prev, record]);

    if (isCorrect) {
      sound.playCorrect();
      const isQuick = timeSpent <= 4;
      const currentStreak = streakBlue + 1;
      const isCombo = currentStreak >= 2;

      let pull = 10;
      if (isQuick) pull += 3;
      if (isCombo) pull += 4;

      setRopePosition((prev) => Math.max(-100, prev - pull));
      setIsPullingBlue(true);
      setStreakBlue(currentStreak);
      setCorrectBlue((c) => c + 1);
      setScoreBlue((s) => s + pull * 10);
      sound.playRopePull(isCombo);
      setTimeout(() => setIsPullingBlue(false), 900);
    } else {
      sound.playWrong();
      setStreakBlue(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      // Red Team keys: 1, 2, 3, 4 OR A, B, C, D
      if (!hasAnsweredRed) {
        if (key === '1' || key === 'A') resolveRedAnswer(0);
        else if (key === '2' || key === 'B') resolveRedAnswer(1);
        else if (key === '3' || key === 'C') resolveRedAnswer(2);
        else if (key === '4' || key === 'D') resolveRedAnswer(3);
      }

      // Blue Team keys in PvP local mode: 7, 8, 9, 0 OR J, K, L, ;
      if (mode === 'pvp_local' && !hasAnsweredBlue) {
        if (key === '7' || key === 'J') resolveBlueAnswer(0);
        else if (key === '8' || key === 'K') resolveBlueAnswer(1);
        else if (key === '9' || key === 'L') resolveBlueAnswer(2);
        else if (key === '0' || key === ';') resolveBlueAnswer(3);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnsweredRed, hasAnsweredBlue, mode]);

  // Proceed to Next Round or Finish Match
  const handleNextRound = () => {
    sound.playClick();
    const nextRound = currentRound + 1;

    const isKnockoutRed = ropePosition >= 75;
    const isKnockoutBlue = ropePosition <= -75;

    if (nextRound >= 10 || isKnockoutRed || isKnockoutBlue) {
      finishMatch(isKnockoutRed, isKnockoutBlue);
      return;
    }

    setCurrentRound(nextRound);
    setSelectedOptionRed(null);
    setSelectedOptionBlue(null);
    setHasAnsweredRed(false);
    setHasAnsweredBlue(false);
    setIsRoundFinished(false);
    setRoundFeedback(null);
    setTimeLeft(timeLimit);
    roundStartTimeRef.current = Date.now();
  };

  // Finish match calculation
  const finishMatch = (knockoutRed: boolean, knockoutBlue: boolean) => {
    sound.stopBattleBgm();

    let winner: 'red' | 'blue' | 'draw' = 'draw';
    if (knockoutRed) {
      winner = 'red';
      sound.playVictory();
    } else if (knockoutBlue) {
      winner = 'blue';
      sound.playVictory();
    } else {
      if (ropePosition > 5) winner = 'red';
      else if (ropePosition < -5) winner = 'blue';
      else if (correctRed > correctBlue) winner = 'red';
      else if (correctBlue > correctRed) winner = 'blue';
      else winner = 'draw';

      if (winner !== 'draw') sound.playVictory();
    }

    const durationSeconds = Math.round((Date.now() - matchStartTimeRef.current) / 1000);
    const matchRecord: MatchRecord = {
      id: `match_${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN'),
      mode,
      botDifficulty,
      redPlayerName,
      bluePlayerName,
      scoreRed,
      scoreBlue,
      correctRed,
      correctBlue,
      winner,
      finalRopePosition: ropePosition,
      durationSeconds,
      answers: answersList,
    };

    onMatchComplete(matchRecord);
  };

  const timerPercentage = (timeLeft / timeLimit) * 100;
  const isUrgentTime = timeLeft <= 4;
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 py-2 space-y-2.5">
      {/* 1. TOP HEADER & MATCH CONTROLS */}
      <div className="flex items-center justify-between bg-white rounded-2xl border-2 border-stone-200 px-3 sm:px-5 py-2 shadow-xs">
        {/* Left Team Mini Status */}
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-red-600 animate-pulse shadow-xs" />
          <div>
            <span className="text-xs sm:text-sm font-black text-red-600 leading-tight block">
              {redPlayerName}
            </span>
            <span className="text-[11px] text-stone-500 font-bold">
              {correctRed}/10 đúng • {scoreRed} đ
            </span>
          </div>
        </div>

        {/* Center Round & Time Badge */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
              VÒNG ĐẤU
            </span>
            <span className="text-sm sm:text-base font-black text-stone-800">
              {currentRound + 1} <span className="text-xs text-stone-400">/ 10</span>
            </span>
          </div>

          {/* Rapid Timer Countdown */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-sm shadow-xs transition-colors ${
              isUrgentTime
                ? 'bg-red-500 text-white animate-bounce'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>

          {onRefreshQuestions && (
            <button
              onClick={() => {
                sound.playClick();
                onRefreshQuestions();
              }}
              title="Làm mới câu hỏi cho cả 2 đội"
              className="text-stone-600 hover:text-stone-900 font-bold hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 transition cursor-pointer text-xs"
            >
              <RefreshCw className="w-3 h-3 text-amber-600" />
              <span>Đổi câu</span>
            </button>
          )}
        </div>

        {/* Right Team Mini Status */}
        <div className="flex items-center gap-2 text-right">
          <div>
            <span className="text-xs sm:text-sm font-black text-blue-600 leading-tight block">
              {bluePlayerName}
            </span>
            <span className="text-[11px] text-stone-500 font-bold">
              {correctBlue}/10 đúng • {scoreBlue} đ
            </span>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 animate-pulse shadow-xs" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isUrgentTime ? 'bg-red-500' : timeLeft <= 7 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. BỐ CỤC: [BẢN ĐỘI ĐỎ]  ---  [ĐỘI KÉO CO Ở GIỮA]  ---  [BẢN ĐỘI XANH]    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 xl:gap-3.5 items-stretch">
        
        {/* ======================================================================= */}
        {/* [BẢN BÊN TRÁI] BẢNG CÂU HỎI ĐỘI ĐỎ                                      */}
        {/* ======================================================================= */}
        <div className="order-2 lg:order-1 lg:col-span-3 xl:col-span-3 flex flex-col">
          <div
            className={`flex-1 rounded-2xl border-2 transition-all duration-200 p-3 sm:p-4 bg-white shadow-md relative overflow-hidden flex flex-col justify-between ${
              isPullingRed
                ? 'ring-4 ring-red-400 border-red-500 bg-red-50/30'
                : hasAnsweredRed
                ? selectedOptionRed === currentRedQ.correctIndex
                  ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/20'
                  : 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/20'
                : 'border-red-300 hover:border-red-400 ring-1 ring-red-100'
            }`}
          >
            <div>
              {/* Header Bản Đỏ */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-red-600 text-white flex items-center justify-center text-sm font-extrabold shadow-xs">
                    🚩
                  </span>
                  <div>
                    <div className="font-extrabold text-xs text-red-600 flex items-center gap-1">
                      <span>{redPlayerName}</span>
                      {streakRed >= 2 && (
                        <span className="bg-amber-400 text-red-950 text-[9px] px-1 py-0.2 rounded-full font-black flex items-center shadow-xs">
                          <Flame className="w-2.5 h-2.5 mr-0.5" />x{streakRed}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400 font-bold">
                      Bản Bên Trái • Câu {currentRound + 1}/10
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200 flex items-center gap-0.5">
                  <span>Kéo Dây</span>
                  <span className="text-red-600 font-black">👉</span>
                </span>
              </div>

              {/* Tag chủ đề */}
              <div className="mb-1.5">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 inline-block">
                  {currentRedQ.category}
                </span>
              </div>

              {/* Câu hỏi Đội Đỏ */}
              <div className="min-h-[52px] sm:min-h-[58px] flex items-center mb-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                  {currentRedQ.question}
                </h3>
              </div>

              {/* 4 Phương án lựa chọn Đội Đỏ */}
              <div className="space-y-1.5">
                {currentRedQ.options.map((option, idx) => {
                  const isSelected = selectedOptionRed === idx;
                  const isCorrect = idx === currentRedQ.correctIndex;

                  let btnStyle = 'bg-stone-50 hover:bg-red-50 text-stone-800 border-stone-200 hover:border-red-300';
                  if (hasAnsweredRed) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 font-semibold';
                    } else {
                      btnStyle = 'bg-stone-100 text-stone-400 border-stone-200 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`red-opt-${idx}`}
                      disabled={hasAnsweredRed}
                      onClick={() => resolveRedAnswer(idx)}
                      className={`w-full p-2 sm:p-2.5 rounded-xl border-2 text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px] shrink-0 ${
                            hasAnsweredRed && isCorrect
                              ? 'bg-white text-emerald-700'
                              : hasAnsweredRed && isSelected
                              ? 'bg-white text-rose-600'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {optionLetters[idx]}
                        </span>
                        <span className="text-xs font-semibold leading-tight line-clamp-2">
                          {option}
                        </span>
                      </div>

                      {hasAnsweredRed && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                      {hasAnsweredRed && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Bản Đỏ */}
            <div className="mt-2.5 pt-2 border-t border-stone-100 min-h-[26px] flex items-center justify-between text-xs">
              {!hasAnsweredRed ? (
                <span className="text-stone-400 font-medium text-[10px]">
                  ⌨️ Phím tắt: [1] [2] [3] [4]
                </span>
              ) : (
                <span
                  className={`font-bold flex items-center gap-1 text-[11px] ${
                    selectedOptionRed === currentRedQ.correctIndex ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {selectedOptionRed === currentRedQ.correctIndex ? '✅ Trả lời đúng!' : '❌ Chưa chính xác!'}
                  <span className="text-stone-500 font-normal text-[10px] ml-1">
                    ({redAnswerTime}s)
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* [Ở GIỮA 2 BẢN] ĐỘI KÉO CO (SÂN ĐẤU & 2 ĐỘI KÉO CO NẰM Ở TRUNG TÂM)      */}
        {/* ======================================================================= */}
        <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-2.5">
          {/* Sân kéo co với 2 đội kéo co ở giữa 2 bản câu hỏi */}
          <div className="relative">
            <TugOfWarStage
              ropePosition={ropePosition}
              isPullingRed={isPullingRed}
              isPullingBlue={isPullingBlue}
              streakRed={streakRed}
              streakBlue={streakBlue}
              redName={redPlayerName}
              blueName={bluePlayerName}
              heightClass="h-44 sm:h-52 md:h-56 lg:h-60"
            />
          </div>

          {/* Thanh đo lực kéo cân bằng trực quan ở giữa */}
          <div className="bg-white rounded-2xl border-2 border-stone-200 p-2.5 sm:p-3 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-red-600 flex items-center gap-1">
                <span>◀ Đội Đỏ</span>
                {ropePosition > 0 && <span className="text-amber-500 font-black">+{Math.round(ropePosition)}%</span>}
              </span>

              <span className="text-stone-600 text-[11px] font-extrabold">
                {Math.abs(ropePosition) < 5
                  ? '⚖️ Vạch cân bằng ở giữa'
                  : ropePosition > 0
                  ? '🔥 Đội Đỏ đang chiếm ưu thế!'
                  : '⚡ Đội Xanh đang chiếm ưu thế!'}
              </span>

              <span className="text-blue-600 flex items-center gap-1">
                {ropePosition < 0 && <span className="text-cyan-600 font-black">+{Math.abs(Math.round(ropePosition))}%</span>}
                <span>Đội Xanh ▶</span>
              </span>
            </div>

            {/* Visual Balance Bar */}
            <div className="relative h-3.5 bg-stone-100 rounded-full overflow-hidden border border-stone-300">
              {/* Center dividing line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-stone-500 z-10" />
              {/* Knockout marks */}
              <div className="absolute top-0 bottom-0 left-[12%] w-0.5 bg-red-400 border-r border-dashed" title="Vạch Knockout Đỏ" />
              <div className="absolute top-0 bottom-0 right-[12%] w-0.5 bg-blue-400 border-r border-dashed" title="Vạch Knockout Xanh" />

              {/* Dynamic filled rope position */}
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, Math.max(0, 50 - ropePosition / 2))}%`,
                  backgroundColor: ropePosition > 10 ? '#ef4444' : ropePosition < -10 ? '#3b82f6' : '#f59e0b',
                }}
              />
            </div>
          </div>

          {/* Thông báo kết quả vòng đấu & Nút tiếp tục */}
          <AnimatePresence>
            {isRoundFinished && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-2.5 sm:p-3 bg-stone-900 text-white rounded-2xl flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-300">
                  <Zap className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                  <span className="line-clamp-1">{roundFeedback}</span>
                </div>

                <button
                  onClick={handleNextRound}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs shrink-0 ml-2"
                >
                  <span>Vòng tiếp</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================================= */}
        {/* [BẢN BÊN PHẢI] BẢNG CÂU HỎI ĐỘI XANH                                     */}
        {/* ======================================================================= */}
        <div className="order-3 lg:order-3 lg:col-span-3 xl:col-span-3 flex flex-col">
          <div
            className={`flex-1 rounded-2xl border-2 transition-all duration-200 p-3 sm:p-4 bg-white shadow-md relative overflow-hidden flex flex-col justify-between ${
              isPullingBlue
                ? 'ring-4 ring-blue-400 border-blue-500 bg-blue-50/30'
                : hasAnsweredBlue
                ? selectedOptionBlue === currentBlueQ.correctIndex
                  ? 'border-emerald-500 ring-2 ring-emerald-200 bg-emerald-50/20'
                  : 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/20'
                : 'border-blue-300 hover:border-blue-400 ring-1 ring-blue-100'
            }`}
          >
            <div>
              {/* Header Bản Xanh */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-0.5">
                  <span className="text-blue-600 font-black">👈</span>
                  <span>Kéo Dây</span>
                </span>

                <div className="flex items-center gap-2 text-right">
                  <div>
                    <div className="font-extrabold text-xs text-blue-600 flex items-center justify-end gap-1">
                      {streakBlue >= 2 && (
                        <span className="bg-cyan-300 text-blue-950 text-[9px] px-1 py-0.2 rounded-full font-black flex items-center shadow-xs">
                          <Zap className="w-2.5 h-2.5 mr-0.5" />x{streakBlue}
                        </span>
                      )}
                      <span>{bluePlayerName}</span>
                    </div>
                    <div className="text-[10px] text-stone-400 font-bold">
                      Bản Bên Phải • Câu {currentRound + 1}/10
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-extrabold shadow-xs">
                    🏁
                  </span>
                </div>
              </div>

              {/* Tag chủ đề */}
              <div className="mb-1.5 text-right">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 inline-block">
                  {currentBlueQ.category}
                </span>
              </div>

              {/* Câu hỏi Đội Xanh */}
              <div className="min-h-[52px] sm:min-h-[58px] flex items-center mb-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                  {currentBlueQ.question}
                </h3>
              </div>

              {/* Bot suy nghĩ trong chế độ PvE */}
              {botThinking && (
                <div className="p-2 mb-2 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-2 text-blue-800 text-[11px] font-bold animate-pulse">
                  <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>{bluePlayerName} đang phân tích...</span>
                </div>
              )}

              {/* 4 Phương án lựa chọn Đội Xanh */}
              <div className="space-y-1.5">
                {currentBlueQ.options.map((option, idx) => {
                  const isSelected = selectedOptionBlue === idx;
                  const isCorrect = idx === currentBlueQ.correctIndex;

                  let btnStyle = 'bg-stone-50 hover:bg-blue-50 text-stone-800 border-stone-200 hover:border-blue-300';
                  if (hasAnsweredBlue) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600 font-semibold';
                    } else {
                      btnStyle = 'bg-stone-100 text-stone-400 border-stone-200 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`blue-opt-${idx}`}
                      disabled={hasAnsweredBlue || (mode === 'pve' && botThinking)}
                      onClick={() => {
                        if (mode === 'pvp_local') {
                          resolveBlueAnswer(idx);
                        }
                      }}
                      className={`w-full p-2 sm:p-2.5 rounded-xl border-2 text-left transition-all duration-150 flex items-center justify-between ${
                        mode === 'pvp_local' && !hasAnsweredBlue ? 'cursor-pointer' : 'cursor-default'
                      } ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[11px] shrink-0 ${
                            hasAnsweredBlue && isCorrect
                              ? 'bg-white text-emerald-700'
                              : hasAnsweredBlue && isSelected
                              ? 'bg-white text-rose-600'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {optionLetters[idx]}
                        </span>
                        <span className="text-xs font-semibold leading-tight line-clamp-2">
                          {option}
                        </span>
                      </div>

                      {hasAnsweredBlue && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
                      {hasAnsweredBlue && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Bản Xanh */}
            <div className="mt-2.5 pt-2 border-t border-stone-100 min-h-[26px] flex items-center justify-between text-xs">
              {!hasAnsweredBlue ? (
                <span className="text-stone-400 font-medium text-[10px]">
                  {mode === 'pve' ? '🤖 Máy tự động trả lời' : '⌨️ Phím tắt: [7] [8] [9] [0]'}
                </span>
              ) : (
                <span
                  className={`font-bold flex items-center gap-1 text-[11px] ${
                    selectedOptionBlue === currentBlueQ.correctIndex ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {selectedOptionBlue === currentBlueQ.correctIndex ? '✅ Trả lời đúng!' : '❌ Chưa chính xác!'}
                  <span className="text-stone-500 font-normal text-[10px] ml-1">
                    ({blueAnswerTime}s)
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* 3. FOOTER INFO & CONTROLS */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-2 pt-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-stone-600 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
            <span>Bố cục 3 cột đối xứng: Bản câu hỏi Đỏ (Trái) — Đội kéo co (Ở giữa) — Bản câu hỏi Xanh (Phải)</span>
          </span>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Bạn có chắc muốn dừng trận đấu hiện tại và trở về sảnh?')) {
              onExitToMenu();
            }
          }}
          className="text-stone-500 hover:text-red-600 font-semibold cursor-pointer underline underline-offset-2 text-xs"
        >
          Rời trận
        </button>
      </div>
    </div>
  );
};
