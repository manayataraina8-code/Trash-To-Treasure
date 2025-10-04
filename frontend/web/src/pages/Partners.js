import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { partnerService } from '../services/api';

function Partners() {
  const { logout } = useAuth();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: 18.5204, lng: 73.8567 }); // Default Pune
  const [radius, setRadius] = useState(200); // Cover all Maharashtra
  const [partnerType, setPartnerType] = useState('all');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          loadPartners(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to default location
          loadPartners(location.lat, location.lng);
        }
      );
    } else {
      loadPartners(location.lat, location.lng);
    }
  };

  const loadPartners = async (lat = location.lat, lng = location.lng) => {
    setLoading(true);
    try {
      const response = await partnerService.getNearbyPartners(lat, lng, radius);
      let filteredPartners = response.data;
      
      if (partnerType !== 'all') {
        filteredPartners = response.data.filter(partner => partner.type === partnerType);
      }
      
      setPartners(filteredPartners);
    } catch (error) {
      console.error('Failed to load partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPartnerTypeColor = (type) => {
    const colors = {
      upcycler: '#007AFF',
      ngo: '#34C759',
      maker: '#FF9500'
    };
    return colors[type] || '#666';
  };

  const getPartnerTypeIcon = (type) => {
    const icons = {
      upcycler: '♻️',
      ngo: '🤝',
      maker: '🔨'
    };
    return icons[type] || '🏢';
  };

  return (
    <div>
      <div className="header">
        <h1>Partners</h1>
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
        <div className="card" style={{marginBottom: '20px', background: 'rgba(255, 255, 255, 0.9)', border: '2px solid #007AFF'}}>
          <h3 style={{color: '#007AFF', marginBottom: '20px'}}>🔍 Find Partners Near You</h3>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '15px', alignItems: 'end'}}>
            <div className="form-group" style={{margin: 0}}>
              <label style={{color: '#333', fontSize: '14px', fontWeight: '600'}}>📍 Search Radius</label>
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '16px',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              >
                <option value="5">5 km - Nearby</option>
                <option value="10">10 km - Local Area</option>
                <option value="15">15 km - Extended Area</option>
                <option value="25">25 km - Greater Pune</option>
                <option value="50">50 km - Regional</option>
                <option value="200">200 km - All Maharashtra</option>
              </select>
            </div>
            
            <div className="form-group" style={{margin: 0}}>
              <label style={{color: '#333', fontSize: '14px', fontWeight: '600'}}>🏢 Partner Type</label>
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e9ecef',
                  borderRadius: '25px',
                  fontSize: '16px',
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007AFF'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              >
                <option value="all">All Types</option>
                <option value="upcycler">♻️ Upcyclers</option>
                <option value="ngo">🤝 NGOs</option>
                <option value="maker">🔨 Makers</option>
              </select>
            </div>
            
            <button 
              onClick={() => loadPartners()}
              className="btn"
              disabled={loading}
              style={{
                padding: '12px 25px',
                borderRadius: '25px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
            >
              {loading ? '🔄 Searching...' : '🔍 Search'}
            </button>
          </div>
          
          <div style={{marginTop: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '10px', fontSize: '14px', color: '#666'}}>
            💡 <strong>Tip:</strong> Larger radius finds more partners but may be farther from you
          </div>
        </div>

        <h2>Available Partners ({partners.length})</h2>
        
        {loading ? (
          <div className="card" style={{textAlign: 'center', padding: '40px'}}>
            <p>Finding partners near you...</p>
          </div>
        ) : partners.length === 0 ? (
          <div className="card" style={{textAlign: 'center', padding: '40px'}}>
            <h3>No partners found</h3>
            <p>Try increasing the search radius or check back later.</p>
          </div>
        ) : (
          <div className="grid">
            {partners.map(partner => (
              <div key={partner._id} className="card">
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                  <span style={{fontSize: '24px', marginRight: '10px'}}>
                    {getPartnerTypeIcon(partner.type)}
                  </span>
                  <div>
                    <h3 style={{margin: '0'}}>{partner.name}</h3>
                    <span 
                      style={{
                        background: getPartnerTypeColor(partner.type),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {partner.type}
                    </span>
                  </div>
                </div>

                <div style={{marginBottom: '15px'}}>
                  <p style={{margin: '5px 0', fontSize: '14px', color: '#666'}}>
                    📧 {partner.email}
                  </p>
                  {partner.phone && (
                    <p style={{margin: '5px 0', fontSize: '14px', color: '#666'}}>
                      📞 {partner.phone}
                    </p>
                  )}
                  <p style={{margin: '5px 0', fontSize: '14px', color: '#666'}}>
                    📍 {partner.location?.address || `${partner.radius}km radius`}
                  </p>
                </div>

                <div style={{marginBottom: '15px'}}>
                  <p style={{margin: '5px 0', fontSize: '14px', fontWeight: 'bold'}}>
                    Accepts:
                  </p>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                    {partner.acceptedCategories?.map(category => (
                      <span 
                        key={category}
                        style={{
                          background: '#f0f0f0',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          textTransform: 'capitalize'
                        }}
                      >
                        {category}
                      </span>
                    )) || <span style={{fontSize: '12px', color: '#666'}}>All categories</span>}
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{color: '#FFD700'}}>⭐</span>
                    <span style={{marginLeft: '5px', fontSize: '14px'}}>
                      {partner.rating || 5.0}/5.0
                    </span>
                  </div>
                  <button 
                    className="btn"
                    onClick={() => window.open(`mailto:${partner.email}`, '_blank')}
                  >
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Partners;