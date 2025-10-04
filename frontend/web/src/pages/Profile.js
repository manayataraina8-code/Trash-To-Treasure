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
      if (userItems.length >= 1) userAchievements.push({ title: 'First Item', icon: '🌟', desc: 'Submitted your first item' });
      if (userItems.length >= 5) userAchievements.push({ title: 'Eco Warrior', icon: '♻️', desc: 'Submitted 5+ items' });
      if (completedItems >= 1) userAchievements.push({ title: 'First Pickup', icon: '🚚', desc: 'Completed your first pickup' });
      if (totalValue >= 100) userAchievements.push({ title: 'Value Creator', icon: '💰', desc: 'Generated $100+ in value' });
      
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
              background: '#007AFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
              marginRight: '20px'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{margin: '0'}}>{user?.name}</h2>
              <p style={{margin: '5px 0', color: '#666'}}>{user?.email}</p>
              <p style={{margin: '0', fontSize: '14px', color: '#999'}}>
                Member since {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">{items.length}</div>
              <div className="stat-label">Items Submitted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{completedPickups}</div>
              <div className="stat-label">Completed Pickups</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">₹{totalEarnings}</div>
              <div className="stat-label">Total Value</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{user?.tokens || 0}</div>
              <div className="stat-label">Tokens Earned</div>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="card">
            <h3>🏆 Achievements</h3>
            {achievements.length === 0 ? (
              <p style={{color: '#666', textAlign: 'center', padding: '20px'}}>
                Start submitting items to unlock achievements!
              </p>
            ) : (
              <div>
                {achievements.map((achievement, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '10px'
                  }}>
                    <span style={{fontSize: '24px', marginRight: '15px'}}>
                      {achievement.icon}
                    </span>
                    <div>
                      <h4 style={{margin: '0'}}>{achievement.title}</h4>
                      <p style={{margin: '0', fontSize: '14px', color: '#666'}}>
                        {achievement.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                      background: '#007AFF',
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