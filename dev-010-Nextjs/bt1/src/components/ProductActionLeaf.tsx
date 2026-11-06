'use client';

import React, { useState } from 'react';

interface ProductActionLeafProps {
  productId: string;
  productName: string;
  stock: number;
  compact?: boolean;
}

export default function ProductActionLeaf({
  productId,
  productName,
  stock,
  compact = false,
}: ProductActionLeafProps) {
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedCount, setAddedCount] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    setAddedCount((prev) => prev + quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  if (compact) {
    return (
      <div className="leaf-client leaf-client--compact" data-product-id={productId}>
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          className={`btn-like ${liked ? 'btn-like--active' : ''}`}
          aria-label={`Yêu thích ${productName}`}
        >
          <span>{liked ? 'Đã thích' : 'Yêu thích'}</span>
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn-quick-add ${justAdded ? 'btn-quick-add--success' : ''}`}
        >
          {justAdded
            ? 'Đã thêm'
            : addedCount > 0
            ? `Đã chọn (${addedCount})`
            : 'Thêm vào giỏ'}
        </button>
      </div>
    );
  }

  return (
    <div className="leaf-client leaf-client--detail" data-product-id={productId}>
      <div className="leaf-client__controls">
        <div className="qty-control" aria-label="Chọn số lượng">
          <button
            type="button"
            className="qty-btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="qty-value">{quantity}</span>
          <button
            type="button"
            className="qty-btn"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn-primary-action ${justAdded ? 'btn-primary-action--success' : ''}`}
        >
          {justAdded
            ? `Đã thêm ${quantity} sản phẩm vào giỏ`
            : `Thêm vào giỏ hàng (${quantity})`}
        </button>

        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          className={`btn-like btn-like--large ${liked ? 'btn-like--active' : ''}`}
        >
          {liked ? 'Đã lưu yêu thích' : 'Lưu vào yêu thích'}
        </button>
      </div>

      {addedCount > 0 && (
        <p className="leaf-client__feedback">
          Đã thêm <strong>{addedCount}</strong> sản phẩm <em>{productName}</em> vào giỏ hàng.
        </p>
      )}
    </div>
  );
}
