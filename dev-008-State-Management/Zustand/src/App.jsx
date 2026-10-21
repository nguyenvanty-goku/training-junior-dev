import React from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';

export function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <div className="content-columns">
          <div className="column-left">
            <ProductList />
          </div>

          <div className="column-right">
            <Cart />
            <CheckoutForm />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 DevTech Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

