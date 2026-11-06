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
          <div key={item} className="product-card" style={{ gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="skeleton-box" style={{ width: '90px', height: '16px' }} />
              <div className="skeleton-box" style={{ width: '70px', height: '20px' }} />
            </div>

            <div className="skeleton-box" style={{ width: '85%', height: '24px' }} />
            <div className="skeleton-box" style={{ width: '100%', height: '42px' }} />

            <div className="skeleton-box" style={{ width: '140px', height: '28px' }} />
            <div className="skeleton-box" style={{ width: '100%', height: '38px' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div className="skeleton-box" style={{ flex: 1, height: '36px' }} />
              <div className="skeleton-box" style={{ flex: 1, height: '36px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
