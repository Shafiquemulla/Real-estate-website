import React, { useState } from 'react';
import { X, User, CheckCircle2 } from 'lucide-react';

export default function UserModal({ onClose, onShowToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(() => {
    return localStorage.getItem('dreamhomes_user') || '';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const username = email.split('@')[0] || 'Member';
      localStorage.setItem('dreamhomes_user', username);
      setLoggedInUser(username);
      if (onShowToast) onShowToast(`Welcome back, ${username}!`);
      setTimeout(() => onClose(), 800);
    } else {
      localStorage.setItem('dreamhomes_user', name);
      setLoggedInUser(name);
      if (onShowToast) onShowToast(`Account created successfully! Welcome, ${name}!`);
      setTimeout(() => onClose(), 800);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dreamhomes_user');
    setLoggedInUser('');
    if (onShowToast) onShowToast('You have been logged out.');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-body-padded" style={{ padding: '32px' }}>
          {loggedInUser ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--navy-900), var(--navy-700))',
                color: 'var(--yellow-400)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '28px',
                fontWeight: 800
              }}>
                {loggedInUser.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '4px' }}>
                Hello, {loggedInUser}!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
                DreamHomes Verified Member & Investor
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left',
                marginBottom: '24px',
                fontSize: '13px',
                color: 'var(--text-secondary)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, marginBottom: '6px' }}>
                  <CheckCircle2 size={16} /> Status: VIP Access Active
                </div>
                <div>Enjoy priority property alerts and direct broker messaging.</div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#f1f5f9',
                  color: '#ef4444',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px'
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: 'var(--yellow-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <User size={26} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--navy-900)' }}>
                  {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
                  {isLogin ? 'Sign in to access your saved homes and alerts' : 'Register for VIP access to off-market listings'}
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {!isLogin && (
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn-submit" style={{ marginTop: '8px' }}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ color: 'var(--navy-900)', fontWeight: 700 }}
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
