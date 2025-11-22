import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SecretPage.css';
import { verifySecretCode } from '../utils/api';
import { logEvent } from '../utils/api';

const SecretPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await verifySecretCode(code);
    setLoading(false);

    if (result.success) {
      setIsUnlocked(true);
      logEvent('secret_page_success');
    } else {
      setError(result.message || 'Incorrect code. Please try again.');
      logEvent('secret_page_unlock_attempt', { success: false });
      setCode('');
    }
  };

  // Placeholder long letter
  const letter = `My Dearest Ananya,

This is a space I created just for you. A secret place where I can say things I might not say out loud every day.

If you're reading this, it means you found it. And that makes me smile, because I know you were curious enough to discover it.

I want you to know something - every day with you feels like a gift. Every call, every message, every moment we share, it all matters more to me than I can express.

There are days when I'm difficult, I know. There are moments when I might not be the best version of myself. But even then, you choose to stay. You choose to be patient. You choose to love me anyway.

That means everything to me, babyji.

This website, this whole thing - it's my way of showing you how much you mean to me. It's my way of creating something beautiful just for you, something that lasts.

I hope when you look back at this in years to come, you'll remember how much I loved you today, and how grateful I am that you're in my life.

Thank you for this year. Thank you for choosing me. Thank you for being you.

I love you, Ananya. Always.

Forever yours,
Luvsingh

P.S. - Keep this secret safe, just like we keep our memories safe in our hearts. 💖`;

  return (
    <div className="secret-page">
      {!isUnlocked ? (
        <div className="secret-login">
          <div className="secret-card">
            <h1>Secret Page 💖</h1>
            <p>You found something special, babyji. Enter the secret code to continue.</p>
            <form onSubmit={handleSubmit} className="secret-form">
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                placeholder="Enter secret code"
                className="secret-input"
                autoFocus
              />
              {error && <div className="error-message">{error}</div>}
              <button 
                type="submit" 
                className="secret-button"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Unlock'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="secret-content">
          <div className="letter-container">
            <button className="back-button" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
            <div className="letter-content">
              <pre className="letter-text">{letter}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretPage;

