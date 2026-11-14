import React, { useState } from 'react';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' বা 'email'
  const [otpSent, setOtpSent] = useState(false);

  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState(''); // ফোন নম্বর অথবা জিমেইল রাখবে
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [otp, setOtp] = useState('');

  // ফোন বা জিমেইল ট্যাব পরিবর্তন করলে ইনপুট রিসেট হবে
  const switchMethod = (method) => {
    setAuthMethod(method);
    setContact('');
    setOtpSent(false);
    setOtp('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      alert(`OTP sent to your ${authMethod === 'phone' ? 'Phone' : 'Gmail'}: ${contact}`);
    } else {
      alert('Authentication Successful!');
      onLoginSuccess({
        name: fullName || 'Donor User',
        contact,
        authMethod,
        bloodGroup
      });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#c0392b', marginTop: 0, textAlign: 'center' }}>
        {isLogin ? '🔑 LifeLink Login' : '📝 Register Donor Account'}
      </h2>

      {/* Phone অথবা Gmail বেছে নেওয়ার টগল বাটন */}
      <div style={{ display: 'flex', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
        <button
          type="button"
          onClick={() => switchMethod('phone')}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: authMethod === 'phone' ? '#c0392b' : '#f4f6f7',
            color: authMethod === 'phone' ? '#fff' : '#333'
          }}
        >
          📱 Phone Number
        </button>
        <button
          type="button"
          onClick={() => switchMethod('email')}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: authMethod === 'email' ? '#c0392b' : '#f4f6f7',
            color: authMethod === 'email' ? '#fff' : '#333'
          }}
        >
          ✉️ Gmail
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* রেজিস্ট্রেশনের সময় নাম ও ব্লাড গ্রুপ দেখাবে */}
        {!isLogin && (
          <>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Blood Group:</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </>
        )}

        {/* সিলেক্ট করা মেথড অনুযায়ী Phone অথবা Gmail ইনপুট */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
            {authMethod === 'phone' ? 'Phone Number:' : 'Gmail Address:'}
          </label>
          <input
            type={authMethod === 'phone' ? 'tel' : 'email'}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder={authMethod === 'phone' ? '017XXXXXXXX' : 'example@gmail.com'}
            required
            disabled={otpSent}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* OTP ইনপুট বক্স */}
        {otpSent && (
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
              Enter 6-Digit OTP ({authMethod === 'phone' ? 'SMS' : 'Gmail'}):
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{ width: '100%', backgroundColor: '#c0392b', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '4px' }}
        >
          {otpSent ? 'Verify OTP & Enter' : (isLogin ? 'Send Login OTP' : 'Send Registration OTP')}
        </button>
      </form>

      <p
        onClick={() => { setIsLogin(!isLogin); setOtpSent(false); setOtp(''); }}
        style={{ color: '#2980b9', cursor: 'pointer', marginTop: '15px', textAlign: 'center', fontSize: '14px' }}
      >
        {isLogin ? "Don't have an account? Register" : "Already registered? Login"}
      </p>
    </div>
  );
}