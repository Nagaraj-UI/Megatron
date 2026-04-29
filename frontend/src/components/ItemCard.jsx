import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cart/cartActions';

export default function ItemCard({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="item-card">
      <div className="item-image-wrap">
        {item.badge && <span className="item-badge">{item.badge}</span>}
        <img
          src={item.image || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={item.name}
          className="item-image"
          onError={e => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
        />
      </div>
      <div className="item-info">
        <p className="item-name">{item.name}</p>
        <p className="item-desc">{item.description}</p>
        <div className="item-footer">
          <div className="item-price-wrap">
            {item.isOnSale && item.salePrice ? (
              <>
                <span className="item-price-sale">${item.salePrice.toFixed(2)}</span>
                <span className="item-price-original">${item.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="item-price">${item.price.toFixed(2)}</span>
            )}
          </div>
          <button className="add-btn" onClick={() => dispatch(addToCart(item))}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
