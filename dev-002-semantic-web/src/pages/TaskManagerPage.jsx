import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_TASKS, CATEGORIES } from '../data/initialTasks';
import WelcomeBanner from '../components/WelcomeBanner';
import { TaskDetailModal, TaskFormModal, DeleteConfirmModal } from '../components/TaskModals';

export default function TaskManagerPage() {
  // --- STATE DỮ LIỆU TASKS ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('task_manager_v5');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('task_manager_v5', JSON.stringify(tasks));
  }, [tasks]);

  // --- STATE BỘ LỌC & TÌM KIẾM ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate_asc');
  const [viewMode, setViewMode] = useState('card');

  // --- STATE MODALS & TOAST ---
  const [detailTask, setDetailTask] = useState(null);
  const [formModalState, setFormModalState] = useState({ isOpen: false, mode: 'create', data: null });
  const [deleteTaskTarget, setDeleteTaskTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResetData = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục danh sách công việc mẫu ban đầu?')) {
      setTasks(INITIAL_TASKS);
      showToast('Đã khôi phục dữ liệu công việc mẫu!', 'info');
    }
  };

  // --- LỌC VÀ SẮP XẾP ---
  const filteredTasks = useMemo(() => {
    const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };

    return tasks.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Tất cả' || item.category === selectedCategory;

      const matchesPriority =
        selectedPriority === 'all' || item.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === 'all' || item.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'dueDate_asc') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'priority_desc') return priorityWeight[b.priority] - priorityWeight[a.priority];
      if (sortBy === 'progress_desc') return b.progress - a.progress;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'name_asc') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [tasks, searchQuery, selectedCategory, selectedPriority, selectedStatus, sortBy]);

  // --- THỐNG KÊ ---
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress' || t.status === 'review').length;
    const urgentOrHigh = tasks.filter((t) => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'completed').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;

    return { total, inProgress, urgentOrHigh, completed };
  }, [tasks]);

  // --- CRUD ---
  const handleOpenCreateModal = () => {
    setFormModalState({
      isOpen: true,
      mode: 'create',
      data: {
        code: `TSK-${Math.floor(100 + Math.random() * 900)}`,
        title: '',
        category: 'Front-end',
        priority: 'medium',
        status: 'todo',
        progress: 0,
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        assignee: 'Chưa phân công',
        description: '',
      },
    });
  };

  const handleOpenEditModal = (task) => {
    setFormModalState({
      isOpen: true,
      mode: 'edit',
      data: { ...task },
    });
  };

  const handleSaveTask = (formData) => {
    const today = new Date().toISOString().split('T')[0];

    if (formModalState.mode === 'create') {
      const newTask = {
        ...formData,
        id: `task-${Date.now()}`,
        progress: Number(formData.progress) || 0,
        createdAt: today,
        updatedAt: today,
      };
      setTasks([newTask, ...tasks]);
      showToast(`Đã tạo công việc "${newTask.title}"!`, 'success');
    } else {
      const updatedList = tasks.map((item) =>
        item.id === formData.id
          ? {
              ...formData,
              progress: Number(formData.progress) || 0,
              updatedAt: today,
            }
          : item
      );
      setTasks(updatedList);
      showToast(`Đã cập nhật công việc "${formData.title}"!`, 'success');

      if (detailTask && detailTask.id === formData.id) {
        setDetailTask({
          ...formData,
          progress: Number(formData.progress) || 0,
          updatedAt: today,
        });
      }
    }
    setFormModalState({ isOpen: false, mode: 'create', data: null });
  };

  const handleConfirmDelete = () => {
    if (!deleteTaskTarget) return;
    setTasks(tasks.filter((t) => t.id !== deleteTaskTarget.id));
    showToast(`Đã xoá công việc "${deleteTaskTarget.title}".`, 'warning');
    setDeleteTaskTarget(null);
    if (detailTask && detailTask.id === deleteTaskTarget.id) {
      setDetailTask(null);
    }
  };

  // Helper render badges & initials
  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">🔥 Khẩn cấp</span>;
      case 'high':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50/70 text-rose-500 border border-rose-100">🔴 Cao</span>;
      case 'medium':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">🟡 Trung bình</span>;
      case 'low':
      default:
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">🟢 Thấp</span>;
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">✓ Hoàn thành</span>;
      case 'review':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200">👁 Kiểm thử</span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">⚡ Đang thực hiện</span>;
      case 'todo':
      default:
        return <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">⏳ Cần làm</span>;
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-white text-sm font-medium animate-slide-in-right ${
          toastMessage.type === 'success' ? 'bg-slate-900 border-l-4 border-emerald-500' :
          toastMessage.type === 'warning' ? 'bg-slate-900 border-l-4 border-rose-500' :
          'bg-slate-900 border-l-4 border-blue-500'
        }`}>
          <span className="text-base">
            {toastMessage.type === 'success' && '✓'}
            {toastMessage.type === 'warning' && '🗑'}
            {toastMessage.type === 'info' && 'ℹ'}
          </span>
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight block leading-tight">
                TaskFlow Pro
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Quản lý công việc & Tiến độ dự án
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
              title="Khôi phục danh sách mẫu ban đầu"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Đặt lại mẫu</span>
            </button>

            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Thêm task mới</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1">
        <WelcomeBanner onOpenCreateModal={handleOpenCreateModal} />

        {/* THỐNG KÊ TỔNG QUAN */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" aria-label="Thống kê công việc">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
              📋
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Tổng công việc</span>
              <span className="text-2xl font-extrabold text-slate-900">{stats.total}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl font-bold">
              ⚡
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Đang thực hiện</span>
              <span className="text-2xl font-extrabold text-slate-900">{stats.inProgress}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">
              🚨
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Cần xử lý gấp</span>
              <span className="text-2xl font-extrabold text-slate-900">{stats.urgentOrHigh}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              ✅
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Đã hoàn thành</span>
              <span className="text-2xl font-extrabold text-slate-900">{stats.completed}</span>
            </div>
          </div>
        </section>

        {/* BỘ LỌC VÀ CÔNG CỤ TÌM KIẾM */}
        <section className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã TSK, người thực hiện..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1">
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Danh mục:</span>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="py-1.5 px-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-blue-600 cursor-pointer">
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Ưu tiên:</span>
              <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className="py-1.5 px-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-blue-600 cursor-pointer">
                <option value="all">Tất cả mức độ</option>
                <option value="urgent">🔥 Khẩn cấp</option>
                <option value="high">🔴 Ưu tiên cao</option>
                <option value="medium">🟡 Trung bình</option>
                <option value="low">🟢 Thấp</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Trạng thái:</span>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="py-1.5 px-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-blue-600 cursor-pointer">
                <option value="all">Tất cả trạng thái</option>
                <option value="todo">⏳ Cần làm</option>
                <option value="in_progress">⚡ Đang thực hiện</option>
                <option value="review">👁 Đang kiểm thử</option>
                <option value="completed">✓ Hoàn thành</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Sắp xếp:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="py-1.5 px-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-blue-600 cursor-pointer">
                <option value="dueDate_asc">Hạn chót gần nhất</option>
                <option value="priority_desc">Độ ưu tiên cao nhất</option>
                <option value="progress_desc">Tiến độ cao nhất</option>
                <option value="newest">Ngày tạo mới nhất</option>
                <option value="name_asc">Tên: A → Z</option>
              </select>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'card' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Card</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <span>Danh sách</span>
              </button>
            </div>
          </div>
        </section>

        {/* KẾT QUẢ TÌM KIẾM */}
        <div className="flex items-center justify-between mb-4 text-xs sm:text-sm text-slate-500 font-medium" id="task-list-section">
          <span>
            Hiển thị <strong className="text-slate-900 font-bold">{filteredTasks.length}</strong> / {tasks.length} công việc
          </span>
          {(searchQuery || selectedCategory !== 'Tất cả' || selectedPriority !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
                setSelectedPriority('all');
                setSelectedStatus('all');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Xoá tất cả bộ lọc
            </button>
          )}
        </div>

        {/* HIỂN THỊ DANH SÁCH (CARD HOẶC TABLE) */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center my-6 space-y-3">
            <div className="text-4xl">📌</div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy công việc nào</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">Thử thay đổi bộ lọc tìm kiếm của bạn.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
                setSelectedPriority('all');
                setSelectedStatus('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Xoá bộ lọc
            </button>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <article key={task.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-blue-300 transition-all duration-200 group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md font-mono">{task.code}</span>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{task.category}</span>
                    </div>
                    {renderPriorityBadge(task.priority)}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">{task.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{task.description}</p>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Tiến độ</span>
                      <span className="text-slate-900">{task.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-200 mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold flex items-center justify-center text-[10px]">{getInitials(task.assignee)}</div>
                      <span className="font-medium text-slate-700">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 font-medium">
                      <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{task.dueDate}</span>
                    </div>
                  </div>

                  <div className="mb-4">{renderStatusBadge(task.status)}</div>
                </div>

                <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100">
                  <button onClick={() => setDetailTask(task)} className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>Chi tiết</span>
                  </button>

                  <button onClick={() => handleOpenEditModal(task)} className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span>Sửa</span>
                  </button>

                  <button onClick={() => setDeleteTaskTarget(task)} className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>Xoá</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-3 px-4">Mã & Công việc</th>
                    <th className="py-3 px-4">Danh mục</th>
                    <th className="py-3 px-4">Ưu tiên</th>
                    <th className="py-3 px-4">Tiến độ</th>
                    <th className="py-3 px-4">Phân công</th>
                    <th className="py-3 px-4">Hạn chót</th>
                    <th className="py-3 px-4">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-mono">{task.code}</span>
                          <span className="font-semibold text-slate-900 leading-snug">{task.title}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">{task.category}</span>
                      </td>
                      <td className="py-3.5 px-4">{renderPriorityBadge(task.priority)}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="w-8 text-slate-700">{task.progress}%</span>
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${task.progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-800">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold flex items-center justify-center text-[10px]">{getInitials(task.assignee)}</div>
                          <span>{task.assignee}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-slate-600">{task.dueDate}</td>
                      <td className="py-3.5 px-4">{renderStatusBadge(task.status)}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setDetailTask(task)} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-slate-200" title="Xem chi tiết">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                          </button>
                          <button onClick={() => handleOpenEditModal(task)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-slate-200" title="Chỉnh sửa">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          </button>
                          <button onClick={() => setDeleteTaskTarget(task)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200" title="Xoá">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      {detailTask && (
        <TaskDetailModal
          task={detailTask}
          onClose={() => setDetailTask(null)}
          onEdit={handleOpenEditModal}
          renderPriorityBadge={renderPriorityBadge}
          renderStatusBadge={renderStatusBadge}
          getInitials={getInitials}
        />
      )}

      {formModalState.isOpen && (
        <TaskFormModal
          mode={formModalState.mode}
          initialData={formModalState.data}
          categories={CATEGORIES.filter((c) => c !== 'Tất cả')}
          onClose={() => setFormModalState({ isOpen: false, mode: 'create', data: null })}
          onSave={handleSaveTask}
        />
      )}

      {deleteTaskTarget && (
        <DeleteConfirmModal
          target={deleteTaskTarget}
          onClose={() => setDeleteTaskTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-medium text-slate-700">© 2026 TaskFlow Pro — Hệ thống Quản Lý Công Việc & Tiến Độ Dự Án</p>
        </div>
      </footer>
    </div>
  );
}
