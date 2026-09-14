import React, { useState, useEffect } from 'react';
import { GameMode, BotDifficulty, MatchRecord, UserProfile, GameSettings, Question } from './types';
import { getFreshMatchQuestions } from './data/questions';
import { getUserProfile, getGameSettings, saveGameSettings, recordMatch, getLeaderboard } from './utils/storage';
import { sound } from './utils/sound';
import { HeaderNav } from './components/HeaderNav';
import { HomeLobby } from './components/HomeLobby';
import { GameArena } from './components/GameArena';
import { GameOverModal } from './components/GameOverModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { RulesModal } from './components/RulesModal';
import { ReviewModal } from './components/ReviewModal';

export default function App() {
  // App State
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [settings, setSettings] = useState<GameSettings>(getGameSettings());
  const [currentScreen, setCurrentScreen] = useState<'lobby' | 'playing'>('lobby');

  // Active Game Setup
  const [gameMode, setGameMode] = useState<GameMode>('pve');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');
  const [redName, setRedName] = useState<string>('Đội Đỏ');
  const [blueName, setBlueName] = useState<string>('Robot Trí Tuệ');

  // Dual Team Questions (10 fresh questions for Red, 10 fresh questions for Blue)
  const [redQuestions, setRedQuestions] = useState<Question[]>([]);
  const [blueQuestions, setBlueQuestions] = useState<Question[]>([]);

  // Modals
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [lastMatch, setLastMatch] = useState<MatchRecord | null>(null);
  const [reviewMatch, setReviewMatch] = useState<MatchRecord | null>(null);

  // Sync sound settings with engine on mount
  useEffect(() => {
    sound.setSoundEnabled(settings.soundEnabled);
    sound.setMusicEnabled(settings.musicEnabled);
    sound.setSoundVolume(settings.soundVolume);
    sound.setMusicVolume(settings.musicVolume);
  }, [settings]);

  // Start new match - Always draw fresh, non-repeating questions
  const handleStartGame = (mode: GameMode, botDiff: BotDifficulty, red: string, blue: string) => {
    setGameMode(mode);
    setBotDifficulty(botDiff);
    setRedName(red);
    setBlueName(blue);

    // Continuous fresh questions every single match!
    const { redQuestions: freshRed, blueQuestions: freshBlue } = getFreshMatchQuestions(
      settings.selectedCategories
    );

    setRedQuestions(freshRed);
    setBlueQuestions(freshBlue);
    setCurrentScreen('playing');
  };

  // Re-roll / Refresh questions on demand
  const handleRefreshQuestions = () => {
    const { redQuestions: freshRed, blueQuestions: freshBlue } = getFreshMatchQuestions(
      settings.selectedCategories
    );
    setRedQuestions(freshRed);
    setBlueQuestions(freshBlue);
  };

  // Match completed
  const handleMatchComplete = (match: MatchRecord) => {
    // Record into user profile & update leaderboard
    const updated = recordMatch(match, 'red');
    setProfile(updated);
    setLastMatch(match);
  };

  // Replay match with 100% fresh questions
  const handlePlayAgain = () => {
    setLastMatch(null);
    handleStartGame(gameMode, botDifficulty, redName, blueName);
  };

  // Return to Lobby
  const handleExitToMenu = () => {
    sound.stopBattleBgm();
    setLastMatch(null);
    setCurrentScreen('lobby');
  };

  const handleUpdateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveGameSettings(newSettings);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 selection:bg-red-500 selection:text-white">
      {/* 1. Header Navigation Bar */}
      <HeaderNav
        profile={profile}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenProfile={() => setShowProfile(true)}
        onOpenRules={() => setShowRules(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* 2. Main Content View */}
      <main className="flex-1 flex flex-col justify-center py-2 sm:py-4">
        {currentScreen === 'lobby' ? (
          <HomeLobby
            profile={profile}
            settings={settings}
            onStartGame={handleStartGame}
            onOpenLeaderboard={() => setShowLeaderboard(true)}
            onOpenProfile={() => setShowProfile(true)}
            onOpenRules={() => setShowRules(true)}
          />
        ) : (
          <GameArena
            mode={gameMode}
            botDifficulty={botDifficulty}
            redPlayerName={redName}
            bluePlayerName={blueName}
            redQuestions={redQuestions}
            blueQuestions={blueQuestions}
            settings={settings}
            onMatchComplete={handleMatchComplete}
            onExitToMenu={handleExitToMenu}
            onRefreshQuestions={handleRefreshQuestions}
          />
        )}
      </main>

      {/* 3. Modals */}
      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal
          leaderboard={getLeaderboard()}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* User Profile & Match History Modal */}
      {showProfile && (
        <ProfileModal
          profile={profile}
          onUpdateProfile={(up) => setProfile(up)}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          onSaveSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Rules & Guide Modal */}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {/* Game Over / Victory Modal */}
      {lastMatch && (
        <GameOverModal
          match={lastMatch}
          profile={profile}
          onPlayAgain={handlePlayAgain}
          onHome={handleExitToMenu}
          onReviewAnswers={() => {
            setReviewMatch(lastMatch);
            setLastMatch(null);
          }}
        />
      )}

      {/* Review Answers Modal */}
      {reviewMatch && (
        <ReviewModal
          match={reviewMatch}
          onClose={() => {
            setReviewMatch(null);
            setCurrentScreen('lobby');
          }}
        />
      )}
    </div>
  );
}
