import React from 'react';
import { Plus, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useAppStore } from '../store/useAppStore';
import { formatCurrency } from '../utils/format';

export const ProductList = () => {
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);

  return (
    <section className="product-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Danh sách sản phẩm</h2>
          <p className="section-desc">Sản phẩm công nghệ nổi bật dành cho lập trình viên</p>
        </div>
        <span className="product-count-tag">{PRODUCTS.length} sản phẩm</span>
      </div>


      <div className="product-grid">
        {PRODUCTS.map((product) => {
          const itemInCart = cart.find((item) => item.id === product.id);
          const quantityInCart = itemInCart ? itemInCart.quantity : 0;

          return (
            <div key={product.id} className="product-card">
              <div className="product-visual">
                <span className="product-emoji">{product.image}</span>
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>

                <div className="product-footer">
                  <div className="product-price">{formatCurrency(product.price)}</div>

                  <button
                    type="button"
                    className={`btn-add-cart ${quantityInCart > 0 ? 'in-cart' : ''}`}
                    onClick={() => addToCart(product)}
                  >
                    {quantityInCart > 0 ? (
                      <>
                        <Check size={16} /> Đã có ({quantityInCart}) +
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Thêm vào giỏ
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
