import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderPage from './pages/OrderPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MyOrdersPage from './pages/MyOrdersPage';
import TrackOrderPage from './pages/TrackOrderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/track/:trackingNumber" element={<TrackOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
