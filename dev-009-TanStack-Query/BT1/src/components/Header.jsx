import React from 'react';
import { Users2, Radio } from 'lucide-react';
import { getNetworkCallCount } from '../api/usersApi';

export const Header = () => {
  const count = getNetworkCallCount();

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">
            <Users2 size={24} />
          </div>
          <div>
            <h1 className="brand-title">Danh Bạ Người Dùng</h1>
            <p className="brand-subtitle">TanStack Query vs Fetch thủ công</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="network-pill" title="Tổng số request HTTP thực tế đã gửi qua mạng">
            <Radio size={14} className="pulse-icon" />
            <span>Network Requests:</span>
            <strong>{count}</strong>
          </div>
        </div>
      </div>
    </header>
  );
};
