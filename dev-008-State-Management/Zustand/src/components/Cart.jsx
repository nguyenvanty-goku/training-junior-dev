import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import {
  useAppStore,
  selectCartTotalItems,
  selectCartTotalPrice,
} from '../store/useAppStore';
import { formatCurrency } from '../utils/format';

export const Cart = () => {
  const cart = useAppStore((state) => state.cart);
  const updateQuantity = useAppStore((state) => state.updateQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const clearCart = useAppStore((state) => state.clearCart);

  const totalItems = useAppStore(selectCartTotalItems);
  const totalPrice = useAppStore(selectCartTotalPrice);

  if (cart.length === 0) {
    return (
      <div id="cart-section" className="cart-card empty-cart-wrapper">
        <div className="cart-header">
          <h2 className="section-title">Giỏ hàng của bạn</h2>
        </div>
        <div className="empty-cart-state">
          <div className="empty-cart-icon">
            <ShoppingCart size={42} strokeWidth={1.5} />
          </div>
          <p className="empty-title">Giỏ hàng đang trống</p>
          <p className="empty-sub">Hãy chọn sản phẩm từ danh sách bên trái để thêm vào giỏ.</p>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-section" className="cart-card">
      <div className="cart-header">
        <div>
          <h2 className="section-title">Giỏ hàng ({totalItems})</h2>
          <p className="section-desc">Kiểm tra lại sản phẩm trước khi thanh toán</p>
        </div>

        <button
          type="button"
          className="btn-clear-cart"
          onClick={clearCart}
          title="Xóa tất cả sản phẩm"
        >
          <Trash2 size={15} /> Xóa giỏ
        </button>
      </div>

      <div className="cart-items-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-emoji">{item.image}</div>

            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <span className="cart-item-unit-price">{formatCurrency(item.price)}</span>
            </div>

            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  className="btn-qty"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  className="btn-qty"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="cart-item-total">
                {formatCurrency(item.price * item.quantity)}
              </div>

              <button
                type="button"
                className="btn-remove-item"
                title="Xóa mục này"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Tổng số lượng:</span>
          <strong>{totalItems} món</strong>
        </div>
        <div className="summary-row">
          <span>Phí vận chuyển:</span>
          <span className="free-shipping">Miễn phí</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-row total-highlight">
          <span>Tổng thanh toán:</span>
          <span className="total-amount">{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};
