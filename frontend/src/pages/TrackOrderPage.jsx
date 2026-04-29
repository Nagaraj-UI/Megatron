import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { trackOrder, clearTracking } from '../store/orders/ordersActions';

const TRACKING_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: '📝' },
  { key: 'confirmed', label: 'Confirmed', icon: '✅' },
  { key: 'processing', label: 'Processing', icon: '⚙️' },
  { key: 'shipped', label: 'Shipped', icon: '📦' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '🎉' },
];

export default function TrackOrderPage() {
  const { trackingNumber } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trackedOrder, trackingLoading, trackingError } = useSelector(state => state.orders);

  useEffect(() => {
    if (trackingNumber) {
      dispatch(trackOrder(trackingNumber));
    }
    return () => dispatch(clearTracking());
  }, [dispatch, trackingNumber]);

  const getCurrentStepIndex = () => {
    if (!trackedOrder) return -1;
    return TRACKING_STEPS.findIndex(step => step.key === trackedOrder.status);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (trackingLoading) {
    return (
      <div className="track-page">
        <div className="loading">
          <div className="spinner" />
          <p>Tracking your order...</p>
        </div>
      </div>
    );
  }

  if (trackingError) {
    return (
      <div className="track-page">
        <div className="track-container">
          <div className="track-error">
            <div className="error-icon">❌</div>
            <h2>Order Not Found</h2>
            <p>{trackingError}</p>
            <button className="back-btn" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  if (!trackedOrder) return null;

  const currentStepIndex = getCurrentStepIndex();
  const isCancelled = trackedOrder.status === 'cancelled';

  return (
    <div className="track-page">
      <div className="track-container">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

        <div className="track-header">
          <h1>Order Tracking</h1>
          <div className="tracking-number-display">
            <span className="label">Tracking Number:</span>
            <span className="value">{trackedOrder.trackingNumber}</span>
          </div>
        </div>

        <div className="track-summary">
          <div className="summary-item">
            <span className="summary-label">Order ID</span>
            <span className="summary-value">#{trackedOrder._id.slice(-8).toUpperCase()}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Order Date</span>
            <span className="summary-value">{formatDate(trackedOrder.createdAt)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Estimated Delivery</span>
            <span className="summary-value">{formatDate(trackedOrder.estimatedDelivery)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Amount</span>
            <span className="summary-value">${trackedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        {isCancelled ? (
          <div className="cancelled-notice">
            <div className="cancelled-icon">🚫</div>
            <h2>Order Cancelled</h2>
            <p>This order has been cancelled</p>
          </div>
        ) : (
          <div className="tracking-timeline">
            {TRACKING_STEPS.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className={`timeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-content">
                    <div className="step-label">{step.label}</div>
                    {isCurrent && (
                      <div className="step-status">Current Status</div>
                    )}
                  </div>
                  {index < TRACKING_STEPS.length - 1 && (
                    <div className={`step-connector ${isCompleted ? 'completed' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="order-items-detail">
          <h3>Order Items</h3>
          <div className="items-detail-list">
            {trackedOrder.items.map((item, idx) => (
              <div key={idx} className="item-detail-row">
                <span className="item-detail-name">{item.name}</span>
                <span className="item-detail-qty">Qty: {item.quantity}</span>
                <span className="item-detail-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="items-total">
            <span>Total:</span>
            <span>${trackedOrder.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
