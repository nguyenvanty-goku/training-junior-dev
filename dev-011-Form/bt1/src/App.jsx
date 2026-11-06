import React, { useState } from 'react';
import RHFRegistrationForm from './components/RHFRegistrationForm.jsx';
import ControlledForm from './components/ControlledForm.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('rhf');

  return (
    <main className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Chuyển đổi Form Controlled sang React Hook Form</h1>
        <p className="page-subtitle">
          So sánh giữa Form Controlled thủ công (useState) và Form sử dụng React Hook Form.
        </p>
      </header>

      <div className="mode-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'rhf'}
          className={`mode-tab ${activeTab === 'rhf' ? 'mode-tab--active' : ''}`}
          onClick={() => setActiveTab('rhf')}
        >
          React Hook Form (Đã chuyển đổi)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'controlled'}
          className={`mode-tab ${activeTab === 'controlled' ? 'mode-tab--active' : ''}`}
          onClick={() => setActiveTab('controlled')}
        >
          Controlled Form (Thủ công)
        </button>
      </div>

      {activeTab === 'rhf' ? <RHFRegistrationForm /> : <ControlledForm />}
    </main>
  );
}

