import React from 'react';
import { ShoppingBag, User, Store } from 'lucide-react';
import { useAppStore, selectCartTotalItems } from '../store/useAppStore';

export const Header = () => {
  const totalItems = useAppStore(selectCartTotalItems);
  const customerName = useAppStore((state) => state.customer.fullName);

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">
            <Store size={24} />
          </div>
          <div>
            <h1 className="brand-title">DevTech Store</h1>
            <p className="brand-subtitle">Phụ kiện & thiết bị công nghệ chính hãng</p>
          </div>
        </div>


        <div className="header-actions">
          <div className="user-badge" title="Khách hàng hiện tại">
            <User size={16} />
            <span>{customerName || 'Khách vãng lai'}</span>
          </div>

          <a href="#cart-section" className="cart-badge-button">
            <ShoppingBag size={20} />
            <span>Giỏ hàng</span>
            {totalItems > 0 && <span className="badge-count">{totalItems}</span>}
          </a>
        </div>
      </div>
    </header>
  );
};
