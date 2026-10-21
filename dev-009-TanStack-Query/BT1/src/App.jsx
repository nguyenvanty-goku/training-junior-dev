import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Eye, EyeOff, RotateCcw, Zap, RefreshCw } from 'lucide-react';
import { Header } from './components/Header';
import { QueryUserList } from './components/QueryUserList';
import { ManualUserList } from './components/ManualUserList';
import { resetNetworkCallCount, getNetworkCallCount } from './api/usersApi';

export function App() {
  const [mode, setMode] = useState('query'); // 'query' | 'manual'
  const [isVisible, setIsVisible] = useState(true);
  const [, setTick] = useState(0);

  const queryClient = useQueryClient();

  const handleToggleVisible = () => {
    setIsVisible((prev) => !prev);
    setTimeout(() => setTick((t) => t + 1), 300);
  };

  const handleReset = () => {
    resetNetworkCallCount();
    queryClient.clear();
    setTick((t) => t + 1);
  };

  const handleRefetchQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    setTimeout(() => setTick((t) => t + 1), 400);
  };

  const networkCount = getNetworkCallCount();

  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <div className="control-bar">
          <div className="mode-toggle">
            <button
              type="button"
              className={`mode-btn ${mode === 'query' ? 'active' : ''}`}
              onClick={() => {
                setMode('query');
                setIsVisible(true);
              }}
            >
              <Zap size={16} />
              <span>TanStack Query (useQuery)</span>
            </button>

            <button
              type="button"
              className={`mode-btn ${mode === 'manual' ? 'active' : ''}`}
              onClick={() => {
                setMode('manual');
                setIsVisible(true);
              }}
            >
              <span>Fetch thủ công (useEffect)</span>
            </button>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="btn-action"
              onClick={handleToggleVisible}
              title="Ẩn/hiện để kiểm tra unmount và remount component"
            >
              {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{isVisible ? 'Ẩn component' : 'Hiện component'}</span>
            </button>

            {mode === 'query' && (
              <button
                type="button"
                className="btn-action"
                onClick={handleRefetchQuery}
                title="Yêu cầu làm mới dữ liệu"
              >
                <RefreshCw size={15} />
                <span>Làm mới cache</span>
              </button>
            )}

            <button
              type="button"
              className="btn-action btn-danger"
              onClick={handleReset}
              title="Đặt lại bộ đếm request và xóa cache"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="info-strip">
          <div className="info-stat">
            <span className="stat-label">Phương thức:</span>
            <strong className="stat-value">
              {mode === 'query' ? 'useQuery + staleTime 5m' : 'useEffect + useState'}
            </strong>
          </div>

          <div className="info-stat">
            <span className="stat-label">Số request HTTP thực tế:</span>
            <strong className="stat-value highlight-count">{networkCount}</strong>
          </div>

          <div className="info-stat">
            <span className="stat-label">Trạng thái unmount/remount:</span>
            <strong className="stat-value">
              {mode === 'query'
                ? 'Lấy ngay từ cache, không tạo request trùng'
                : 'Luôn gọi lại API mỗi lần mount'}
            </strong>
          </div>
        </div>

        <div className="content-container">
          {isVisible ? (
            mode === 'query' ? (
              <QueryUserList />
            ) : (
              <ManualUserList />
            )
          ) : (
            <div className="unmounted-box">
              <EyeOff size={36} />
              <p>Component đã bị unmount khỏi DOM.</p>
              <button
                type="button"
                className="btn-remount"
                onClick={handleToggleVisible}
              >
                Mount lại component
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 User Directory. TanStack Query caching demo.</p>
      </footer>
    </div>
  );
}

export default App;
