import React, { useState } from 'react';

const INITIAL_VALUES = {
  fullName: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  phone: '0901234567',
  department: 'frontend',
  experience: '1-2 năm',
  bio: 'Lập trình viên Frontend làm việc với React và Next.js.',
  acceptTerms: false,
};

export default function ControlledForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Vui lòng nhập họ và tên';
    } else if (values.fullName.trim().length < 3) {
      nextErrors.fullName = 'Họ và tên phải có ít nhất 3 ký tự';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Vui lòng nhập địa chỉ email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Địa chỉ email không đúng định dạng';
    }

    if (!values.phone.trim()) {
      nextErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^0\d{9}$/.test(values.phone)) {
      nextErrors.phone = 'Số điện thoại gồm 10 chữ số và bắt đầu bằng số 0';
    }

    if (!values.department) {
      nextErrors.department = 'Vui lòng chọn vị trí ứng tuyển';
    }

    if (!values.experience.trim()) {
      nextErrors.experience = 'Vui lòng nhập số năm kinh nghiệm';
    }

    if (!values.bio.trim()) {
      nextErrors.bio = 'Vui lòng nhập phần giới thiệu bản thân';
    }

    if (!values.acceptTerms) {
      nextErrors.acceptTerms = 'Bạn cần xác nhận đồng ý với điều khoản ứng tuyển';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmittedData(null);

    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmittedData(values);
  };

  return (
    <div className="form-card">
      <div className="form-card__header">
        <h2 className="form-card__title">Form Controlled thủ công (Trước khi chuyển đổi)</h2>
        <p className="form-card__desc">
          Quản lý state bằng useState nên toàn bộ form re-render mỗi khi gõ từng ký tự.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="form-label" htmlFor="ctrl-fullName">
            Họ và tên <span className="required-mark">*</span>
          </label>
          <input
            id="ctrl-fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên đầy đủ"
            className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-grid" style={{ marginBottom: '1.15rem' }}>
          <div className="form-field">
            <label className="form-label" htmlFor="ctrl-email">
              Email <span className="required-mark">*</span>
            </label>
            <input
              id="ctrl-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className={`form-input ${errors.email ? 'form-input--error' : ''}`}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="ctrl-phone">
              Số điện thoại <span className="required-mark">*</span>
            </label>
            <input
              id="ctrl-phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              placeholder="0901234567"
              className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-grid" style={{ marginBottom: '1.15rem' }}>
          <div className="form-field">
            <label className="form-label" htmlFor="ctrl-department">
              Vị trí ứng tuyển <span className="required-mark">*</span>
            </label>
            <select
              id="ctrl-department"
              name="department"
              value={values.department}
              onChange={handleChange}
              className={`form-select ${errors.department ? 'form-select--error' : ''}`}
            >
              <option value="">-- Chọn vị trí --</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Fullstack Developer</option>
              <option value="qa">QA / Tester</option>
            </select>
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="ctrl-experience">
              Số năm kinh nghiệm <span className="required-mark">*</span>
            </label>
            <input
              id="ctrl-experience"
              name="experience"
              type="text"
              value={values.experience}
              onChange={handleChange}
              placeholder="Ví dụ: 1-2 năm"
              className={`form-input ${errors.experience ? 'form-input--error' : ''}`}
            />
            {errors.experience && <span className="error-text">{errors.experience}</span>}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="ctrl-bio">
            Giới thiệu bản thân <span className="required-mark">*</span>
          </label>
          <textarea
            id="ctrl-bio"
            name="bio"
            rows={3}
            value={values.bio}
            onChange={handleChange}
            placeholder="Tóm tắt kỹ năng và dự án đã tham gia"
            className={`form-textarea ${errors.bio ? 'form-textarea--error' : ''}`}
          />
          {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>

        <div className="form-field" style={{ marginBottom: 0 }}>
          <label className="checkbox-row" htmlFor="ctrl-acceptTerms">
            <input
              id="ctrl-acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={values.acceptTerms}
              onChange={handleChange}
            />
            <span>
              Tôi xác nhận các thông tin cung cấp ở trên là chính xác <span className="required-mark">*</span>
            </span>
          </label>
          {errors.acceptTerms && <span className="error-text">{errors.acceptTerms}</span>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn--outline"
            disabled={isSubmitting}
            onClick={() => {
              setValues(INITIAL_VALUES);
              setErrors({});
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

