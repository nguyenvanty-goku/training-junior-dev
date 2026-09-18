import React from 'react';

export default function WelcomeBanner({ onOpenCreateModal }) {
  return (
    <section 
      id="welcome-banner" 
      className="relative overflow-hidden my-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white shadow-2xl border border-slate-800"
    >
      {/* Nền hiệu ứng đốm mờ trang trí */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:py-16 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* Cột Nội Dung Văn Bản */}
        <div className="w-full lg:w-7/12 flex flex-col items-start text-left space-y-5">
          
          {/* Badge Nổi Bật */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>🚀 Nền Tảng Quản Lý Công Việc</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Hệ Thống Quản Lý <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
              Công Việc & Tiến Độ Dự Án
            </span>
          </h1>

          {/* Mô tả */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Giải pháp theo dõi nhiệm vụ, phân công nhân sự và kiểm soát tiến độ thời gian thực.
            Tối ưu hóa quy trình làm việc, sử dụng thẻ ưu tiên và trực quan hóa dữ liệu linh hoạt.
          </p>

          {/* Danh sách tính năng nổi bật */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Giao diện responsive</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
              <span className="text-blue-400 font-bold">✓</span>
              <span>Cập nhật thời gian thực</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-sm">
              <span className="text-amber-400 font-bold">✓</span>
              <span>Tự động lưu trữ</span>
            </div>
          </div>

          {/* Nhóm Nút Thao Tác */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={onOpenCreateModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Tạo Công Việc Mới</span>
            </button>

            <a
              href="#task-list-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-base border border-white/15 backdrop-blur-md transition-all duration-200"
            >
              <span>Xem Danh Sách Task</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </a>
          </div>

        </div>

        {/* Cột Xem Trước Card */}
        <div className="w-full lg:w-5/12 flex justify-center">
          <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-5 shadow-2xl space-y-4">
            {/* Header thẻ xem trước */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono text-slate-400 ml-2">TSK-DASHBOARD</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ● Live Realtime
              </span>
            </div>

            {/* Xem trước mẫu công việc đang thực hiện */}
            <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-blue-400 font-bold">TSK-101</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-semibold">
                  🔥 Khẩn cấp
                </span>
              </div>
              <h2 className="text-sm font-bold text-white leading-snug">
                Giao diện quản lý công việc
              </h2>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Tiến độ thực hiện</span>
                  <span className="font-bold text-blue-400">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[85%]"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/40">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                    FE
                  </div>
                  <span className="text-slate-300">Frontend Team</span>
                </div>
                <span className="text-slate-400">Hạn: Hôm nay</span>
              </div>
            </div>

            {/* Chân thẻ xem trước */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Trạng thái hoạt động</span>
              <span className="text-emerald-400 font-semibold">Ổn định</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
