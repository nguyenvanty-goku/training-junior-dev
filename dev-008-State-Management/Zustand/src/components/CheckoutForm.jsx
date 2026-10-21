import React, { useState } from 'react';
import { UserCheck, RotateCcw, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useAppStore, selectCartTotalItems, selectCartTotalPrice } from '../store/useAppStore';
import { formatCurrency } from '../utils/format';

export const CheckoutForm = () => {
  const customer = useAppStore((state) => state.customer);
  const updateCustomer = useAppStore((state) => state.updateCustomer);
  const resetCustomer = useAppStore((state) => state.resetCustomer);
  const clearCart = useAppStore((state) => state.clearCart);

  const totalItems = useAppStore(selectCartTotalItems);
  const totalPrice = useAppStore(selectCartTotalPrice);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCustomer({ [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (totalItems === 0) {
      alert('Vui lòng thêm ít nhất 1 sản phẩm vào giỏ hàng trước khi đặt!');
      return;
    }

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 1800);
  };

  return (
    <div className="checkout-card">
      <div className="checkout-header">
        <div>
          <h2 className="section-title">Thông tin giao hàng</h2>
          <p className="section-desc">Vui lòng kiểm tra kỹ thông tin nhận hàng</p>
        </div>

        <button
          type="button"
          className="btn-reset-customer"
          onClick={resetCustomer}
          title="Khôi phục thông tin mẫu"
        >
          <RotateCcw size={14} /> Khôi phục mẫu
        </button>
      </div>

      {orderPlaced ? (
        <div className="order-success-box">
          <CheckCircle size={44} className="icon-success" />
          <h3>Đặt hàng thành công!</h3>
          <p>
            Cảm ơn <strong>{customer.fullName}</strong>. Đơn hàng tổng trị giá{' '}
            <strong>{formatCurrency(totalPrice)}</strong> sẽ được giao đến địa chỉ:
          </p>
          <p className="success-address">📍 {customer.address}</p>
          <button
            type="button"
            className="btn-new-order"
            onClick={() => setOrderPlaced(false)}
          >
            Tiếp tục mua hàng
          </button>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Họ và tên người nhận</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={customer.fullName}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={customer.phone}
                onChange={handleChange}
                placeholder="0987654321"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ nhận hàng</label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={customer.address}
              onChange={handleChange}
              placeholder="Số nhà, tên đường, quận/huyện, tỉnh/thành"
            />
          </div>

          <div className="form-group">
            <label>Phương thức thanh toán</label>
            <div className="payment-options">
              <label className={`payment-pill ${customer.paymentMethod === 'cod' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={customer.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <Truck size={16} /> Thanh toán khi nhận hàng (COD)
              </label>

              <label className={`payment-pill ${customer.paymentMethod === 'banking' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="banking"
                  checked={customer.paymentMethod === 'banking'}
                  onChange={handleChange}
                />
                <CreditCard size={16} /> Chuyển khoản ngân hàng (QR Code)
              </label>

              <label className={`payment-pill ${customer.paymentMethod === 'momo' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={customer.paymentMethod === 'momo'}
                  onChange={handleChange}
                />
                <span>👛 Ví MoMo</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note">Ghi chú giao hàng</label>
            <input
              id="note"
              name="note"
              type="text"
              value={customer.note}
              onChange={handleChange}
              placeholder="VD: Giao giờ hành chính, gọi trước khi đến..."
            />
          </div>

          <button
            type="submit"
            className="btn-submit-order"
            disabled={totalItems === 0}
          >
            <UserCheck size={18} />
            {totalItems > 0
              ? `Xác nhận đặt hàng (${formatCurrency(totalPrice)})`
              : 'Vui lòng chọn sản phẩm để đặt hàng'}
          </button>
        </form>
      )}
    </div>
  );
};
