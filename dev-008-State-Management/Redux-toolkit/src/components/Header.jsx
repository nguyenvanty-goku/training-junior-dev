import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Hotel, RotateCcw } from 'lucide-react';
import { selectBooking, resetBooking } from '../features/booking/bookingSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const { selectedRoom, nights } = useSelector(selectBooking);

  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">
            <Hotel size={24} />
          </div>
          <div>
            <h1 className="brand-title">Grand Horizon Resort & Spa</h1>
            <p className="brand-subtitle">Khu nghỉ dưỡng & Spa cao cấp</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="room-indicator">
            <span className="room-indicator-badge">{selectedRoom.name}</span>
            <span className="room-indicator-nights">({nights} đêm)</span>
          </div>

          <button
            type="button"
            className="btn-reset"
            onClick={() => dispatch(resetBooking())}
            title="Đặt lại thông tin"
          >
            <RotateCcw size={15} />
            <span>Làm mới</span>
          </button>
        </div>

      </div>
    </header>
  );
};
