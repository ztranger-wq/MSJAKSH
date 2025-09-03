import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import './AddressManager.css';

const AddressManager = ({ addresses = [] }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    phone: '',
    isDefault: false
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'India',
      phone: '',
      isDefault: false
    });
    setEditingAddress(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        console.log('Updating address:', editingAddress._id, formData);
      } else {
        console.log('Adding new address:', formData);
      }
      resetForm();
    } catch (error) {
      console.error('Address operation failed:', error);
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        console.log('Deleting address:', addressId);
      } catch (error) {
        console.error('Delete address failed:', error);
      }
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      console.log('Setting default address:', addressId);
    } catch (error) {
      console.error('Set default address failed:', error);
    }
  };

  return (
    <div className="address-manager">
      <div className="addresses-header">
        <div className="section-header">
          <h3>Saved Addresses</h3>
          <p>Manage your shipping addresses</p>
        </div>
        <button 
          className="button-primary add-address-btn"
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="empty-addresses">
          <h4>No Saved Addresses</h4>
          <p>Add an address to make checkout faster</p>
        </div>
      ) : (
        <div className="addresses-grid">
          {addresses.map((address) => (
            <div key={address._id} className="address-card">
              {address.isDefault && (
                <div className="default-badge">
                  <FaStar /> Default
                </div>
              )}
              
              <div className="address-content">
                <h4>{address.fullName}</h4>
                <p>{address.address}</p>
                <p>{address.city}, {address.postalCode}</p>
                <p>{address.country}</p>
                <p className="phone">Phone: {address.phone}</p>
              </div>

              <div className="address-actions">
                <button 
                  className="action-btn edit"
                  onClick={() => handleEdit(address)}
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDelete(address._id)}
                >
                  <FaTrash />
                </button>
                {!address.isDefault && (
                  <button 
                    className="action-btn default"
                    onClick={() => handleSetDefault(address._id)}
                    title="Set as default"
                  >
                    <FaStar />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="address-form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingAddress ? 'Edit Address' : 'Add New Address'}</h3>
              <button 
                className="close-btn"
                onClick={resetForm}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="address-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  className="form-input"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  required
                  className="form-input"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                  />
                  Set as default address
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="button-primary">
                  {editingAddress ? 'Update Address' : 'Save Address'}
                </button>
                <button type="button" className="button-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;
