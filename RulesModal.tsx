import React from 'react';
import { HelpCircle, X, CheckCircle, Zap, Flame, Trophy, Shield } from 'lucide-react';
import { sound } from '../utils/sound';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 via-amber-500 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold font-display leading-tight">
                Luật Chơi Kéo Co Tri Thức
              </h2>
              <p className="text-xs text-amber-100">Dễ hiểu cho mọi lứa tuổi</p>
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-stone-800 text-sm leading-relaxed flex-1">
          {/* Rule 1 */}
          <div className="flex gap-3 p-3.5 bg-red-50/80 rounded-2xl border border-red-200">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white font-extrabold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <div className="font-extrabold text-red-950 text-base">Giao Diện 2 Bảng Câu Hỏi 2 Bên Ở Trên</div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1">
                Bảng câu hỏi Đội Đỏ ở bên trái và Đội Xanh ở bên phải ở phía trên. Sân đấu kéo co dây thừng nằm ngay bên dưới hiển thị lực giằng co trực tiếp trong thời gian thực!
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex gap-3 p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <div className="font-extrabold text-emerald-950 text-base">Làm Mới Câu Hỏi Liên Tục Mỗi Trận</div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1">
                Mỗi trận đấu hệ thống tự động bốc 20 câu hỏi hoàn toàn mới từ ngân hàng đa chủ đề và xáo trộn vị trí các đáp án A, B, C, D, không lo lặp lại!
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex gap-3 p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-extrabold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <div className="font-extrabold text-amber-950 text-base">Trả Lời Đúng Để Kéo Dây</div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1">
                Mỗi câu trả lời đúng sẽ tạo lực kéo dây thừng về phía đội mình. Trả lời càng nhanh (dưới 4 giây) sẽ được thưởng thêm lực kéo tốc độ!
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex gap-3 p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <div className="font-extrabold text-purple-950 text-base">Sức Mạnh Chuỗi Thắng (Combo)</div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1">
                Trả lời đúng liên tiếp từ 2 câu trở lên sẽ kích hoạt Combo Boost (+5 đến +10 lực kéo), tạo bước ngoặt lớn lật ngược tình thế!
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex gap-3 p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <div className="font-extrabold text-blue-950 text-base">Chiến Thắng Chung Cuộc & Knockout</div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1">
                - <b>Thắng Knockout:</b> Nếu kéo mốc đỏ chạm vạch đích (80% lực kéo), đội bạn thắng ngay lập tức!
                <br />
                - <b>Thắng Sau 10 Câu:</b> Đội nào có số câu trả lời đúng nhiều nhất hoặc giữ ưu thế kéo dây sẽ giành chiến thắng chung cuộc!
              </p>
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
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition cursor-pointer shadow-md"
          >
            Đã Hiểu, Bắt Đầu Chơi!
          </button>
        </div>
      </div>
    </div>
  );
};
