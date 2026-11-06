// Chiến lược render: ISR (Incremental Static Regeneration - revalidate = 3600s)

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedProductsISR } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Trang chủ — Thiết bị công nghệ hiệu năng cao',
  description:
    'Khám phá các dòng Laptop và phụ kiện công nghệ chính hãng mới nhất tại NextGear Store.',
  openGraph: {
    title: 'NextGear Store — Thiết bị công nghệ hiệu năng cao',
    description:
      'Khám phá các dòng Laptop và phụ kiện công nghệ chính hãng mới nhất tại NextGear Store.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/images/store-banner.svg',
        width: 800,
        height: 420,
        alt: 'NextGear Store Hero Banner',
      },
    ],
  },
};

export default async function HomePage() {
  const featuredProducts = await fetchFeaturedProductsISR(6);

  return (
    <div>
      <section className="hero">
        <div>
          <h1 className="hero__title">
            Nâng tầm hiệu suất làm việc với thiết bị công nghệ chuẩn mực
          </h1>
          <p className="hero__subtitle">
            Tuyển chọn các mẫu máy tính xách tay, màn hình đồ họa và thiết bị ngoại vi chính hãng dành cho kỹ sư phần mềm và nhà sáng tạo nội dung.
          </p>
          <div className="hero__actions">
            <Link href="/products" className="btn btn--primary">
              Khám phá sản phẩm
            </Link>
            <Link href="/about" className="btn btn--outline">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>

        <div className="hero__media">
          <Image
            src="/images/store-banner.svg"
            alt="Minh họa hệ thống sản phẩm NextGear Store"
            width={800}
            height={420}
            priority
            className="hero__image"
          />
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <Link href="/products" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Xem tất cả danh mục
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

