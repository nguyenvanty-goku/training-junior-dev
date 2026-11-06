import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const INITIAL_VALUES = {
  fullName: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  phone: '0901234567',
  department: 'frontend',
  experience: '1-2 năm',
  bio: 'Lập trình viên Frontend làm việc với React và Next.js.',
  acceptTerms: false,
};

export default function RHFRegistrationForm() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: INITIAL_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    setSubmittedData(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmittedData(data);
  };

  return (
    <div className="form-card">
      <div className="form-card__header">
        <h2 className="form-card__title">Form đăng ký ứng viên (React Hook Form)</h2>
        <p className="form-card__desc">
          Sử dụng useForm với defaultValues, register, handleSubmit, báo lỗi required inline và khóa nút khi isSubmitting.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-field">
          <label className="form-label" htmlFor="rhf-fullName">
            Họ và tên <span className="required-mark">*</span>
          </label>
          <input
            id="rhf-fullName"
            type="text"
            placeholder="Nhập họ và tên đầy đủ"
            className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            {...register('fullName', {
              required: 'Vui lòng nhập họ và tên',
              minLength: {
                value: 3,
                message: 'Họ và tên phải có ít nhất 3 ký tự',
              },
            })}
          />
          {errors.fullName && (
            <span className="error-text" role="alert">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="form-grid" style={{ marginBottom: '1.15rem' }}>
          <div className="form-field">
            <label className="form-label" htmlFor="rhf-email">
              Email <span className="required-mark">*</span>
            </label>
            <input
              id="rhf-email"
              type="email"
              placeholder="name@company.com"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email', {
                required: 'Vui lòng nhập địa chỉ email',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Địa chỉ email không đúng định dạng',
                },
              })}
            />
            {errors.email && (
              <span className="error-text" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="rhf-phone">
              Số điện thoại <span className="required-mark">*</span>
            </label>
            <input
              id="rhf-phone"
              type="tel"
              placeholder="0901234567"
              className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
              aria-invalid={errors.phone ? 'true' : 'false'}
              {...register('phone', {
                required: 'Vui lòng nhập số điện thoại',
                pattern: {
                  value: /^0\d{9}$/,
                  message: 'Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0',
                },
              })}
            />
            {errors.phone && (
              <span className="error-text" role="alert">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-grid" style={{ marginBottom: '1.15rem' }}>
          <div className="form-field">
            <label className="form-label" htmlFor="rhf-department">
              Vị trí ứng tuyển <span className="required-mark">*</span>
            </label>
            <select
              id="rhf-department"
              className={`form-select ${errors.department ? 'form-select--error' : ''}`}
              aria-invalid={errors.department ? 'true' : 'false'}
              {...register('department', {
                required: 'Vui lòng chọn vị trí ứng tuyển',
              })}
            >
              <option value="">-- Chọn vị trí --</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Fullstack Developer</option>
              <option value="qa">QA / Tester</option>
            </select>
            {errors.department && (
              <span className="error-text" role="alert">
                {errors.department.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="rhf-experience">
              Số năm kinh nghiệm <span className="required-mark">*</span>
            </label>
            <input
              id="rhf-experience"
              type="text"
              placeholder="Ví dụ: 1-2 năm"
              className={`form-input ${errors.experience ? 'form-input--error' : ''}`}
              aria-invalid={errors.experience ? 'true' : 'false'}
              {...register('experience', {
                required: 'Vui lòng nhập số năm kinh nghiệm',
              })}
            />
            {errors.experience && (
              <span className="error-text" role="alert">
                {errors.experience.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="rhf-bio">
            Giới thiệu bản thân <span className="required-mark">*</span>
          </label>
          <textarea
            id="rhf-bio"
            rows={3}
            placeholder="Tóm tắt kỹ năng và dự án đã tham gia"
            className={`form-textarea ${errors.bio ? 'form-textarea--error' : ''}`}
            aria-invalid={errors.bio ? 'true' : 'false'}
            {...register('bio', {
              required: 'Vui lòng nhập phần giới thiệu bản thân',
            })}
          />
          {errors.bio && (
            <span className="error-text" role="alert">
              {errors.bio.message}
            </span>
          )}
        </div>

        <div className="form-field" style={{ marginBottom: 0 }}>
          <label className="checkbox-row" htmlFor="rhf-acceptTerms">
            <input
              id="rhf-acceptTerms"
              type="checkbox"
              {...register('acceptTerms', {
                required: 'Bạn cần xác nhận đồng ý với điều khoản ứng tuyển',
              })}
            />
            <span>
              Tôi xác nhận các thông tin cung cấp ở trên là chính xác <span className="required-mark">*</span>
            </span>
          </label>
          {errors.acceptTerms && (
            <span className="error-text" role="alert">
              {errors.acceptTerms.message}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn--outline"
            disabled={isSubmitting}
            onClick={() => {
              reset(INITIAL_VALUES);
              setSubmittedData(null);
            }}
          >
            Khôi phục mặc định
          </button>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi hồ sơ...' : 'Gửi hồ sơ đăng ký'}
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="result-box">
          <p className="result-box__title">Gửi hồ sơ thành công</p>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

