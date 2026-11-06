// Chiến lược render: SSR (Server-Side Rendering - force-dynamic) kết hợp Streaming qua loading.tsx
// Lý do: Danh sách sản phẩm cần phản ánh chính xác số lượng tồn kho và giá bán theo thời gian thực ở mỗi request.

import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsWithDelay, formatCurrencyVND } from '@/data/products';
import ProductActionLeaf from '@/components/ProductActionLeaf';

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Danh sách các sản phẩm công nghệ chính hãng tại NextGear Store.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProductsWithDelay(800);

  return (
    <div>
      <div className="section-header">
        <div>
          <h1 className="section-title">Tất cả sản phẩm ({products.length})</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Lựa chọn thiết bị phù hợp cho nhu cầu làm việc và giải trí của bạn.
          </p>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div>
              <div className="product-card__top">
                <span className="product-card__category">{product.category}</span>
                {product.badge && (
                  <span className="product-card__badge">{product.badge}</span>
                )}
              </div>

              <h2 className="product-card__title">
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </h2>

              <p className="product-card__desc">{product.shortDescription}</p>
            </div>

            <div>
              <div className="product-card__price-row">
                <span className="product-card__price">
                  {formatCurrencyVND(product.price)}
                </span>
                <span className="product-card__original-price">
                  {formatCurrencyVND(product.originalPrice)}
                </span>
              </div>

              <div className="product-card__meta">
                <span>Đánh giá: {product.rating}/5 ({product.reviewsCount})</span>
                <span>Còn {product.stock} sản phẩm</span>
              </div>

              <div className="product-card__footer">
                <Link
                  href={`/products/${product.id}`}
                  className="btn btn--outline"
                  style={{ width: '100%' }}
                >
                  Xem chi tiết
                </Link>

                <ProductActionLeaf
                  productId={product.id}
                  productName={product.name}
                  stock={product.stock}
                  compact
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
