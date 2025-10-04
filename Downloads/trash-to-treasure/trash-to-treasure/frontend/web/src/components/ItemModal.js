import React from 'react';
import { pickupService } from '../services/api';

function ItemModal({ item, partners, onClose, onScheduled }) {
  const schedulePickup = async (partnerId) => {
    try {
      await pickupService.schedulePickup(item._id, partnerId);
      alert('Pickup scheduled successfully!');
      onScheduled();
      onClose();
    } catch (error) {
      alert('Failed to schedule pickup');
    }
  };

  if (!item) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Item Classified! 🎉</h2>
          <button 
            onClick={onClose}
            style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}}
          >
            ×
          </button>
        </div>

        <div className="card" style={{marginBottom: '20px'}}>
          <h3 style={{textTransform: 'capitalize', color: '#007AFF'}}>{item.category}</h3>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p><strong>Estimated Value:</strong> <span style={{color: '#34C759', fontSize: '18px'}}>${item.estimatedValue}</span></p>
          <p><strong>Potential Tokens:</strong> {Math.floor(item.estimatedValue * 0.1)} 🪙</p>
        </div>

        <h3>Available Partners ({partners.length})</h3>
        
        {partners.length === 0 ? (
          <div className="card" style={{textAlign: 'center', padding: '20px'}}>
            <p>No partners available for this item type in your area.</p>
            <p style={{fontSize: '14px', color: '#666'}}>Try again later or check nearby areas.</p>
          </div>
        ) : (
          <div style={{maxHeight: '300px', overflow: 'auto'}}>
            {partners.map(partner => (
              <div key={partner._id} className="card" style={{marginBottom: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h4 style={{margin: '0 0 5px 0'}}>{partner.name}</h4>
                    <p style={{margin: '0', fontSize: '14px', color: '#666', textTransform: 'uppercase'}}>
                      {partner.type}
                    </p>
                    <p style={{margin: '5px 0 0 0', fontSize: '12px', color: '#999'}}>
                      📍 {partner.radius}km radius
                    </p>
                  </div>
                  <button 
                    onClick={() => schedulePickup(partner._id)}
                    className="btn btn-success"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <button onClick={onClose} className="btn" style={{background: '#666'}}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;