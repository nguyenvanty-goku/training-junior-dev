import React from 'react';
import { Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-img"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <span className="badge-discount">-{Math.round(product.discountPercentage)}%</span>
        )}
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h4 className="product-title" title={product.title}>
          {product.title}
        </h4>

        <div className="product-rating">
          <Star size={14} className="star-icon" />
          <span>{product.rating}</span>
          <span className="product-brand">({product.brand || 'No brand'})</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">${product.price}</span>
          <span className="product-stock">Còn {product.stock} sp</span>
        </div>
      </div>
    </div>
  );
};
