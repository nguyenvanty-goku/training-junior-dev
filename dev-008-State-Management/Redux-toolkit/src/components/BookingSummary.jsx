import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle2, Loader2, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import {
  selectBooking,
  selectBookingTotal,
  submitBooking,
  resetBooking,
} from '../features/booking/bookingSlice';
import { EXTRA_SERVICES } from '../data/hotelData';
import { formatCurrency } from '../utils/format';

export const BookingSummary = () => {
  const dispatch = useDispatch();
  const { selectedRoom, nights, guests, selectedServices, promo, customer, status, bookingId, error } =
    useSelector(selectBooking);

  const { subtotal, discountAmount, finalTotal } = useSelector(selectBookingTotal);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitBooking());
  };

  if (status === 'succeeded') {
    return (
      <div className="summary-card success-card">
        <div className="success-icon-wrapper">
          <CheckCircle2 size={48} className="icon-success" />
        </div>
        <h3 className="success-heading">Đặt phòng thành công!</h3>
        <p className="success-sub">
          Mã xác nhận phòng: <strong className="booking-code">{bookingId}</strong>
        </p>

        <div className="success-details-box">
          <div className="detail-item">
            <span>Hạng phòng:</span>
            <strong>{selectedRoom.name}</strong>
          </div>
          <div className="detail-item">
            <span>Thời gian:</span>
            <span>{nights} đêm ({guests.adults} người lớn, {guests.children} trẻ em)</span>
          </div>
          <div className="detail-item">
            <span>Người nhận phòng:</span>
            <strong>{customer.fullName} ({customer.phone})</strong>
          </div>
          <div className="detail-divider"></div>
          <div className="detail-item total-item">
            <span>Tổng thanh toán:</span>
            <span className="total-highlight">{formatCurrency(finalTotal)}</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-create-new"
          onClick={() => dispatch(resetBooking())}
        >
          Đặt phòng mới
        </button>
      </div>
    );
  }

  return (
    <div className="summary-card">
      <div className="summary-header">
        <h3 className="summary-title">Tóm tắt đơn đặt phòng</h3>
      </div>


      <div className="summary-room-preview">
        <span className="summary-emoji">{selectedRoom.image}</span>
        <div>
          <h4 className="preview-room-name">{selectedRoom.name}</h4>
          <span className="preview-room-price">
            {formatCurrency(selectedRoom.pricePerNight)} x {nights} đêm
          </span>
        </div>
      </div>

      <div className="breakdown-list">
        <div className="breakdown-item">
          <span>Tiền phòng ({nights} đêm):</span>
          <span>{formatCurrency(selectedRoom.pricePerNight * nights)}</span>
        </div>

        {selectedServices.length > 0 && (
          <div className="breakdown-services">
            <span className="services-title">Dịch vụ bổ sung ({selectedServices.length}):</span>
            {selectedServices.map((id) => {
              const srv = EXTRA_SERVICES.find((s) => s.id === id);
              return (
                <div key={id} className="service-mini-row">
                  <span>• {srv?.name}</span>
                  <span>+{formatCurrency(350000)}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="breakdown-item">
          <span>Tạm tính:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {promo.isApplied && (
          <div className="breakdown-item discount-row">
            <span>Khuyến mãi ({promo.code} - {promo.discountPercent}%):</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="breakdown-divider"></div>

        <div className="breakdown-item total-row">
          <span>Tổng thanh toán dự kiến:</span>
          <span className="final-price">{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      {status === 'failed' && (
        <div className="error-alert">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        className="btn-submit-booking"
        onClick={handleSubmit}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="spinner" />
            Đang xử lý đặt phòng...
          </>
        ) : (
          `Xác nhận & Hoàn tất đặt phòng`
        )}
      </button>

      <div className="booking-guarantee">
        <ShieldCheck size={16} />
        <span>Cam kết bảo mật thông tin & Miễn phí hủy trước 48h</span>
      </div>
    </div>
  );
};
