import React from 'react';

export default function Certificate({ user }) {
  const certId = `LL-${String(user?.id || '2026').slice(-6).toUpperCase()}`;
  const donationCount = user?.donationCount || 0;

  return (
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ color: '#8b0000', margin: 0 }}>🏆 Official Blood Donation Certificate</h2>
        <button
          onClick={() => window.print()}
          style={{
            background: 'linear-gradient(90deg, #8b0000, #b8860b)',
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          🖨️ Print / Save Certificate
        </button>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #fdfbf5 0%, #f8efd4 50%, #fdfbf5 100%)',
          border: '12px double #b8860b',
          outline: '3px solid #8b0000',
          outlineOffset: '-18px',
          borderRadius: '8px',
          padding: '44px 36px',
          position: 'relative',
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: '#2c221e',
          boxShadow: 'inset 0 0 40px rgba(184, 134, 11, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: '20px',
              backgroundColor: '#8b0000',
              color: '#f9e79f',
              fontSize: '12px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontFamily: 'Arial, sans-serif',
              marginBottom: '10px'
            }}
          >
            🩸 LIFELINK HUMANITARIAN AWARD
          </div>

          <h1
            style={{
              color: '#8b0000',
              margin: '4px 0',
              fontSize: '34px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textShadow: '1px 1px 0px rgba(184, 134, 11, 0.35)'
            }}
          >
            Certificate of Honor
          </h1>

          <div
            style={{
              width: '180px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
              margin: '10px auto 0 auto'
            }}
          />
        </div>

        <div
          style={{
            marginLeft: '32%',
            paddingLeft: '18px',
            borderLeft: '4px solid #b8860b',
            textAlign: 'left',
            marginTop: '24px',
            marginBottom: '24px'
          }}
        >
          <p style={{ fontSize: '14px', fontStyle: 'italic', color: '#6e471b', margin: '0 0 4px 0' }}>
            Proudly Awarded To
          </p>

          <h2
            style={{
              fontSize: '32px',
              color: '#1f1612',
              margin: '0 0 10px 0',
              borderBottom: '2px solid #8b0000',
              paddingBottom: '6px',
              display: 'inline-block',
              minWidth: '260px'
            }}
          >
            {user?.name || 'Valued Blood Donor'}
          </h2>

          <div style={{ marginTop: '8px', marginBottom: '12px' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#8b0000',
                color: '#fff',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                border: '1px solid #b8860b'
              }}
            >
              🏅 Total Blood Donated: {donationCount} {donationCount === 1 ? 'Time' : 'Times'} • Group ({user?.bloodGroup || 'O+'})
            </span>
          </div>

          <p style={{ fontSize: '15px', color: '#3b2f2a', lineHeight: '1.7', margin: 0 }}>
            In sincere recognition of your noble contribution to humanity by voluntarily donating blood{' '}
            <strong style={{ color: '#8b0000' }}>
              {donationCount} {donationCount === 1 ? 'Time' : 'Times'}
            </strong>{' '}
            through the <strong>LifeLink Emergency Network</strong>. Your selfless act has directly helped save precious human lives.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginTop: '44px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(184, 134, 11, 0.4)'
          }}
        >
          <div style={{ textAlign: 'center', minWidth: '180px' }}>
            <div
              style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontSize: '28px',
                color: '#1a2530',
                marginBottom: '2px'
              }}
            >
              Sabbir
            </div>
            <div style={{ borderTop: '1.5px solid #5c4033', paddingTop: '6px' }}>
              <strong style={{ fontSize: '15px', color: '#1f1612', display: 'block' }}>Sabbir</strong>
              <span style={{ fontSize: '12px', color: '#7a5230', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                Chief Executive Officer (CEO)
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                margin: '0 auto',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f9e79f 0%, #d4af37 65%, #9a7d0a 100%)',
                border: '3px double #8b0000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5b0000',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
              }}
            >
              <span style={{ fontSize: '18px' }}>🩸</span>
              <span style={{ fontSize: '9px', letterSpacing: '1px' }}>VERIFIED</span>
              <span style={{ fontSize: '8px' }}>{certId}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', minWidth: '180px' }}>
            <div
              style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontSize: '28px',
                color: '#1a2530',
                marginBottom: '2px'
              }}
            >
              Reaydhuzzaman
            </div>
            <div style={{ borderTop: '1.5px solid #5c4033', paddingTop: '6px' }}>
              <strong style={{ fontSize: '15px', color: '#1f1612', display: 'block' }}>Reaydhuzzaman</strong>
              <span style={{ fontSize: '12px', color: '#7a5230', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                Chairman, LifeLink
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}