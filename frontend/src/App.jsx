import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import JakshPage from "./pages/JakshPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { AuthProvider } from "./context/AuthContext";
import ScrollProgressBar from './components/layout/ScrollProgressBar';
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./index.css"; // Import global styles

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <ScrollProgressBar />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/jaksh" element={<JakshPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
