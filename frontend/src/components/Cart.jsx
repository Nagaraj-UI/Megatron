import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cartItems.length === 0) return null;

  return (
    <div className="cart-panel">
      <h3 className="cart-title">🛒 My Cart ({cartItems.length})</h3>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <img
              src={item.image || 'https://via.placeholder.com/50'}
              alt={item.name}
              className="cart-item-img"
              onError={e => { e.target.src = 'https://via.placeholder.com/50'; }}
            />
            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="cart-qty">
              <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity - 1 }))}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 1 }))}>+</button>
            </div>
            <button className="cart-remove" onClick={() => dispatch(removeFromCart(item._id))}>✕</button>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <span className="cart-total">Total: <strong>${total.toFixed(2)}</strong></span>
        <button
          className="checkout-btn"
          onClick={() => navigate('/order', { state: { cart: cartItems, total } })}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
