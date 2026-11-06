// Chiến lược render: SSG (generateStaticParams) kết hợp ISR (revalidate = 60s)

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedProductsISR, fetchProductByIdISR, formatUSD } from '@/lib/api';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await fetchFeaturedProductsISR(6);
  return products.map((product) => ({
    id: String(product.id),
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductByIdISR(id);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Sản phẩm không tồn tại hoặc đã ngừng kinh doanh.',
    };
  }

  return {
    title: `${product.title} — ${formatUSD(product.price)}`,
    description: product.description,
    openGraph: {
      title: `${product.title} | NextGear Store`,
      description: product.description,
      url: `/products/${product.id}`,
      type: 'website',
      images: [
        {
          url: product.thumbnail,
          width: 600,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await fetchProductByIdISR(id);

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

  const mainImage = product.images?.[0] || product.thumbnail;

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
        <div className="detail-layout">
          <div className="detail-image-box">
            <Image
              src={mainImage}
              alt={product.title}
              width={520}
              height={420}
              sizes="(max-width: 820px) 100vw, 45vw"
              priority
              className="detail-image"
            />
          </div>

          <div>
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
                {product.discountPercentage > 0 && (
                  <span className="product-card__badge">
                    Giảm {Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {product.title}
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
                  Đánh giá: <strong>{product.rating.toFixed(1)}/5.0</strong>
                </span>
                <span>
                  Tình trạng:{' '}
                  <strong style={{ color: 'var(--accent-emerald)' }}>
                    Còn {product.stock} sản phẩm
                  </strong>
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
                {formatUSD(product.price)}
              </span>
            </div>

            <p style={{ fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            <h2 style={{ fontSize: '1.08rem', fontWeight: 700 }}>
              Thông tin chi tiết
            </h2>
            <div className="detail-specs">
              <div className="detail-specs__row">
                <span className="detail-specs__label">Thương hiệu</span>
                <span>{product.brand || 'NextGear Official'}</span>
              </div>
              <div className="detail-specs__row">
                <span className="detail-specs__label">Danh mục</span>
                <span>{product.category}</span>
              </div>
              <div className="detail-specs__row">
                <span className="detail-specs__label">Bảo hành</span>
                <span>{product.warrantyInformation || 'Bảo hành chính hãng 12 tháng'}</span>
              </div>
              <div className="detail-specs__row">
                <span className="detail-specs__label">Vận chuyển</span>
                <span>{product.shippingInformation || 'Giao hàng toàn quốc 1-3 ngày'}</span>
              </div>
            </div>

            <AddToCartButton
              productName={product.title}
              stock={product.stock}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

