import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';
import PasswordStrengthMeter from '../components/auth/PasswordStrengthMeter';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setError(''); // Clear previous errors
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      console.error('Failed to register', err);
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
          </div>
          <PasswordStrengthMeter password={password} />
          <button type="submit" className="button-primary w-full">Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
