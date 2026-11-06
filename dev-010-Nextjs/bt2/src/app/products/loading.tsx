export default function ProductsLoading() {
  const skeletonItems = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div aria-busy="true" aria-live="polite">
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          className="skeleton-box"
          style={{ width: '260px', height: '32px', marginBottom: '0.5rem' }}
        />
        <div className="skeleton-box" style={{ width: '420px', height: '18px' }} />
      </div>

      <div className="product-grid">
        {skeletonItems.map((item) => (
          <div key={item} className="product-card" style={{ padding: '1.25rem', gap: '0.85rem' }}>
            <div className="skeleton-box" style={{ width: '100%', height: '180px' }} />
            <div className="skeleton-box" style={{ width: '40%', height: '16px' }} />
            <div className="skeleton-box" style={{ width: '85%', height: '24px' }} />
            <div className="skeleton-box" style={{ width: '100%', height: '38px' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div className="skeleton-box" style={{ flex: 1, height: '38px' }} />
              <div className="skeleton-box" style={{ flex: 1, height: '38px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

