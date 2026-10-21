import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomer } from '../features/booking/bookingSlice';

export const CustomerForm = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.booking.customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCustomer({ [name]: value }));
  };

  return (
    <div className="card-box">
      <div className="card-header">
        <h2 className="card-title">Thông tin người đại diện đặt phòng</h2>
      </div>


      <div className="customer-form-grid">
        <div className="form-group">
          <label htmlFor="fullName">Họ và tên *</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={customer.fullName}
            onChange={handleChange}
            placeholder="VD: Trần Minh Quân"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại liên hệ *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={customer.phone}
            onChange={handleChange}
            placeholder="VD: 0912345678"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Địa chỉ Email xác nhận</label>
          <input
            id="email"
            name="email"
            type="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="VD: minhquan@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialRequest">Yêu cầu đặc biệt (tuỳ chọn)</label>
          <input
            id="specialRequest"
            name="specialRequest"
            type="text"
            value={customer.specialRequest}
            onChange={handleChange}
            placeholder="VD: Nhận phòng sớm, hoa tươi tuần trăng mật..."
          />
        </div>
      </div>
    </div>
  );
};
