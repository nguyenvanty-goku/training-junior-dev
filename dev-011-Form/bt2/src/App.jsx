import React from 'react';
import MultiStepBookingForm from './components/MultiStepBookingForm.jsx';

export default function App() {
  return (
    <main className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Đặt phòng khách sạn nhiều bước (React Hook Form + Zod)</h1>
        <p className="page-subtitle">
          Kiểm tra dữ liệu với Zod Schema, báo lỗi tiếng Việt ở chế độ onBlur, giữ nguyên dữ liệu khi quay lại và gửi ở bước cuối.
        </p>
      </header>

      <MultiStepBookingForm />
    </main>
  );
}

