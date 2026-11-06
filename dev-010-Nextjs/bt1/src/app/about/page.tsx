// Chiến lược render: SSG (Static Site Generation - force-static)
// Lý do: Trang giới thiệu có nội dung cố định, hiếm khi thay đổi nên chỉ cần render HTML tĩnh 1 lần lúc build.

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Giới thiệu về NextGear Store và định hướng cung cấp thiết bị công nghệ chính hãng.',
};

export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <div>
      <article className="detail-card">
        <div className="detail-header">
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Về NextGear Store
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Hệ thống phân phối thiết bị công nghệ và phụ kiện làm việc chuyên nghiệp.
          </p>
        </div>

        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Sứ mệnh của chúng tôi
          </h2>
          <p style={{ color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            NextGear Store tập trung tuyển chọn những thiết bị phần cứng chất lượng cao dành cho lập trình viên, kỹ sư phần mềm và nhà thiết kế: từ máy trạm di động, màn hình chuẩn màu cho tới bàn phím cơ và chuột công thái học.
          </p>
        </section>

        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Cam kết dịch vụ
          </h2>

          <div className="detail-specs">
            <div className="detail-specs__row">
              <span className="detail-specs__label">Sản phẩm chính hãng</span>
              <span>Đầy đủ hóa đơn VAT và chứng nhận nguồn gốc từ nhà sản xuất.</span>
            </div>
            <div className="detail-specs__row">
              <span className="detail-specs__label">Bảo hành tiêu chuẩn</span>
              <span>Hỗ trợ bảo hành chính hãng từ 12 đến 36 tháng tùy dòng sản phẩm.</span>
            </div>
            <div className="detail-specs__row">
              <span className="detail-specs__label">Đổi trả linh hoạt</span>
              <span>1 đổi 1 trong 15 ngày đầu nếu phát sinh lỗi phần cứng từ nhà sản xuất.</span>
            </div>
            <div className="detail-specs__row">
              <span className="detail-specs__label">Giao hàng toàn quốc</span>
              <span>Giao nhanh nội thành trong 2 giờ và miễn phí vận chuyển toàn quốc.</span>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn--outline">
            Về trang chủ
          </Link>
          <Link href="/products" className="btn btn--primary">
            Khám phá sản phẩm
          </Link>
        </div>
      </article>
    </div>
  );
}
