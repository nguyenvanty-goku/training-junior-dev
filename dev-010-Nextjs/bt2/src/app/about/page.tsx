// Chiến lược render: SSG (Static Site Generation - dynamic = 'force-static')

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Giới thiệu về NextGear Store',
  description:
    'Tìm hiểu về sứ mệnh, tiêu chuẩn chất lượng và dịch vụ hậu mãi tại NextGear Store.',
  openGraph: {
    title: 'Giới thiệu về NextGear Store',
    description:
      'Tìm hiểu về sứ mệnh, tiêu chuẩn chất lượng và dịch vụ hậu mãi tại NextGear Store.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/images/store-banner.svg',
        width: 800,
        height: 420,
        alt: 'Giới thiệu NextGear Store',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div>
      <article className="detail-card">
        <div className="detail-layout">
          <div>
            <div className="detail-header">
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Về NextGear Store
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Đối tác cung cấp thiết bị phần cứng đáng tin cậy cho cộng đồng công nghệ.
              </p>
            </div>

            <p style={{ color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              NextGear Store được thành lập với mục tiêu mang đến trải nghiệm mua sắm thiết bị công nghệ minh bạch, hiệu năng cao và tối ưu cho nhu cầu lập trình, thiết kế đồ họa cũng như làm việc từ xa.
            </p>

            <div className="detail-specs" style={{ marginBottom: '1.5rem' }}>
              <div className="detail-specs__row">
                <span className="detail-specs__label">Nguồn gốc chính hãng</span>
                <span>100% sản phẩm phân phối chính thức, đầy đủ chứng nhận xuất xứ.</span>
              </div>
              <div className="detail-specs__row">
                <span className="detail-specs__label">Chính sách bảo hành</span>
                <span>Bảo hành tiêu chuẩn từ 12 đến 36 tháng tại trung tâm ủy quyền.</span>
              </div>
              <div className="detail-specs__row">
                <span className="detail-specs__label">Hỗ trợ kỹ thuật</span>
                <span>Đội ngũ kỹ sư tư vấn cấu hình phù hợp với từng nhu cầu thực tế.</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/products" className="btn btn--primary">
                Xem danh mục sản phẩm
              </Link>
              <Link href="/" className="btn btn--outline">
                Về trang chủ
              </Link>
            </div>
          </div>

          <div className="detail-image-box">
            <Image
              src="/images/store-banner.svg"
              alt="Không gian trưng bày sản phẩm NextGear Store"
              width={800}
              height={420}
              priority
              className="detail-image"
            />
          </div>
        </div>
      </article>
    </div>
  );
}

