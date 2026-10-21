import React from 'react';
import { Package, Radio, RotateCcw } from 'lucide-react';
import { getNetworkStats } from '../api/productsApi';

export const Header = ({ onReset }) => {
  const stats = getNetworkStats();

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">
            <Package size={24} />
          </div>
          <div>
            <h1 className="brand-title">ShopMart Catalog</h1>
            <p className="brand-subtitle">Danh mục sản phẩm phân trang với TanStack Query</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="network-pill" title="Tổng số request HTTP thực tế đã gửi qua mạng">
            <Radio size={14} className="pulse-icon" />
            <span>Network Requests:</span>
            <strong>{stats.totalRequests}</strong>
          </div>

          <button
            type="button"
            className="btn-header-reset"
            onClick={onReset}
            title="Đặt lại bộ đếm request và làm sạch cache"
          >
            <RotateCcw size={14} />
            <span>Reset Cache</span>
          </button>
        </div>
      </div>
    </header>
  );
};
