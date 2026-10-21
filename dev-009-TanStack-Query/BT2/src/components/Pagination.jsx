import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isPlaceholderData,
  totalItems,
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-wrap">
      <div className="pagination-info">
        Hiển thị trang <strong>{currentPage}</strong> / <strong>{totalPages}</strong> ({totalItems} sản phẩm)
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="btn-page"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Trang trước"
        >
          <ChevronLeft size={16} />
          <span>Trước</span>
        </button>

        {visiblePages[0] > 1 && (
          <>
            <button
              type="button"
              className="btn-page"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {visiblePages[0] > 2 && <span className="page-ellipsis">...</span>}
          </>
        )}

        {visiblePages.map((p) => (
          <button
            key={p}
            type="button"
            className={`btn-page ${p === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="page-ellipsis">...</span>
            )}
            <button
              type="button"
              className="btn-page"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          className="btn-page"
          disabled={currentPage >= totalPages || isPlaceholderData}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Trang sau"
        >
          <span>Sau</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
