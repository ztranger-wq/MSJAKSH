import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import ProductCard from '../components/products/ProductCard';
import OrderHistoryCard from '../components/profile/OrderHistoryCard';
import AddressManager from '../components/profile/AddressManager';
import ProfileStats from '../components/profile/ProfileStats';
import UserPreferences from '../components/profile/UserPreferences';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt, FaCog, FaChartLine, FaEdit } from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, updateProfile, deleteAccount, loading } = useContext(AuthContext);
  const { orders, getMyOrders, orderStats, getOrderStats } = useContext(OrderContext);
  const navigate = useNavigate();
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'orders', label: 'Order History', icon: FaShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
    { id: 'addresses', label: 'Addresses', icon: FaMapMarkerAlt },
    { id: 'settings', label: 'Settings', icon: FaCog },
    { id: 'account', label: 'Account', icon: FaUser }
  ];
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', phone: '', dateOfBirth: '', gender: '' });
  const [message, setMessage] = useState(''), [error, setError] = useState('');
  const [showDelete, setShowDelete] = useState(false), [deleteText, setDeleteText] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        gender: user.gender || ''
      });
      getMyOrders();
      getOrderStats();
    }
  }, [user, getMyOrders, getOrderStats]);

  if (loading) return <div className="profile-loading"><div className="loading-spinner" /><h2>Loading Profile...</h2></div>;
  if (!user) return <div className="profile-error"><h2>Access Denied</h2><p>Please log in.</p></div>;

  const handleUpdate = async e => {
    e.preventDefault(); setError(''); setMessage('');
    try { await updateProfile(profileData); setMessage('Profile updated!'); setIsEditing(false); }
    catch (err) { setError(err.response?.data?.message || 'Failed'); }
  };
  const handleLogout = () => { logout(); navigate('/'); };
  const handleDelete = async () => {
    try { await deleteAccount(); navigate('/'); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); setShowDelete(false); }
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return (
        <div className="overview-content">
          <div className="profile-header">
            <div className="profile-info">
              <h2>{user.name}</h2><p className="email">{user.email}</p>
            </div>
          </div>
          <ProfileStats stats={orderStats} />
        </div>
      );
      case 'orders': return (
        <div className="orders-content">
          <div className="section-header"><h3>Order History</h3><p>View past orders</p></div>
          {orders.length === 0 ?
            <div className="empty-state"><FaShoppingBag size={48} /><h4>No Orders</h4><p>Start shopping!</p><button className="button-primary" onClick={() => navigate('/products')}>Shop Now</button></div>
            : <div className="orders-list">{orders.map(o => <OrderHistoryCard key={o._id} order={o} />)}</div>}
        </div>
      );
      case 'wishlist': return (
        <div className="wishlist-content">
          <div className="section-header"><h3>Wishlist</h3><p>Saved items</p></div>
          {user.wishlist?.length === 0 ?
            <div className="empty-state"><FaHeart size={48} /><h4>Empty</h4><p>Add items!</p><button className="button-primary" onClick={() => navigate('/products')}>Browse</button></div>
            : <div className="products-grid">{user.wishlist.map(p => <ProductCard key={p._id} product={p} />)}</div>}
        </div>
      );
      case 'addresses': return <AddressManager addresses={user.addresses} />;
      case 'settings': return <UserPreferences preferences={user.preferences} />;
      case 'account': return (
        <div className="account-content">
          <div className="profile-section">
            <div className="section-header">
              <h3>Personal Info</h3>
              {!isEditing && <button className="edit-button" onClick={() => setIsEditing(true)}><FaEdit /> Edit</button>}
            </div>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleUpdate}>
              <div className="form-group"><label>Email</label><input type="email" value={user.email} disabled className="form-input disabled-input" /></div>
              <div className="form-row">
                <div className="form-group"><label>Name</label><input type="text" value={profileData.name} onChange={e => setProfileData({ ...profileData, name: e.target.value })} required className="form-input" disabled={!isEditing} /></div>
                <div className="form-group"><label>Phone</label><input type="tel" value={profileData.phone} onChange={e => setProfileData({ ...profileData, phone: e.target.value })} className="form-input" disabled={!isEditing} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>DOB</label><input type="date" value={profileData.dateOfBirth} onChange={e => setProfileData({ ...profileData, dateOfBirth: e.target.value })} className="form-input" disabled={!isEditing} /></div>
                <div className="form-group"><label>Gender</label><select value={profileData.gender} onChange={e => setProfileData({ ...profileData, gender: e.target.value })} className="form-input" disabled={!isEditing}><option />
                  <option>Male</option><option>Female</option><option>Other</option></select></div>
              </div>
              {isEditing && <div className="form-actions"><button type="submit" className="button-primary">Save</button><button type="button" className="button-secondary" onClick={() => { setIsEditing(false); setProfileData({ name: user.name, phone: user.phone, dateOfBirth: user.dateOfBirth?.split('T')[0], gender: user.gender }); }}>Cancel</button></div>}
            </form>
          </div>
          <div className="profile-section danger-zone">
            <h3>Danger Zone</h3>
            <div className="danger-action"><div><h4>Logout</h4><p>Sign out</p></div><button className="button-secondary" onClick={handleLogout}>Logout</button></div>
            <div className="danger-action"><div><h4>Delete Account</h4><p>Permanently remove</p></div><button className="button-danger" onClick={() => setShowDelete(true)}>Delete</button></div>
            {showDelete && <div className="confirmation-modal"><h4>Confirm Delete?</h4><p>Type “Confirm Delete”</p><input type="text" value={deleteText} onChange={e => setDeleteText(e.target.value)} className="form-input" /><div className="confirmation-buttons"><button className="button-danger" disabled={deleteText !== 'Confirm Delete'} onClick={handleDelete}>Delete Forever</button><button className="button-secondary" onClick={() => { setShowDelete(false); setDeleteText(''); }}>Cancel</button></div></div>}
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="profile-page container">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <nav className="profile-nav">
            {tabs.map(tab => (
              <button key={tab.id} className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                <tab.icon /><span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="profile-main">{renderTab()}</main>
      </div>
    </div>
  );
};

export default ProfilePage;