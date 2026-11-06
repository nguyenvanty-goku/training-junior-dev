// Chiến lược render: SSG (generateStaticParams) kết hợp ISR (revalidate = 60s)
// Lý do: Tạo sẵn HTML tĩnh cho từng trang sản phẩm để tối ưu SEO, đồng thời làm mới dữ liệu giá/tồn kho sau mỗi 60 giây.

import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS, getProductById, formatCurrencyVND } from '@/data/products';
import ProductActionLeaf from '@/components/ProductActionLeaf';

export const revalidate = 60;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
    };
  }

  return {
    title: `${product.name} - ${formatCurrencyVND(product.price)}`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="detail-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>
          Không tìm thấy sản phẩm
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.
        </p>
        <Link href="/products" className="btn btn--primary">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link
          href="/products"
          className="btn btn--outline"
          style={{ padding: '0.45rem 0.9rem', fontSize: '0.88rem' }}
        >
          Quay lại danh sách sản phẩm
        </Link>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              marginBottom: '0.5rem',
            }}
          >
            <span className="product-card__category">{product.category}</span>
            {product.badge && (
              <span className="product-card__badge">{product.badge}</span>
            )}
          </div>

          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.6rem' }}>
            {product.name}
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
            }}
          >
            <span>
              Đánh giá: <strong>{product.rating}/5.0</strong> ({product.reviewsCount} lượt)
            </span>
            <span>
              Tình trạng:{' '}
              <strong style={{ color: 'var(--accent-emerald)' }}>
                Còn hàng ({product.stock} sản phẩm)
              </strong>
            </span>
          </div>
        </div>

        <div className="product-card__price-row" style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
            {formatCurrencyVND(product.price)}
          </span>
          <span className="product-card__original-price" style={{ fontSize: '1.05rem' }}>
            {formatCurrencyVND(product.originalPrice)}
          </span>
        </div>

        <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
          {product.description}
        </p>

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.5rem' }}>
          Thông số kỹ thuật
        </h2>
        <div className="detail-specs">
          {product.specs.map((spec) => (
            <div key={spec.label} className="detail-specs__row">
              <span className="detail-specs__label">{spec.label}</span>
              <span>{spec.value}</span>
            </div>
          ))}
        </div>

        <ProductActionLeaf
          productId={product.id}
          productName={product.name}
          stock={product.stock}
        />
      </article>
    </div>
  );
}
