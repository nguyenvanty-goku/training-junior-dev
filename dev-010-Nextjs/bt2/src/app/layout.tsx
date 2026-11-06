import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nextgear-store-demo.vercel.app'),
  title: {
    default: 'NextGear Store — Thiết bị công nghệ chính hãng',
    template: '%s | NextGear Store',
  },
  description:
    'Hệ thống cung cấp Laptop, máy tính bảng và phụ kiện công nghệ chính hãng với hiệu năng cao.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://nextgear-store-demo.vercel.app',
    siteName: 'NextGear Store',
    title: 'NextGear Store — Thiết bị công nghệ chính hãng',
    description:
      'Hệ thống cung cấp Laptop, máy tính bảng và phụ kiện công nghệ chính hãng với hiệu năng cao.',
    images: [
      {
        url: '/images/store-banner.svg',
        width: 800,
        height: 420,
        alt: 'NextGear Store Banner',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={beVietnamPro.className}>
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

