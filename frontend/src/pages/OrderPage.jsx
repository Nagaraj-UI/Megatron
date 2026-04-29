import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cart/cartActions';
import axios from 'axios';
import PaymentModal from '../components/PaymentModal';

export default function OrderPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [name, setName] = useState(user?.name || '');
  const [showPayment, setShowPayment] = useState(false);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  if (!state?.cart) {
    navigate('/');
    return null;
  }

  const handleProceedToPayment = () => {
    if (!name.trim()) return alert('Please enter your name');
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    setShowPayment(false);
    setLoading(true);
    try {
      const payload = {
        customerName: name,
        customerEmail: user?.email || 'guest@example.com',
        items: state.cart.map(c => ({ itemId: c._id, name: c.name, price: c.price, quantity: c.quantity })),
        total: state.total,
      };
      const { data } = await axios.post('/api/orders', payload);
      setTrackingNumber(data.trackingNumber);
      dispatch(clearCart());
      setDone(true);
    } catch {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (loading) {
    return (
      <div className="order-page">
        <div className="loading">
          <div className="spinner" />
          <p>Creating your order...</p>
        </div>
      </div>
    );
  }

  if (done) return (
    <div className="order-success">
      <div className="success-icon">✅</div>
      <h1>Order Placed Successfully!</h1>
      <p>Thanks <strong>{name}</strong>, your order is confirmed.</p>
      <div className="tracking-info">
        <p className="tracking-label">Your Tracking Number:</p>
        <p className="tracking-number-big">{trackingNumber}</p>
        <p className="tracking-hint">Save this number to track your order</p>
      </div>
      <div className="success-actions">
        <button className="track-order-btn" onClick={() => navigate(`/track/${trackingNumber}`)}>
          Track Order
        </button>
        <button className="continue-btn" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div>
  );

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
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          amount={state.total}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
}
