import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './UserPreferences.css';

const UserPreferences = ({ preferences = {} }) => {
  const { updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    newsletter: preferences.newsletter ?? true,
    smsNotifications: preferences.smsNotifications ?? true,
    emailNotifications: preferences.emailNotifications ?? true,
    currency: preferences.currency || 'INR',
    language: preferences.language || 'en'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ preferences: formData });
      setMessage('Preferences updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Update preferences failed:', error);
    }
  };

  return (
    <div className="user-preferences">
      <div className="section-header">
        <h3>Preferences</h3>
        <p>Customize your shopping experience</p>
      </div>
      
      {message && <div className="success-message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="preferences-form">
        <div className="preference-section">
          <h4>Notifications</h4>
          <div className="preference-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({
                  ...formData, 
                  emailNotifications: e.target.checked
                })}
              />
              Email notifications for orders and updates
            </label>
          </div>
          <div className="preference-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.smsNotifications}
                onChange={(e) => setFormData({
                  ...formData, 
                  smsNotifications: e.target.checked
                })}
              />
              SMS notifications for delivery updates
            </label>
          </div>
          <div className="preference-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) => setFormData({
                  ...formData, 
                  newsletter: e.target.checked
                })}
              />
              Subscribe to newsletter and promotional emails
            </label>
          </div>
        </div>

        <div className="preference-section">
          <h4>Regional Settings</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="form-input"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                className="form-input"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="button-primary">
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserPreferences;
