import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  bookingSchema,
  ROOM_OPTIONS,
  STEP_FIELDS,
  EDGE_CASES,
} from '../schema/bookingSchema.js';

const DEFAULT_VALUES = {
  fullName: 'Trần Minh Quân',
  email: 'quan.tran@example.com',
  phone: '0912345678',
  password: 'Password123',
  confirmPassword: 'Password123',
  roomType: 'deluxe',
  guests: 2,
  checkInDate: '2026-12-10',
  checkOutDate: '2026-12-12',
  specialRequests: 'Phòng tầng cao, yên tĩnh.',
  paymentMethod: 'bank_transfer',
  acceptTerms: false,
};

const STEPS = [
  { id: 1, label: 'Bước 1: Tài khoản & Liên hệ' },
  { id: 2, label: 'Bước 2: Chi tiết đặt phòng' },
  { id: 3, label: 'Bước 3: Xác nhận & Thanh toán' },
];

export default function MultiStepBookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedResult, setSubmittedResult] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
    defaultValues: DEFAULT_VALUES,
  });

  const watchedValues = watch();

  const handleNextStep = async () => {
    const fields = STEP_FIELDS[currentStep];
    const isStepValid = await trigger(fields);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(3, prev + 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = async (data) => {
    setSubmittedResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const { confirmPassword, ...cleanPayload } = data;
    setSubmittedResult(cleanPayload);
  };

  const applyEdgeCase = async (edgeCase) => {
    setSubmittedResult(null);
    setCurrentStep(edgeCase.step);

    Object.entries(edgeCase.patch).forEach(([key, value]) => {
      setValue(key, value, { shouldDirty: true, shouldTouch: true });
    });

    await trigger(edgeCase.fieldsToTrigger);
  };

  const selectedRoom = ROOM_OPTIONS.find(
    (room) => room.value === watchedValues.roomType
  );

  return (
    <div className="booking-layout">
      <div className="form-card">
        <div className="stepper" aria-label="Tiến trình đặt phòng">
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div
                key={step.id}
                className={`stepper__item ${
                  isActive
                    ? 'stepper__item--active'
                    : isCompleted
                    ? 'stepper__item--completed'
                    : ''
                }`}
              >
                <span className="stepper__number">{step.id}</span>
                <span className="stepper__label">{step.label}</span>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {currentStep === 1 && (
            <section aria-label="Bước 1: Thông tin tài khoản và liên hệ">
              <div className="section-heading">
                <h2>Thông tin tài khoản &amp; Liên hệ</h2>
                <p>Chế độ kiểm tra lỗi: onBlur (kiểm tra ngay khi rời khỏi ô nhập liệu).</p>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="fullName">
                  Họ và tên <span className="required-mark">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nhập họ và tên"
                  className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <span className="error-text" role="alert">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label" htmlFor="email">
                    Email <span className="required-mark">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ten@domain.com"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span className="error-text" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="phone">
                    Số điện thoại <span className="required-mark">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="0912345678"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    {...register('phone')}
                  />
                  {errors.phone && (
                    <span className="error-text" role="alert">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu <span className="required-mark">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Tối thiểu 8 ký tự, gồm chữ hoa và số"
                    className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                    {...register('password')}
                  />
                  {errors.password && (
                    <span className="error-text" role="alert">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="confirmPassword">
                    Xác nhận mật khẩu <span className="required-mark">*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className={`form-input ${
                      errors.confirmPassword ? 'form-input--error' : ''
                    }`}
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <span className="error-text" role="alert">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section aria-label="Bước 2: Chi tiết đặt phòng">
              <div className="section-heading">
                <h2>Chi tiết đặt phòng</h2>
                <p>Chọn hạng phòng, số lượng khách và thời gian lưu trú.</p>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label" htmlFor="roomType">
                    Hạng phòng <span className="required-mark">*</span>
                  </label>
                  <select
                    id="roomType"
                    className={`form-select ${errors.roomType ? 'form-select--error' : ''}`}
                    {...register('roomType')}
                  >
                    <option value="">-- Chọn hạng phòng --</option>
                    {ROOM_OPTIONS.map((room) => (
                      <option key={room.value} value={room.value}>
                        {room.label}
                      </option>
                    ))}
                  </select>
                  {errors.roomType && (
                    <span className="error-text" role="alert">
                      {errors.roomType.message}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="guests">
                    Số lượng khách (1 - 6 người) <span className="required-mark">*</span>
                  </label>
                  <input
                    id="guests"
                    type="number"
                    min={1}
                    max={6}
                    className={`form-input ${errors.guests ? 'form-input--error' : ''}`}
                    {...register('guests')}
                  />
                  {errors.guests && (
                    <span className="error-text" role="alert">
                      {errors.guests.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label" htmlFor="checkInDate">
                    Ngày nhận phòng <span className="required-mark">*</span>
                  </label>
                  <input
                    id="checkInDate"
                    type="date"
                    className={`form-input ${
                      errors.checkInDate ? 'form-input--error' : ''
                    }`}
                    {...register('checkInDate')}
                  />
                  {errors.checkInDate && (
                    <span className="error-text" role="alert">
                      {errors.checkInDate.message}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="checkOutDate">
                    Ngày trả phòng <span className="required-mark">*</span>
                  </label>
                  <input
                    id="checkOutDate"
                    type="date"
                    className={`form-input ${
                      errors.checkOutDate ? 'form-input--error' : ''
                    }`}
                    {...register('checkOutDate')}
                  />
                  {errors.checkOutDate && (
                    <span className="error-text" role="alert">
                      {errors.checkOutDate.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="specialRequests">
                  Yêu cầu đặc biệt (tối đa 200 ký tự)
                </label>
                <textarea
                  id="specialRequests"
                  rows={3}
                  placeholder="Ghi chú thêm về giờ nhận phòng hoặc tiện ích đi kèm..."
                  className={`form-textarea ${
                    errors.specialRequests ? 'form-textarea--error' : ''
                  }`}
                  {...register('specialRequests')}
                />
                <div className="field-meta">
                  <span>
                    {errors.specialRequests ? (
                      <span className="error-text" role="alert">
                        {errors.specialRequests.message}
                      </span>
                    ) : null}
                  </span>
                  <span className="char-count">
                    {(watchedValues.specialRequests || '').length}/200 ký tự
                  </span>
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section aria-label="Bước 3: Xác nhận thông tin và thanh toán">
              <div className="section-heading">
                <h2>Kiểm tra thông tin &amp; Xác nhận đặt phòng</h2>
                <p>Bạn có thể bấm Quay lại để chỉnh sửa mà không bị mất dữ liệu đã nhập.</p>
              </div>

              <div className="summary-card">
                <div className="summary-row">
                  <span className="summary-label">Khách hàng:</span>
                  <strong>{watchedValues.fullName}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Liên hệ:</span>
                  <span>
                    {watchedValues.email} — {watchedValues.phone}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Hạng phòng:</span>
                  <strong>{selectedRoom ? selectedRoom.label : watchedValues.roomType}</strong>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Số khách:</span>
                  <span>{watchedValues.guests} người</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Thời gian lưu trú:</span>
                  <span>
                    Nhận phòng {watchedValues.checkInDate} — Trả phòng{' '}
                    {watchedValues.checkOutDate}
                  </span>
                </div>
                {watchedValues.specialRequests && (
                  <div className="summary-row">
                    <span className="summary-label">Yêu cầu đặc biệt:</span>
                    <span>{watchedValues.specialRequests}</span>
                  </div>
                )}
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="paymentMethod">
                  Phương thức thanh toán <span className="required-mark">*</span>
                </label>
                <select
                  id="paymentMethod"
                  className={`form-select ${
                    errors.paymentMethod ? 'form-select--error' : ''
                  }`}
                  {...register('paymentMethod')}
                >
                  <option value="">-- Chọn phương thức thanh toán --</option>
                  <option value="bank_transfer">Chuyển khoản ngân hàng (QR / 247)</option>
                  <option value="credit_card">Thẻ quốc tế (Visa / MasterCard)</option>
                  <option value="pay_at_hotel">Thanh toán trực tiếp khi nhận phòng</option>
                </select>
                {errors.paymentMethod && (
                  <span className="error-text" role="alert">
                    {errors.paymentMethod.message}
                  </span>
                )}
              </div>

              <div className="form-field" style={{ marginBottom: 0 }}>
                <label className="checkbox-row" htmlFor="acceptTerms">
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    {...register('acceptTerms')}
                  />
                  <span>
                    Tôi đồng ý với quy định nhận/trả phòng và chính sách hoàn hủy{' '}
                    <span className="required-mark">*</span>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="error-text" role="alert">
                    {errors.acceptTerms.message}
                  </span>
                )}
              </div>
            </section>
          )}

          <div className="form-actions">
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn btn--outline"
                disabled={isSubmitting}
                onClick={handlePrevStep}
              >
                Quay lại bước {currentStep - 1}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--outline"
                disabled={isSubmitting}
                onClick={() => {
                  reset(DEFAULT_VALUES);
                  setSubmittedResult(null);
                  setCurrentStep(1);
                }}
              >
                Khôi phục mặc định
              </button>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleNextStep}
              >
                Tiếp theo (Bước {currentStep + 1})
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang xử lý đặt phòng...' : 'Hoàn tất đặt phòng'}
              </button>
            )}
          </div>
        </form>

        {submittedResult && (
          <div className="result-box">
            <p className="result-box__title">Đặt phòng thành công</p>
            <pre>{JSON.stringify(submittedResult, null, 2)}</pre>
          </div>
        )}
      </div>

      <aside className="edge-panel" aria-label="Danh sách 6 Edge Cases kiểm thử">
        <div className="edge-panel__header">
          <h2>Danh sách 6 Edge Cases kiểm thử</h2>
          <p>
            Nhấn vào từng trường hợp bên dưới để tự động điền dữ liệu lỗi và kiểm tra phản hồi của Zod.
          </p>
        </div>

        <div className="edge-list">
          {EDGE_CASES.map((item) => (
            <div key={item.id} className="edge-item">
              <div className="edge-item__top">
                <span className="edge-item__step">Bước {item.step}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
              <button
                type="button"
                className="btn btn--outline btn--small"
                onClick={() => applyEdgeCase(item)}
              >
                Thử trường hợp này
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

