import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../store/orders/ordersActions';

const STATUS_LABELS = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_COLORS = {
  pending: '#ff9800',
  confirmed: '#2196f3',
  processing: '#9c27b0',
  shipped: '#00bcd4',
  out_for_delivery: '#4caf50',
  delivered: '#4caf50',
  cancelled: '#f44336',
};

export default function MyOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { userOrders, loading } = useSelector(state => state.orders);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchUserOrders(user.email));
  }, [dispatch, user, navigate]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (estimatedDelivery) => {
    const now = new Date();
    const delivery = new Date(estimatedDelivery);
    const diff = Math.ceil((delivery - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading">
          <div className="spinner" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <button className="back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1>My Orders</h1>
          <p className="orders-count">{userOrders.length} {userOrders.length === 1 ? 'order' : 'orders'}</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <button className="shop-btn" onClick={() => navigate('/')}>Start Shopping</button>
          </div>
        ) : (
          <div className="orders-list">
            {userOrders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header-row">
                  <div className="order-info-col">
                    <span className="order-label">Order ID</span>
                    <span className="order-value">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="order-info-col">
                    <span className="order-label">Tracking Number</span>
                    <span className="order-value tracking-number">{order.trackingNumber}</span>
                  </div>
                  <div className="order-info-col">
                    <span className="order-label">Order Date</span>
                    <span className="order-value">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-info-col">
                    <span className="order-label">Total</span>
                    <span className="order-value order-total">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-status-section">
                  <div className="status-badge" style={{ background: STATUS_COLORS[order.status] }}>
                    {STATUS_LABELS[order.status]}
                  </div>
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <div className="delivery-info">
                      <span className="delivery-label">Estimated Delivery:</span>
                      <span className="delivery-date">{formatDate(order.estimatedDelivery)}</span>
                      <span className="delivery-days">({getDaysRemaining(order.estimatedDelivery)} days remaining)</span>
                    </div>
                  )}
                  {order.status === 'delivered' && order.actualDelivery && (
                    <div className="delivery-info">
                      <span className="delivery-label">Delivered on:</span>
                      <span className="delivery-date">{formatDate(order.actualDelivery)}</span>
                    </div>
                  )}
                </div>

                <div className="order-items-section">
                  <h4>Items ({order.items.length})</h4>
                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">×{item.quantity}</span>
                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-actions">
                  <button 
                    className="track-btn"
                    onClick={() => navigate(`/track/${order.trackingNumber}`)}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
