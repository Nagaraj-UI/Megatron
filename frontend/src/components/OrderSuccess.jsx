import { useNavigate } from 'react-router-dom';

export default function OrderSuccess({ name }) {
  const navigate = useNavigate();
  return (
    <div className="order-success">
      <div className="success-icon">✅</div>
      <h1>Order Placed!</h1>
      <p>Thanks <strong>{name}</strong>, your order is confirmed.</p>
      <button className="back-btn" onClick={() => navigate('/')}>
        Continue Shopping
      </button>
    </div>
  );
}
