import React from 'react';
import { Header } from './components/Header';
import { RoomSelector } from './components/RoomSelector';
import { BookingOptions } from './components/BookingOptions';
import { CustomerForm } from './components/CustomerForm';
import { BookingSummary } from './components/BookingSummary';

export function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <div className="booking-layout-grid">
          <div className="booking-steps-column">
            <RoomSelector />
            <BookingOptions />
            <CustomerForm />
          </div>

          <div className="booking-summary-column">
            <BookingSummary />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 Grand Horizon Resort & Spa. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

