import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import axios from 'axios';
import OrderSuccess from '../components/OrderSuccess';

export default function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!state?.cart) {
    navigate('/');
    return null;
  }

  const placeOrder = async () => {
    if (!name.trim()) return alert('Please enter your name');
    setLoading(true);
    try {
      const payload = {
        customerName: name,
        items: state.cart.map(c => ({ itemId: c._id, name: c.name, price: c.price, quantity: c.quantity })),
        total: state.total,
      };
      await axios.post('/api/orders', payload);
      dispatch(clearCart());
      setDone(true);
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) return <OrderSuccess name={name} />;

  return (
    <div className="order-page">
      <button className="back-link" onClick={() => navigate('/')}>← Back to Shop</button>
      <div className="order-card">
        <h2>Complete Your Order</h2>

        <div className="order-items">
          {state.cart.map(c => (
            <div key={c._id} className="order-item-row">
              <img
                src={c.image || 'https://via.placeholder.com/50'}
                alt={c.name}
                className="order-item-img"
                onError={e => { e.target.src = 'https://via.placeholder.com/50'; }}
              />
              <span className="order-item-name">{c.name} × {c.quantity}</span>
              <span className="order-item-price">${(c.price * c.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="order-total">
          Total: <strong>${state.total.toFixed(2)}</strong>
        </div>

        <input
          className="name-input"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
