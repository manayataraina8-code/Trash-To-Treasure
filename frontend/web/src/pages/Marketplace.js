import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { api } from '../services/api';

function Marketplace() {
  const { logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  const loadMarketplaceItems = async () => {
    try {
      const response = await api.get('/items/marketplace');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to load marketplace items:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactSeller = async (itemId, sellerEmail) => {
    try {
      await api.post('/items/contact-seller', { itemId });
      window.open(`mailto:${sellerEmail}?subject=Interest in your item&body=Hi, I'm interested in buying your item from Trash to Treasure marketplace.`);
    } catch (error) {
      console.error('Failed to contact seller:', error);
    }
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  if (loading) return <div className="container">Loading marketplace...</div>;

  return (
    <div>
      <div className="header">
        <h1>Marketplace</h1>
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
          <h2>Available Items ({filteredItems.length})</h2>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{padding: '8px', borderRadius: '5px', border: '1px solid #ddd'}}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            <option value="kitchenware">Kitchenware</option>
          </select>
        </div>

        {filteredItems.length === 0 ? (
          <div className="card" style={{textAlign: 'center', padding: '40px'}}>
            <h3>No items available</h3>
            <p>Be the first to list an item in the marketplace!</p>
          </div>
        ) : (
          <div className="grid">
            {filteredItems.map(item => (
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
                      background: '#007AFF',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  >
                    Available
                  </span>
                </div>
                
                <div style={{marginTop: '15px', fontSize: '14px', color: '#666'}}>
                  <p>📍 {item.location?.address || 'Location available'}</p>
                  <p>📅 Listed {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p>👤 Seller: {item.sellerName}</p>
                </div>

                <button 
                  onClick={() => contactSeller(item._id, item.sellerEmail)}
                  className="btn"
                  style={{marginTop: '15px', width: '100%'}}
                >
                  💬 Contact Seller
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;