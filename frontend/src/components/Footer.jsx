export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>Company Info</h4>
          <ul>
            <li><a href="#about">About SHEINCLONE</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press & Media</a></li>
            <li><a href="#blog">Fashion Blog</a></li>
            <li><a href="#affiliates">Affiliate Program</a></li>
            <li><a href="#sustainability">Sustainability</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#shipping">Shipping Info</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
            <li><a href="#track">Track Order</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#size-guide">Size Guide</a></li>
            <li><a href="#payment">Payment Methods</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Shop</h4>
          <ul>
            <li><a href="#women">Women's Fashion</a></li>
            <li><a href="#men">Men's Fashion</a></li>
            <li><a href="#kids">Kids' Clothing</a></li>
            <li><a href="#accessories">Accessories</a></li>
            <li><a href="#shoes">Shoes</a></li>
            <li><a href="#sale">Sale & Deals</a></li>
            <li><a href="#new">New Arrivals</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#cookies">Cookie Policy</a></li>
            <li><a href="#intellectual">Intellectual Property</a></li>
            <li><a href="#accessibility">Accessibility</a></li>
          </ul>
        </div>

        <div className="footer-section footer-newsletter">
          <h4>Stay Connected</h4>
          <p>Get exclusive deals & style tips</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#facebook" aria-label="Facebook">📘</a>
            <a href="#instagram" aria-label="Instagram">📷</a>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#pinterest" aria-label="Pinterest">📌</a>
            <a href="#youtube" aria-label="YouTube">📺</a>
            <a href="#tiktok" aria-label="TikTok">🎵</a>
          </div>
        </div>
      </div>

      <div className="footer-payment">
        <p className="payment-label">We Accept:</p>
        <div className="payment-methods">
          <span className="payment-icon">💳 Visa</span>
          <span className="payment-icon">💳 Mastercard</span>
          <span className="payment-icon">💳 Amex</span>
          <span className="payment-icon">💳 PayPal</span>
          <span className="payment-icon">💳 Apple Pay</span>
          <span className="payment-icon">💳 Google Pay</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 SHEINCLONE. All Rights Reserved.</p>
        <p className="footer-disclaimer">
          Prices and promotions are subject to change. Free shipping on orders over $50.
        </p>
      </div>
    </footer>
  );
}
