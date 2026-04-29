import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchItems, fetchFeaturedItems, fetchNewArrivals, fetchSaleItems, setActiveCategory, setActiveSection } from '../store/items/itemsActions';
import { logout } from '../store/auth/authActions';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import logoImage from '../assets/image.png';
const CATEGORIES = ['All', 'Women', 'Men', 'Kids', 'Dresses', 'Tops', 'Beachwear', 'Shoes', 'Accessories'];

const CATEGORY_ICONS = {
  All: '🛍️',
  Women: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop',
  Men: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=200&h=200&fit=crop',
  Kids: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=200&h=200&fit=crop',
  Dresses: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop',
  Tops: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop',
  Beachwear: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=200&fit=crop',
  Shoes: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=200&h=200&fit=crop',
  Accessories: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop',
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    list: items, 
    featuredItems,
    newArrivals,
    saleItems,
    loading, 
    featuredLoading,
    newArrivalsLoading,
    saleLoading,
    activeCategory,
    activeSection 
  } = useSelector(state => state.items);
  const cartCount = useSelector(state => state.cart.items.reduce((s, i) => s + i.quantity, 0));
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchItems(''));
  }, [dispatch]);

  const handleShopNow = () => {
    // Fetch all special collections
    dispatch(fetchFeaturedItems());
    dispatch(fetchNewArrivals());
    dispatch(fetchSaleItems());
    dispatch(setActiveSection('featured'));
    // Scroll to products section
    document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Determine which items to display based on active section
  let displayItems = items;
  let sectionTitle = 'All Items';
  let currentLoading = loading;

  if (activeSection === 'featured') {
    displayItems = featuredItems;
    sectionTitle = '⭐ Featured & Trending';
    currentLoading = featuredLoading;
  } else if (activeSection === 'new') {
    displayItems = newArrivals;
    sectionTitle = '🆕 New Arrivals';
    currentLoading = newArrivalsLoading;
  } else if (activeSection === 'sale') {
    displayItems = saleItems;
    sectionTitle = '🔥 Sale Items';
    currentLoading = saleLoading;
  } else if (activeCategory !== 'All') {
    displayItems = items.filter(i => i.category === activeCategory);
    sectionTitle = activeCategory;
  }

  return (
    <div className="page">
      {/* Top Banner */}
      <div className="top-banner">
        🎉 <strong>NEW USERS ONLY</strong> — Free Shipping + 20% OFF your first order &nbsp;|&nbsp; Free Returns &nbsp;|&nbsp; Price Adjustment within 30 days
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        <SearchBar />
        <div className="navbar-icons">
          {user ? (
            <div className="user-menu">
              <span className="user-name">👤 {user.name}</span>
              <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
            </div>
          ) : (
            <button className="login-link" onClick={() => navigate('/login')}>👤 Login</button>
          )}
          <span className="cart-icon-wrap">
            🛒 <span className="cart-badge">{cartCount}</span>
          </span>
          <span>❤️</span>
        </div>
      </nav>

      {/* Category Nav */}
      <div className="cat-nav">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-nav-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => {
              dispatch(setActiveCategory(cat));
              dispatch(setActiveSection('all'));
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <p className="hero-sub">Summer Collection 2026</p>
          <h1 className="hero-title">Heat Up<br />Your Look</h1>
          <p className="hero-desc">Become a Summer Style Icon</p>
          <button className="hero-btn" onClick={handleShopNow}>SHOP NOW →</button>
        </div>
        <div className="hero-overlay" />
      </div>

      {/* Special Collections Nav */}
      <div className="special-nav">
        <button
          className={`special-btn ${activeSection === 'featured' ? 'active' : ''}`}
          onClick={() => {
            dispatch(fetchFeaturedItems());
            dispatch(setActiveSection('featured'));
          }}
        >
          ⭐ Featured
        </button>
        <button
          className={`special-btn ${activeSection === 'new' ? 'active' : ''}`}
          onClick={() => {
            dispatch(fetchNewArrivals());
            dispatch(setActiveSection('new'));
          }}
        >
          🆕 New Arrivals
        </button>
        <button
          className={`special-btn ${activeSection === 'sale' ? 'active' : ''}`}
          onClick={() => {
            dispatch(fetchSaleItems());
            dispatch(setActiveSection('sale'));
          }}
        >
          🔥 Sale
        </button>
        <button
          className={`special-btn ${activeSection === 'all' ? 'active' : ''}`}
          onClick={() => {
            dispatch(setActiveSection('all'));
            dispatch(setActiveCategory('All'));
          }}
        >
          🛍️ All Items
        </button>
      </div>

      {/* Category Circles */}
      <div className="category-circles">
        {CATEGORIES.filter(c => c !== 'All').map(cat => (
          <div
            key={cat}
            className="cat-circle"
            onClick={() => {
              dispatch(setActiveCategory(cat));
              dispatch(setActiveSection('all'));
            }}
          >
            <div className="cat-circle-icon">
              <img src={CATEGORY_ICONS[cat]} alt={cat} className="cat-circle-img" />
            </div>
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="products-section">
          <div className="section-header">
            <h2>{sectionTitle}</h2>
            <span className="item-count">{displayItems.length} items</span>
          </div>

          {currentLoading && (
            <div className="loading">
              <div className="spinner" />
              <p>Loading items...</p>
            </div>
          )}

          {!currentLoading && displayItems.length === 0 && (
            <div className="empty-msg">No items found.</div>
          )}

          <div className="items-grid">
            {displayItems.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <Cart />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
