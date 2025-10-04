import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="container" style={{maxWidth: '400px', marginTop: '100px'}}>
      <div className="card">
        <h1 style={{color: '#007AFF', marginBottom: '10px'}}>Trash to Treasure</h1>
        <p style={{color: '#666', marginBottom: '30px'}}>Web Dashboard</p>
        
        {error && <div style={{color: 'red', marginBottom: '15px'}}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn" style={{width: '100%'}}>
            Login
          </button>
        </form>
        
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <p>Don't have an account? <Link to="/register" style={{color: '#007AFF'}}>Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;