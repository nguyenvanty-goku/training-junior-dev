import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Minus, Tag, Check, X, Sparkles } from 'lucide-react';
import { EXTRA_SERVICES } from '../data/hotelData';
import {
  setNights,
  updateGuests,
  toggleService,
  applyPromoCode,
  removePromoCode,
} from '../features/booking/bookingSlice';
import { formatCurrency } from '../utils/format';

export const BookingOptions = () => {
  const dispatch = useDispatch();
  const { nights, guests, selectedServices, promo } = useSelector((state) => state.booking);
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      dispatch(applyPromoCode(promoInput));
    }
  };

  return (
    <div className="card-box">
      <div className="card-header">
        <h2 className="card-title">Tùy chọn thời gian & dịch vụ đi kèm</h2>
      </div>

      <div className="options-grid">
        <div className="option-field">
          <label className="option-label">Số đêm lưu trú</label>

          <div className="qty-control">
            <button
              type="button"
              className="btn-qty"
              onClick={() => dispatch(setNights(nights - 1))}
              disabled={nights <= 1}
            >
              <Minus size={15} />
            </button>
            <span className="qty-number">{nights} đêm</span>
            <button
              type="button"
              className="btn-qty"
              onClick={() => dispatch(setNights(nights + 1))}
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        <div className="option-field">
          <label className="option-label">Số lượng khách</label>
          <div className="guest-controls">
            <div className="guest-item">
              <span>Người lớn:</span>
              <div className="mini-qty">
                <button
                  type="button"
                  onClick={() => dispatch(updateGuests({ adults: Math.max(1, guests.adults - 1) }))}
                  disabled={guests.adults <= 1}
                >
                  -
                </button>
                <span>{guests.adults}</span>
                <button
                  type="button"
                  onClick={() => dispatch(updateGuests({ adults: guests.adults + 1 }))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="guest-item">
              <span>Trẻ em:</span>
              <div className="mini-qty">
                <button
                  type="button"
                  onClick={() => dispatch(updateGuests({ children: Math.max(0, guests.children - 1) }))}
                  disabled={guests.children <= 0}
                >
                  -
                </button>
                <span>{guests.children}</span>
                <button
                  type="button"
                  onClick={() => dispatch(updateGuests({ children: guests.children + 1 }))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <label className="option-label">Dịch vụ bổ sung trải nghiệm</label>
        <div className="services-list">
          {EXTRA_SERVICES.map((srv) => {
            const isChecked = selectedServices.includes(srv.id);
            return (
              <div
                key={srv.id}
                className={`service-item ${isChecked ? 'service-checked' : ''}`}
                onClick={() => dispatch(toggleService(srv.id))}
              >
                <div className="service-info">
                  <span className="service-icon">{srv.icon}</span>
                  <div>
                    <h4 className="service-name">{srv.name}</h4>
                    <span className="service-price">
                      +{formatCurrency(srv.price)} ({srv.per})
                    </span>
                  </div>
                </div>

                <div className={`checkbox-custom ${isChecked ? 'checked' : ''}`}>
                  {isChecked && <Check size={14} color="#fff" strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="promo-section">
        <label className="option-label">
          <Tag size={15} /> Mã ưu đãi (GIAMGIA10 hoặc RESORT20)
        </label>
        
        {promo.isApplied ? (
          <div className="promo-applied-badge">
            <Sparkles size={16} />
            <span>Đã áp dụng mã <strong>{promo.code}</strong> (Giảm {promo.discountPercent}%)</span>
            <button
              type="button"
              className="btn-remove-promo"
              onClick={() => dispatch(removePromoCode())}
              title="Hủy mã ưu đãi"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="promo-form">
            <input
              type="text"
              placeholder="Nhập mã ví dụ: GIAMGIA10"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="promo-input"
            />
            <button type="submit" className="btn-apply-promo">
              Áp dụng
            </button>
          </form>
        )}

        {promo.errorMessage && (
          <p className="promo-error">{promo.errorMessage}</p>
        )}
      </div>
    </div>
  );
};
