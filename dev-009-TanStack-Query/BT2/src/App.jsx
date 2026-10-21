import React, { useState } from 'react';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { Loader2, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { fetchProducts, resetNetworkStats, getNetworkStats } from './api/productsApi';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Pagination } from './components/Pagination';

const LIMIT = 8;

export function App() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    isPlaceholderData,
    isFetching,
  } = useQuery({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page, LIMIT),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const handleResetCache = () => {
    resetNetworkStats();
    queryClient.clear();
    setPage(1);
  };

  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / LIMIT) || 1;
  const products = data?.products || [];
  const networkStats = getNetworkStats();

  return (
    <div className="app-layout">
      <Header onReset={handleResetCache} />

      <main className="main-content">
        <div className="status-strip">
          <div className="status-group">
            <span className="status-label">Trang hiện tại:</span>
            <span className="status-tag">Trang {page}</span>
          </div>

          <div className="status-group">
            <span className="status-label">Các trang đã nạp vào Cache:</span>
            <div className="cached-pages-pills">
              {networkStats.pagesFetched.length > 0 ? (
                networkStats.pagesFetched.map((p) => (
                  <span
                    key={p}
                    className={`cached-pill ${p === page ? 'current' : ''}`}
                    onClick={() => setPage(p)}
                    title={`Bấm để chuyển nhanh về trang ${p} (tức thì từ cache)`}
                  >
                    #{p}
                  </span>
                ))
              ) : (
                <span className="empty-hint">Chưa có trang nào</span>
              )}
            </div>
          </div>

          <div className="status-group">
            {isFetching ? (
              <span className="state-badge state-fetching">
                <Loader2 size={13} className="spinner" /> Đang tải ngầm dữ liệu...
              </span>
            ) : (
              <span className="state-badge state-ready">
                <CheckCircle2 size={13} /> Sẵn sàng từ Cache
              </span>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="loading-box">
            <Loader2 size={32} className="spinner" />
            <p>Đang tải danh mục sản phẩm...</p>
          </div>
        ) : isError ? (
          <div className="error-box">
            <AlertCircle size={32} />
            <p>{error?.message || 'Không thể tải danh sách sản phẩm'}</p>
            <button
              type="button"
              className="btn-retry"
              onClick={() => queryClient.invalidateQueries({ queryKey: ['products', page] })}
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div className={`products-container ${isPlaceholderData ? 'placeholder-loading' : ''}`}>
            {isPlaceholderData && (
              <div className="transition-overlay-badge">
                <Sparkles size={14} />
                <span>Giữ dữ liệu trang cũ khi chuyển trang...</span>
              </div>
            )}

            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
              isPlaceholderData={isPlaceholderData}
              totalItems={totalProducts}
            />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 ShopMart Catalog. Paginated query demo with keepPreviousData.</p>
      </footer>
    </div>
  );
}

export default App;
