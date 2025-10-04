import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { itemService } from '../services/api';
import ImageUpload from '../components/ImageUpload';
import ItemModal from '../components/ItemModal';

function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalItems: 0,
    totalEarnings: 0,
    activePickups: 0,
    tokens: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [classifiedItem, setClassifiedItem] = useState(null);
  const [matchedPartners, setMatchedPartners] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await itemService.getUserItems();
      const items = response.data;
      
      setStats({
        totalItems: items.length,
        totalEarnings: items.reduce((sum, item) => sum + (item.estimatedValue || 0), 0),
        activePickups: items.filter(item => item.status === 'matched').length,
        tokens: user?.tokens || 0
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleItemClassified = (data) => {
    setClassifiedItem(data.item);
    setMatchedPartners(data.matchingPartners || []);
    setShowModal(true);
  };

  const handlePickupScheduled = () => {
    loadStats();
  };

  return (
    <div>
      <div className="header">
        <h1>Trash to Treasure Dashboard</h1>
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
        <h2>Welcome back, {user?.name}!</h2>
        
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{stats.totalItems}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">₹{stats.totalEarnings}</div>
            <div className="stat-label">Total Earnings</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.activePickups}</div>
            <div className="stat-label">Active Pickups</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.tokens}</div>
            <div className="stat-label">Tokens</div>
          </div>
        </div>

        <div className="grid">
          <ImageUpload onItemClassified={handleItemClassified} />
          
          <div className="card">
            <h3>Quick Actions</h3>
            <Link to="/items" className="btn" style={{marginRight: '10px'}}>
              View My Items
            </Link>
            <Link to="/partners" className="btn btn-success">
              Find Partners
            </Link>
          </div>
          
          <div className="card">
            <h3>How It Works</h3>
            <div style={{textAlign: 'left'}}>
              <p>📷 1. Take a photo of your item</p>
              <p>🤖 2. AI classifies and values it</p>
              <p>🤝 3. Get matched with local partners</p>
              <p>🪙 4. Earn tokens when picked up</p>
            </div>
          </div>
        </div>

        {showModal && (
          <ItemModal
            item={classifiedItem}
            partners={matchedPartners}
            onClose={() => setShowModal(false)}
            onScheduled={handlePickupScheduled}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;