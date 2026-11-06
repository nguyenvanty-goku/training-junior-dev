'use client';

import React, { useState } from 'react';

interface AddToCartButtonProps {
  productName: string;
  stock: number;
  compact?: boolean;
}

export default function AddToCartButton({
  productName,
  stock,
  compact = false,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`btn btn--primary btn--full ${added ? 'btn--success' : ''}`}
        aria-label={`Thêm ${productName} vào giỏ hàng`}
      >
        {added ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
      </button>
    );
  }

  return (
    <div className="purchase-actions">
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
        onClick={handleAdd}
        className={`btn btn--primary ${added ? 'btn--success' : ''}`}
      >
        {added ? `Đã thêm ${quantity} sản phẩm` : 'Thêm vào giỏ hàng'}
      </button>
    </div>
  );
}

