import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Users } from 'lucide-react';
import { AVAILABLE_ROOMS } from '../data/hotelData';
import { selectRoom } from '../features/booking/bookingSlice';
import { formatCurrency } from '../utils/format';

export const RoomSelector = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state) => state.booking.selectedRoom);

  return (
    <div className="card-box">
      <div className="card-header">
        <h2 className="card-title">Chọn hạng phòng lưu trú</h2>
      </div>


      <div className="rooms-grid">
        {AVAILABLE_ROOMS.map((room) => {
          const isSelected = selectedRoom?.id === room.id;
          return (
            <div
              key={room.id}
              className={`room-card ${isSelected ? 'active-room' : ''}`}
              onClick={() => dispatch(selectRoom(room))}
            >
              <div className="room-icon-wrapper">
                <span className="room-emoji">{room.image}</span>
                {room.badge && <span className="room-badge">{room.badge}</span>}
              </div>

              <div className="room-content">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-desc">{room.description}</p>
                <div className="room-capacity">
                  <Users size={14} /> {room.capacity}
                </div>
              </div>

              <div className="room-footer">
                <div className="room-price-box">
                  <span className="price-val">{formatCurrency(room.pricePerNight)}</span>
                  <span className="price-unit"> / đêm</span>
                </div>

                <button
                  type="button"
                  className={`btn-select-room ${isSelected ? 'btn-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(selectRoom(room));
                  }}
                >
                  {isSelected ? (
                    <>
                      <Check size={16} /> Đang chọn
                    </>
                  ) : (
                    'Chọn phòng'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
