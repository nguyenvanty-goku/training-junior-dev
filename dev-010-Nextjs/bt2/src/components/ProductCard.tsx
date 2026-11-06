import Image from 'next/image';
import Link from 'next/link';
import { Product, formatUSD } from '@/lib/api';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.id}`} className="product-card__image-wrap">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={360}
          height={240}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="product-card__image"
        />
      </Link>

      <div className="product-card__body">
        <div className="product-card__top">
          <span className="product-card__category">{product.category}</span>
          {product.discountPercentage > 0 && (
            <span className="product-card__badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <h3 className="product-card__title">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>

        <p className="product-card__desc">{product.description}</p>
      </div>

      <div className="product-card__footer">
        <div className="product-card__price-row">
          <span className="product-card__price">{formatUSD(product.price)}</span>
          <span className="product-card__rating">
            Đánh giá: {product.rating.toFixed(1)}/5
          </span>
        </div>

        <div className="product-card__actions">
          <Link href={`/products/${product.id}`} className="btn btn--outline btn--full">
            Xem chi tiết
          </Link>
          <AddToCartButton
            productName={product.title}
            stock={product.stock}
            compact
          />
        </div>
      </div>
    </article>
  );
}

