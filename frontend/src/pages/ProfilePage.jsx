import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/products/ProductCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateProfile, deleteAccount, wishlist } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!user) return <div>Please log in to see your profile.</div>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await updateProfile({ name });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      navigate('/'); // Navigate to home after account deletion
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account.');
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="container profile-page">
      <h1>My Profile</h1>
      
      <div className="profile-section">
        <h3>Update Your Information</h3>
        <form onSubmit={handleUpdate}>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={user.email} disabled className="form-input disabled-input" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
          </div>
          <button type="submit" className="button-primary">Update Profile</button>
        </form>
      </div>

      <div className="profile-section">
        <h3>My Wishlist</h3>
        {wishlist.length > 0 ? (
          <div className="product-list-grid">
            {wishlist.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p>You haven't liked any products yet.</p>
        )}
      </div>

      <div className="profile-section danger-zone">
        <h3>Danger Zone</h3>
        <p>Deleting your account is a permanent action and cannot be undone.</p>
        <button onClick={() => setShowDeleteConfirm(true)} className="button-danger">Delete My Account</button>
        
        {showDeleteConfirm && (
          <div className="confirmation-modal">
            <h4>Are you sure?</h4>
            <p>This will permanently delete your account, orders, and all associated data.</p>
            <div className="confirmation-buttons">
              <button onClick={handleDelete} className="button-danger">Yes, Delete My Account</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="button-secondary">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
