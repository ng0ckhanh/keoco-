import React from 'react';
import { GameSettings } from '../types';
import { QUESTION_CATEGORIES } from '../data/questions';
import { sound } from '../utils/sound';
import { Settings, X, Volume2, VolumeX, Music, Clock, BookOpen, Check, Wifi, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onSaveSettings: (settings: GameSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSaveSettings,
  onClose,
}) => {
  const handleSoundToggle = () => {
    const next = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: next };
    sound.setSoundEnabled(next);
    onSaveSettings(updated);
    if (next) sound.playClick();
  };

  const handleMusicToggle = () => {
    const next = !settings.musicEnabled;
    const updated = { ...settings, musicEnabled: next };
    sound.setMusicEnabled(next);
    onSaveSettings(updated);
    if (next) sound.playClick();
  };

  const handleSoundVol = (val: number) => {
    const updated = { ...settings, soundVolume: val };
    sound.setSoundVolume(val);
    onSaveSettings(updated);
  };

  const handleTimeChange = (sec: number) => {
    sound.playClick();
    onSaveSettings({ ...settings, timePerQuestion: sec });
  };

  const toggleCategory = (cat: string) => {
    sound.playClick();
    let current = [...settings.selectedCategories];
    if (cat === 'Tất cả') {
      onSaveSettings({ ...settings, selectedCategories: ['Tất cả'] });
      return;
    }

    current = current.filter((c) => c !== 'Tất cả');
    if (current.includes(cat)) {
      current = current.filter((c) => c !== cat);
      if (current.length === 0) current = ['Tất cả'];
    } else {
      current.push(cat);
    }
    onSaveSettings({ ...settings, selectedCategories: current });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
              <Settings className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold font-display leading-tight">
                Cài Đặt Trò Chơi
              </h2>
              <p className="text-xs text-stone-400">Âm thanh, thời gian & Chế độ Offline</p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 divide-y divide-stone-100">
          {/* Sound settings */}
          <div className="space-y-3 pt-0">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-red-500" />
              <span>Hiệu ứng âm thanh</span>
            </h3>

            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <div>
                <div className="font-bold text-sm text-stone-800">Âm thanh còi, kéo co & chuông</div>
                <div className="text-xs text-stone-500">Hiệu ứng âm thanh sống động Web Audio</div>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                  settings.soundEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Sound Volume Slider */}
            {settings.soundEnabled && (
              <div className="px-2 space-y-1">
                <div className="flex justify-between text-xs text-stone-500 font-medium">
                  <span>Âm lượng hiệu ứng</span>
                  <span>{Math.round(settings.soundVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={settings.soundVolume}
                  onChange={(e) => handleSoundVol(parseFloat(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            )}

            {/* Tension BGM Loop */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <div>
                <div className="font-bold text-sm text-stone-800">Nhịp trống hồi hộp</div>
                <div className="text-xs text-stone-500">Tạo không khí thi đấu cuồng nhiệt</div>
              </div>
              <button
                onClick={handleMusicToggle}
                className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                  settings.musicEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    settings.musicEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Time per question */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Thời gian mỗi câu hỏi</span>
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleTimeChange(sec)}
                  className={`py-2 px-3 rounded-xl font-extrabold text-sm border-2 transition cursor-pointer ${
                    settings.timePerQuestion === sec
                      ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Subject / Categories */}
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Chủ đề kiến thức</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {QUESTION_CATEGORIES.map((cat) => {
                const isSelected =
                  settings.selectedCategories.includes(cat) ||
                  (settings.selectedCategories.includes('Tất cả') && cat === 'Tất cả');

                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Offline Architecture Guarantee */}
          <div className="pt-4 space-y-2">
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-300 flex items-start gap-3">
              <Wifi className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-950 space-y-1">
                <div className="font-extrabold text-emerald-900">
                  Hỗ Trợ Ngoại Tuyến 100% (Offline Ready)
                </div>
                <p className="leading-relaxed">
                  Trò chơi Kéo Co Tri Thức hoạt động mượt mà không cần Internet: toàn bộ kho câu hỏi, âm thanh tổng hợp Web Audio, hồ sơ cá nhân và bảng xếp hạng đều được lưu trữ an toàn ngay trên trình duyệt của bạn!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl transition cursor-pointer"
          >
            Hoàn Tất
          </button>
        </div>
      </div>
    </div>
  );
};
