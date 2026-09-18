import React, { useState } from 'react';

// ============================================================================
// 1. MODAL XEM CHI TIẾT CÔNG VIỆC
// ============================================================================
export function TaskDetailModal({ task, onClose, onEdit, renderPriorityBadge, renderStatusBadge, getInitials }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-blue-600 bg-blue-100/80 border border-blue-200 px-2.5 py-0.5 rounded-md font-mono">
              {task.code}
            </span>
            <h2 className="text-lg font-bold text-slate-900">Chi Tiết Công Việc</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
              {task.category}
            </span>
            {renderPriorityBadge(task.priority)}
            {renderStatusBadge(task.status)}
          </div>

          <h3 className="text-xl font-bold text-slate-900 leading-snug">
            {task.title}
          </h3>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-slate-700">Tiến độ hoàn thành</span>
              <span className="text-blue-600 text-base">{task.progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mô tả chi tiết</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100 whitespace-pre-line">
              {task.description || 'Chưa có mô tả chi tiết cho công việc này.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-400 block mb-1">Người thực hiện</span>
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px]">
                  {getInitials(task.assignee)}
                </div>
                <span>{task.assignee}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-400 block mb-1">Hạn chót (Due Date)</span>
              <span className="text-sm font-semibold text-blue-600">📅 {task.dueDate}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-400 block mb-1">Ngày tạo</span>
              <span className="text-sm font-semibold text-slate-800">{task.createdAt}</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <span className="text-xs text-slate-400 block mb-1">Lần sửa cuối</span>
              <span className="text-sm font-semibold text-slate-800">{task.updatedAt || task.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onEdit(task);
              onClose();
            }}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
          >
            ✏️ Chỉnh sửa task này
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. MODAL THÊM / SỬA CÔNG VIỆC
// ============================================================================
export function TaskFormModal({ mode, initialData, categories, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...initialData });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tên công việc';
    if (!formData.code.trim()) newErrors.code = 'Vui lòng nhập mã công việc (Code)';
    if (!formData.dueDate) newErrors.dueDate = 'Vui lòng chọn hạn chót';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">
            {mode === 'create' ? '✨ Tạo Công Việc Mới' : '✏️ Chỉnh Sửa Công Việc'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên công việc / Dự án <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border ${
                  errors.title ? 'border-rose-500' : 'border-slate-200'
                } rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all`}
                placeholder="Ví dụ: Thiết kế giao diện Dashboard Admin"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mã công việc (Code) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border ${
                    errors.code ? 'border-rose-500' : 'border-slate-200'
                  } rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all font-mono`}
                  placeholder="TSK-101"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                />
                {errors.code && <p className="text-xs text-rose-500 mt-1">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Danh mục <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mức độ ưu tiên <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                >
                  <option value="urgent">🔥 Khẩn cấp</option>
                  <option value="high">🔴 Ưu tiên cao</option>
                  <option value="medium">🟡 Trung bình</option>
                  <option value="low">🟢 Thấp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trạng thái <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="todo">⏳ Cần làm</option>
                  <option value="in_progress">⚡ Đang thực hiện</option>
                  <option value="review">👁 Đang kiểm thử</option>
                  <option value="completed">✓ Hoàn thành</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiến độ hoàn thành ({formData.progress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  className="w-full accent-blue-600 cursor-pointer mt-2"
                  value={formData.progress}
                  onChange={(e) => handleChange('progress', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hạn chót (Due Date) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  className={`w-full px-3.5 py-2 text-sm bg-slate-50 border ${
                    errors.dueDate ? 'border-rose-500' : 'border-slate-200'
                  } rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all`}
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />
                {errors.dueDate && <p className="text-xs text-rose-500 mt-1">{errors.dueDate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Người thực hiện</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.assignee}
                onChange={(e) => handleChange('assignee', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả công việc</label>
              <textarea
                rows="3"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white transition-all"
                placeholder="Nhập ghi chú hoặc yêu cầu chi tiết..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
            >
              {mode === 'create' ? 'Tạo công việc' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MODAL XÁC NHẬN XOÁ
// ============================================================================
export function DeleteConfirmModal({ target, onClose, onConfirm }) {
  if (!target) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-2xl mx-auto border border-rose-100">
            🗑
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Xác Nhận Xoá Task</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bạn có chắc chắn muốn xoá công việc <strong className="text-slate-800">[{target.code}] {target.title}</strong>?
            </p>
            <p className="text-[11px] text-rose-500 font-medium mt-1">Hành động này không thể hoàn tác.</p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition-colors"
          >
            Đồng ý xoá
          </button>
        </div>
      </div>
    </div>
  );
}
