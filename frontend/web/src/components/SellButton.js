import React from 'react';
import { api } from '../services/api';

function SellButton({ item, onSold }) {
  const markAsSold = async () => {
    const buyerEmail = prompt('Enter buyer\'s email address:');
    if (!buyerEmail) return;
    
    try {
      const response = await api.post('/items/mark-sold', {
        itemId: item._id,
        buyerEmail
      });
      
      alert(`Item sold! You earned ${response.data.tokensEarned} tokens.`);
      onSold();
    } catch (error) {
      alert('Failed to mark item as sold');
    }
  };

  if (item.status !== 'available') return null;

  return (
    <button 
      onClick={markAsSold}
      className="btn btn-success"
      style={{marginTop: '10px', width: '100%'}}
    >
      💰 Mark as Sold
    </button>
  );
}

export default SellButton;