import React, { useState } from 'react';

export default function Auth({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: 'O+',
    cityCountry: 'Dhaka, Bangladesh',
    contact: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('lifelink_users') || '[]');

    if (isRegister) {
      const exists = users.find((u) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (exists) {
        setError('This email is already registered. Please login.');
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        bloodGroup: formData.bloodGroup,
        cityCountry: formData.cityCountry,
        contact: formData.contact,
        role: formData.role,
        donationCount: 0,
        availability: 'Available Today ✅'
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('lifelink_users', JSON.stringify(updatedUsers));
      localStorage.setItem('lifelink_current_user', JSON.stringify(newUser));
      onLoginSuccess(newUser);
    } else {
      const matched = users.find(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
      );

      if (!matched) {
        setError('Invalid email or password. Please register first if you do not have an account.');
        return;
      }

      localStorage.setItem('lifelink_current_user', JSON.stringify(matched));
      onLoginSuccess(matched);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'radial-gradient(circle at 20% 20%, #b71c1c 0%, #6d0707 48%, #2c0202 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 77, 77, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-60px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(231, 76, 60, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.97)',
          padding: '32px 28px',
          borderRadius: '14px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          width: '100%',
          maxWidth: '430px',
          borderTop: '6px solid #8b0000',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 10px auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c0392b, #7f0000)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              boxShadow: '0 4px 12px rgba(192, 57, 43, 0.4)'
            }}
          >
            🩸
          </div>
          <h1 style={{ color: '#8b0000', margin: '0 0 4px 0', fontSize: '28px', letterSpacing: '0.5px' }}>
            LifeLink
          </h1>
          <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>
            {isRegister ? 'Join the Emergency Blood Donor Network' : 'Every Drop Counts — Login to Save Lives'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', backgroundColor: '#f3eaea', padding: '4px', borderRadius: '8px' }}>
          <button type="button" onClick={() => { setIsRegister(false); setError(''); }} style={toggleBtnStyle(!isRegister)}>
            Login
          </button>
          <button type="button" onClick={() => { setIsRegister(true); setError(''); }} style={toggleBtnStyle(isRegister)}>
            Register
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fdecea', color: '#a93226', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '14px', fontWeight: 'bold', border: '1px solid #f5b7b1' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {isRegister && (
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type="text" name="name" required placeholder="Enter your full name" value={formData.name} onChange={handleChange} style={inputStyle} />
            </div>
          )}

          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" name="email" required placeholder="you@example.com" value={formData.email} onChange={handleChange} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Password *</label>
            <input type="password" name="password" required placeholder="Enter password" value={formData.password} onChange={handleChange} style={inputStyle} />
          </div>

          {isRegister && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Blood Group *</label>
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={inputStyle}>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Contact Number *</label>
                  <input type="text" name="contact" required placeholder="017XXXXXXXX" value={formData.contact} onChange={handleChange} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>City / Country *</label>
                  <input type="text" name="cityCountry" required placeholder="Dhaka, Bangladesh" value={formData.cityCountry} onChange={handleChange} style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Account Role *</label>
                  <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
                    <option value="user">User (Donor/Requester)</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #8b0000 0%, #c0392b 100%)',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '7px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: 'pointer',
              marginTop: '6px',
              boxShadow: '0 4px 12px rgba(139, 0, 0, 0.35)'
            }}
          >
            {isRegister ? '🩸 Create LifeLink Account' : '🔓 Login to LifeLink'}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px', color: '#3b1c1c' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d5c4c4', fontSize: '14px', boxSizing: 'border-box' };
const toggleBtnStyle = (active) => ({
  flex: 1,
  padding: '8px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '14px',
  backgroundColor: active ? '#8b0000' : 'transparent',
  color: active ? '#fff' : '#5c2b2b'
});