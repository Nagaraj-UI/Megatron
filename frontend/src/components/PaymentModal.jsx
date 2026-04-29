import { useState } from 'react';

export default function PaymentModal({ amount, onSuccess, onCancel }) {
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success' | 'failed'
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    // Limit CVV to 3 digits
    if (name === 'cvv' && value.length > 3) return;

    // Limit month to 2 digits
    if (name === 'expiryMonth' && value.length > 2) return;

    // Limit year to 2 digits
    if (name === 'expiryYear' && value.length > 2) return;

    setFormData({ ...formData, [name]: formattedValue });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');

    if (!formData.cardNumber || cardNumberClean.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.cardName || formData.cardName.length < 3) {
      newErrors.cardName = 'Please enter cardholder name';
    }

    if (!formData.expiryMonth || parseInt(formData.expiryMonth) < 1 || parseInt(formData.expiryMonth) > 12) {
      newErrors.expiryMonth = 'Invalid month';
    }

    if (!formData.expiryYear || formData.expiryYear.length !== 2) {
      newErrors.expiryYear = 'Invalid year';
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setStep('processing');

    // Simulate payment processing (2 seconds)
    setTimeout(() => {
      // 95% success rate (for demo purposes)
      const isSuccess = Math.random() > 0.05;
      
      if (isSuccess) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setStep('failed');
      }
    }, 2000);
  };

  const handleRetry = () => {
    setStep('form');
    setErrors({});
  };

  if (step === 'processing') {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal">
          <div className="payment-processing">
            <div className="processing-spinner"></div>
            <h2>Processing Payment</h2>
            <p>Please wait while we process your payment...</p>
            <div className="processing-amount">${amount.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal">
          <div className="payment-success">
            <div className="success-checkmark">✓</div>
            <h2>Payment Successful!</h2>
            <p>Your payment of ${amount.toFixed(2)} has been processed</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'failed') {
    return (
      <div className="payment-modal-overlay">
        <div className="payment-modal">
          <div className="payment-failed">
            <div className="failed-icon">✕</div>
            <h2>Payment Failed</h2>
            <p>Your payment could not be processed. Please try again.</p>
            <div className="failed-actions">
              <button className="retry-btn" onClick={handleRetry}>Try Again</button>
              <button className="cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-modal-overlay" onClick={onCancel}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onCancel}>✕</button>

        <div className="payment-header">
          <h2>Complete Payment</h2>
          <div className="payment-amount-display">
            <span className="amount-label">Total Amount</span>
            <span className="amount-value">${amount.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-methods">
          <button
            className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            💳 Card
          </button>
          <button
            className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('upi')}
          >
            📱 UPI
          </button>
          <button
            className={`method-btn ${paymentMethod === 'wallet' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('wallet')}
          >
            👛 Wallet
          </button>
        </div>

        {paymentMethod === 'card' && (
          <div className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                className={errors.cardNumber ? 'error' : ''}
              />
              {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
            </div>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                placeholder="JOHN DOE"
                value={formData.cardName}
                onChange={handleChange}
                className={errors.cardName ? 'error' : ''}
              />
              {errors.cardName && <span className="error-text">{errors.cardName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <div className="expiry-inputs">
                  <input
                    type="number"
                    name="expiryMonth"
                    placeholder="MM"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    className={errors.expiryMonth ? 'error' : ''}
                  />
                  <span>/</span>
                  <input
                    type="number"
                    name="expiryYear"
                    placeholder="YY"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    className={errors.expiryYear ? 'error' : ''}
                  />
                </div>
                {(errors.expiryMonth || errors.expiryYear) && (
                  <span className="error-text">{errors.expiryMonth || errors.expiryYear}</span>
                )}
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="3"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="error-text">{errors.cvv}</span>}
              </div>
            </div>

            <div className="payment-info">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>

            <button className="pay-btn" onClick={handlePayment}>
              Pay ${amount.toFixed(2)}
            </button>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="payment-form">
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="yourname@upi"
              />
            </div>
            <button className="pay-btn" onClick={handlePayment}>
              Pay ${amount.toFixed(2)}
            </button>
          </div>
        )}

        {paymentMethod === 'wallet' && (
          <div className="payment-form">
            <div className="wallet-options">
              <button className="wallet-option">PayPal</button>
              <button className="wallet-option">Google Pay</button>
              <button className="wallet-option">Apple Pay</button>
            </div>
            <button className="pay-btn" onClick={handlePayment}>
              Pay ${amount.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
