import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/cartActions';

export default function ItemDetailModal({ item, onClose }) {
  const dispatch = useDispatch();

  if (!item) return null;

  const handleAddToCart = () => {
    dispatch(addToCart(item));
    onClose();
  };

  const displayPrice = item.isOnSale && item.salePrice ? item.salePrice : item.price;
  const hasDiscount = item.isOnSale && item.salePrice;
  const discountPercent = hasDiscount 
    ? Math.round(((item.price - item.salePrice) / item.price) * 100)
    : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-body">
          <div className="modal-image-section">
            <div className="modal-image-wrap">
              {item.badge && <span className="modal-badge">{item.badge}</span>}
              <img
                src={item.image || 'https://via.placeholder.com/500'}
                alt={item.name}
                className="modal-image"
                onError={e => { e.target.src = 'https://via.placeholder.com/500'; }}
              />
            </div>
          </div>

          <div className="modal-details-section">
            <div className="modal-category">{item.category}</div>
            <h2 className="modal-title">{item.name}</h2>
            <p className="modal-description">{item.description}</p>

            <div className="modal-price-section">
              {hasDiscount ? (
                <>
                  <div className="modal-price-row">
                    <span className="modal-price-sale">${item.salePrice.toFixed(2)}</span>
                    <span className="modal-price-original">${item.price.toFixed(2)}</span>
                  </div>
                  <span className="modal-discount-badge">Save {discountPercent}%</span>
                </>
              ) : (
                <span className="modal-price">${item.price.toFixed(2)}</span>
              )}
            </div>

            <div className="modal-features">
              <h3>Product Features</h3>
              <ul>
                <li>✓ High quality materials</li>
                <li>✓ Comfortable fit</li>
                <li>✓ Easy to care for</li>
                <li>✓ Available in multiple sizes</li>
                {hasDiscount && <li>✓ Limited time offer</li>}
              </ul>
            </div>

            <div className="modal-actions">
              <button className="modal-add-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="modal-cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
