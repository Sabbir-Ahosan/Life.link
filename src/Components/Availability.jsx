import React, { useState, useEffect } from 'react';

export default function Availability({ initialStatus = 'Not Answered', onStatusChange }) {
  const [status, setStatus] = useState(initialStatus);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialStatus) {
      setStatus(initialStatus);
    }
  }, [initialStatus]);

  const handleSelect = (newStatus) => {
    setStatus(newStatus);
    setIsOpen(false);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div style={{ marginBottom: '12px', textAlign: 'right' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#fff',
          color: '#2c3e50',
          border: '1px solid #e0e0e0',
          padding: '6px 14px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
        }}
      >
        🩺 Donor Status:{' '}
        <span style={{ color: status.includes('Available Today') ? '#27ae60' : '#c0392b' }}>
          {status}
        </span>{' '}
        {isOpen ? '▲' : '▾'}
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '8px',
            backgroundColor: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            textAlign: 'left',
            borderLeft: '4px solid #2980b9'
          }}
        >
          <span style={{ fontSize: '13px', color: '#2c3e50', fontWeight: 'bold' }}>
            Are you available to donate blood today?
          </span>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => handleSelect('Available Today ✅')} style={btnStyle('#27ae60')}>
              ✅ Available Today
            </button>
            <button type="button" onClick={() => handleSelect('Emergency Only 🚨')} style={btnStyle('#e67e22')}>
              🚨 Emergency Only
            </button>
            <button type="button" onClick={() => handleSelect('Not Available ❌')} style={btnStyle('#7f8c8d')}>
              ❌ Not Available
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = (bg) => ({
  backgroundColor: bg,
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px'
});