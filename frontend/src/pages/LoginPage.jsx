import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!pin || pin.length < 4 || pin.length > 6 || !/^\d+$/.test(pin)) {
      setError('Please enter a valid 4-6 digit PIN');
      setLoading(false);
      return;
    }

    const result = await login(pin);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'Invalid PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>For Ananya 💖</h1>
          <p>Enter our special PIN, babyji.</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="pin-input-container">
            <input
              type="password"
              inputMode="numeric"
              maxLength="6"
              value={pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setPin(value);
                setError('');
              }}
              placeholder="Enter PIN"
              className="pin-input"
              autoFocus
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Entering...' : 'Let me in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

