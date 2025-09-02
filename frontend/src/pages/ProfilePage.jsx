import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/products/ProductCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, updateProfile, deleteAccount, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  if (loading) {
    return <div className="container page-padding"><h1>Loading Profile...</h1></div>;
  }

  if (!user) {
    return <div className="container page-padding">Please log in to see your profile.</div>;
  }

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

  const handleLogout = () => {
    logout();
    navigate('/');
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
      <div className="profile-header">
        <h1>My Profile</h1>
        <button onClick={handleLogout} className="button-secondary">Logout</button>
      </div>

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

      <div className="profile-section danger-zone">
        <h3>Danger Zone</h3>
        <div className="danger-action">
          <div>
            <h4>Delete Account</h4>
            <p>This action is permanent and cannot be undone.</p>
          </div>
          <button onClick={() => setShowDeleteConfirm(true)} className="button-danger">Delete My Account</button>
        </div>
        
        {showDeleteConfirm && (
          <div className="confirmation-modal">
            <h4>Are you absolutely sure?</h4>
            <p>This will permanently delete your account, orders, and all associated data. To confirm, please type "<strong>Confirm Delete</strong>" in the box below.</p>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Confirm Delete"
              />
            </div>
            <div className="confirmation-buttons">
              <button onClick={handleDelete} className="button-danger" disabled={deleteConfirmText !== 'Confirm Delete'}>I understand, delete my account</button>
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }} className="button-secondary">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
