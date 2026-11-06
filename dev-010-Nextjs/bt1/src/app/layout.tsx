import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NextGear Store',
    template: '%s | NextGear Store',
  },
  description: 'Cửa hàng thiết bị công nghệ chính hãng dành cho lập trình viên và nhà sáng tạo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <header className="site-header">
          <div className="container site-header__inner">
            <Link href="/" className="brand">
              <span className="brand__logo">N</span>
              <span>NextGear Store</span>
            </Link>

            <nav className="site-nav" aria-label="Điều hướng chính">
              <Link href="/" className="site-nav__link">
                Trang chủ
              </Link>
              <Link href="/products" className="site-nav__link">
                Sản phẩm
              </Link>
              <Link href="/about" className="site-nav__link">
                Giới thiệu
              </Link>
            </nav>
          </div>
        </header>

        <main className="site-main">
          <div className="container">{children}</div>
        </main>

        <footer className="site-footer">
          <div className="container site-footer__inner">
            <span>NextGear Store — Thiết bị công nghệ chính hãng</span>
            <span>Bản quyền © 2026 NextGear</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
