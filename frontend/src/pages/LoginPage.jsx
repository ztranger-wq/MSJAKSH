import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Failed to log in', err);
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
          </div>
          <button type="submit" className="button-primary w-full">Login</button>
        </form>
        <div className="form-footer">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
