import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { itemService } from '../services/api';

function Profile() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await itemService.getUserItems();
      const userItems = response.data;
      setItems(userItems);
      
      // Calculate achievements
      const totalValue = userItems.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);
      const completedItems = userItems.filter(item => item.status === 'completed').length;
      
      const userAchievements = [];
      if (userItems.length >= 1) userAchievements.push({ title: 'SDG 12: Responsible Consumption', icon: '♻️', desc: 'Promoting sustainable consumption patterns' });
      if (userItems.length >= 3) userAchievements.push({ title: 'SDG 11: Sustainable Cities', icon: '🏙️', desc: 'Building sustainable communities' });
      if (completedItems >= 1) userAchievements.push({ title: 'SDG 8: Decent Work', icon: '💼', desc: 'Supporting economic growth through upcycling' });
      if (totalValue >= 100) userAchievements.push({ title: 'SDG 1: No Poverty', icon: '🤝', desc: 'Creating economic opportunities' });
      if (userItems.length >= 5) userAchievements.push({ title: 'SDG 13: Climate Action', icon: '🌍', desc: 'Taking action against climate change' });
      
      setAchievements(userAchievements);
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const getCategoryStats = () => {
    const categories = {};
    items.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    return Object.entries(categories).sort((a, b) => b[1] - a[1]);
  };

  const totalEarnings = items.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);
  const completedPickups = items.filter(item => item.status === 'completed').length;
  const categoryStats = getCategoryStats();

  return (
    <div>
      <div className="header">
        <h1>Profile</h1>
        <div className="nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/items">Items</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/partners">Partners</Link>
          <button onClick={logout} className="btn">Logout</button>
        </div>
      </div>

      <div className="container">
        <div className="card" style={{marginBottom: '20px'}}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#006400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
              marginRight: '20px'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div style={{flex: 1}}>
              <h2 style={{margin: '0'}}>{user?.name}</h2>
              <p style={{margin: '5px 0', color: '#666'}}>{user?.email}</p>
              <p style={{margin: '0', fontSize: '14px', color: '#999'}}>
                {user?.name} • Member since {new Date().toLocaleDateString()}
              </p>
            </div>
            <button className="btn" style={{
              background: '#006400',
              color: 'white',
              padding: '8px 16px',
              fontSize: '14px',
              alignSelf: 'flex-start'
            }}>
              Edit Profile
            </button>
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="stat-number" style={{color: '#006400'}}>{items.length}</div>
              <div className="stat-label">Items Submitted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{color: '#006400'}}>{completedPickups}</div>
              <div className="stat-label">Completed Pickups</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{color: '#006400'}}>₹{totalEarnings}</div>
              <div className="stat-label">Total Value</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{color: '#006400'}}>{user?.tokens || 0}</div>
              <div className="stat-label">Tokens Earned</div>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <h3>🎯 SDGS IMPLEMENTED</h3>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <span style={{fontSize: '24px', marginRight: '15px'}}>♻️</span>
                <div>
                  <h4 style={{margin: '0'}}>SDG 12: Responsible Consumption</h4>
                  <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                    Promoting sustainable consumption and production patterns
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <span style={{fontSize: '24px', marginRight: '15px'}}>🏙️</span>
                <div>
                  <h4 style={{margin: '0'}}>SDG 11: Sustainable Cities</h4>
                  <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                    Making cities inclusive, safe, resilient and sustainable
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <span style={{fontSize: '24px', marginRight: '15px'}}>💼</span>
                <div>
                  <h4 style={{margin: '0'}}>SDG 8: Decent Work</h4>
                  <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                    Promoting sustained economic growth and employment
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <span style={{fontSize: '24px', marginRight: '15px'}}>🌍</span>
                <div>
                  <h4 style={{margin: '0'}}>SDG 13: Climate Action</h4>
                  <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                    Taking urgent action to combat climate change
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>📊 Category Breakdown</h3>
            {categoryStats.length === 0 ? (
              <p style={{color: '#666', textAlign: 'center', padding: '20px'}}>
                No items submitted yet
              </p>
            ) : (
              <div>
                {categoryStats.map(([category, count]) => (
                  <div key={category} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{textTransform: 'capitalize'}}>{category}</span>
                    <span style={{
                      background: '#006400',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3>🌱 Environmental Impact</h3>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '48px', marginBottom: '10px'}}>🌍</div>
              <p><strong>{items.length}</strong> items diverted from landfill</p>
              <p><strong>₹{totalEarnings}</strong> value returned to economy</p>
              <p><strong>{Math.round(items.length * 2.5)}kg</strong> estimated waste saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;