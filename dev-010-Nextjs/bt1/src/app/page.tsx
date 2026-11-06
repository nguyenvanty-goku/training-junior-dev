// Chiến lược render: ISR (Incremental Static Regeneration - revalidate = 3600s)
// Lý do: Trang chủ cần tốc độ phản hồi nhanh từ cache tĩnh và chuẩn SEO, đồng thời tự động cập nhật danh sách sản phẩm nổi bật mỗi 1 giờ.

import Link from 'next/link';
import { PRODUCTS, formatCurrencyVND } from '@/data/products';
import ProductActionLeaf from '@/components/ProductActionLeaf';

export const revalidate = 3600;

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1 className="hero__title">
          Thiết bị công nghệ hiệu năng cao cho Developer
        </h1>
        <p className="hero__subtitle">
          Khám phá các dòng Laptop, bàn phím cơ custom, màn hình đồ họa chuẩn màu và phụ kiện công thái học chính hãng.
        </p>
        <div className="hero__actions">
          <Link href="/products" className="btn btn--primary">
            Xem tất cả sản phẩm
          </Link>
          <Link href="/about" className="btn btn--outline">
            Về chúng tôi
          </Link>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <Link href="/products" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Xem tất cả ({PRODUCTS.length})
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div>
                <div className="product-card__top">
                  <span className="product-card__category">{product.category}</span>
                  {product.badge && (
                    <span className="product-card__badge">{product.badge}</span>
                  )}
                </div>

                <h3 className="product-card__title">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>

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
      </section>
    </div>
  );
}
