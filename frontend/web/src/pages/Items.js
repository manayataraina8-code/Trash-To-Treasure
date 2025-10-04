import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { itemService, pickupService } from '../services/api';
import SellButton from '../components/SellButton';

function Items() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await itemService.getUserItems();
      setItems(response.data);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  };

  const completePickup = async (itemId) => {
    try {
      await pickupService.completePickup(itemId);
      alert('Pickup completed! Tokens earned.');
      loadItems();
    } catch (error) {
      alert('Failed to complete pickup');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: '#FFA500',
      matched: '#007AFF',
      picked_up: '#34C759',
      completed: '#28a745'
    };
    return colors[status] || '#666';
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div>
      <div className="header">
        <h1>My Items</h1>
        <div className="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/items">Items</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/partners">Partners</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout} className="btn">Logout</button>
        </div>
      </div>

      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Your Items ({items.length})</h2>
          <div>
            <input type="file" accept="image/*" style={{display: 'none'}} id="upload" />
            <label htmlFor="upload" className="btn">📷 Add New Item</label>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="card" style={{textAlign: 'center', padding: '40px'}}>
            <h3>No items yet</h3>
            <p>Start by taking a photo of an item you want to recycle!</p>
          </div>
        ) : (
          <div className="grid">
            {items.map(item => (
              <div key={item._id} className="card">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <div>
                    <h3 style={{textTransform: 'capitalize', margin: '0 0 10px 0'}}>{item.category}</h3>
                    <p style={{margin: '5px 0', color: '#666'}}>Condition: {item.condition}</p>
                    <p style={{margin: '5px 0', fontSize: '18px', fontWeight: 'bold', color: '#34C759'}}>
                      ₹{item.estimatedValue}
                    </p>
                  </div>
                  <span 
                    style={{
                      background: getStatusColor(item.status),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div style={{marginTop: '15px', fontSize: '14px', color: '#666'}}>
                  <p>📍 {item.location?.address || 'Location set'}</p>
                  <p>📅 {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>

                {item.matchedPartner && (
                  <div style={{marginTop: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '8px'}}>
                    <p style={{margin: '0', fontSize: '14px'}}>
                      <strong>Partner:</strong> {item.matchedPartner.name}
                    </p>
                  </div>
                )}

                {item.status === 'picked_up' && (
                  <button 
                    onClick={() => completePickup(item._id)}
                    className="btn btn-success"
                    style={{marginTop: '10px', width: '100%'}}
                  >
                    Mark as Completed
                  </button>
                )}
                
                <SellButton item={item} onSold={loadItems} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Items;