import React from 'react';
import { MatchRecord } from '../types';
import { X, CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { sound } from '../utils/sound';

interface ReviewModalProps {
  match: MatchRecord;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold font-display leading-tight">
                Chi Tiết Đáp Án & Giải Thích
              </h2>
              <p className="text-xs text-stone-400">
                Ôn tập kiến thức vừa trả lời trong trận đấu
              </p>
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

        {/* List of answers */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {(!match.answers || match.answers.length === 0) ? (
            <div className="text-center py-10 text-stone-400">
              Không có dữ liệu câu trả lời cho trận này.
            </div>
          ) : (
            match.answers.map((ans, idx) => {
              const correctText = ans.options[ans.correctIndex];
              const chosenText = ans.chosenIndex !== null ? ans.options[ans.chosenIndex] : 'Hết giờ (Không chọn)';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 transition ${
                    ans.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-rose-50/70 border-rose-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          ans.team === 'red'
                            ? 'bg-red-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {ans.team === 'red' ? match.redPlayerName : match.bluePlayerName}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">
                        Thời gian: {ans.timeTaken}s
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-bold text-xs">
                      {ans.isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Chính xác
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Chưa đúng
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-stone-900 mb-2">
                    Câu {idx + 1}: {ans.questionText}
                  </h3>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="text-stone-700">
                      <span className="font-bold">Đã chọn: </span>
                      <span className={ans.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-semibold line-through'}>
                        {chosenText}
                      </span>
                    </div>

                    {!ans.isCorrect && (
                      <div className="text-emerald-800 font-bold">
                        <span>Đáp án đúng: </span>
                        <span>{correctText}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
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
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
