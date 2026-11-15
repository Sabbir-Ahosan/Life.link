import React from 'react';

export default function DonorDashboard({
  userAvailability,
  user,
  requests = [],
  collaborations = [],
  onAcceptDonate,
  onUpdateProgress,
  onOpenChat
}) {
  const matchingAlerts = requests.filter(
    (r) => r.status !== 'Completed' && r.status !== 'Cancelled'
  );

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#c0392b', marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        🩸 Global Donor Dashboard
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={cardStyle('#fdecea', '#c0392b')}>
          <small>Donor Profile</small>
          <h3 style={{ margin: '5px 0' }}>{user?.name} ({user?.bloodGroup})</h3>
        </div>
        <div style={cardStyle('#eafaf1', '#27ae60')}>
          <small>Availability Status</small>
          <h3 style={{ margin: '5px 0' }}>{userAvailability}</h3>
        </div>
        <div style={cardStyle('#ebf5fb', '#2980b9')}>
          <small>Emergency Alerts</small>
          <h3 style={{ margin: '5px 0' }}>{matchingAlerts.length} Request(s)</h3>
        </div>
      </div>

      <h3 style={{ color: '#c0392b' }}>🔔 Emergency Blood Alerts ({matchingAlerts.length})</h3>
      {matchingAlerts.map((req) => (
        <div
          key={req.id}
          style={{
            border: '1px solid #f5b7b1',
            backgroundColor: '#fef9e7',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div>
            <strong>Patient: {req.patient} ({req.bloodGroup})</strong>
            <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>
              🏥 Hospital: {req.hospital} ({req.location})
            </div>
          </div>
          <button
            onClick={() => onAcceptDonate(req)}
            style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            🩸 Accept & Start Live Chat
          </button>
        </div>
      ))}

      <h3 style={{ color: '#2c3e50', marginTop: '20px' }}>🤝 Active Blood Donation Missions</h3>
      {collaborations.length === 0 ? (
        <p style={{ color: '#777', fontSize: '14px' }}>
          No active missions yet. Go to <strong>Feed</strong> and click <strong>"I Will Donate"</strong> on any request.
        </p>
      ) : (
        collaborations.map((collab) => (
          <div key={collab.requestId} style={{ border: '1px solid #ddd', borderRadius: '6px', padding: '15px', marginBottom: '12px', backgroundColor: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <strong>Patient: {collab.patient} ({collab.bloodGroup})</strong>
                <div style={{ fontSize: '13px', color: '#555' }}>🏥 {collab.hospital} • {collab.location}</div>
                <div style={{ fontSize: '13px', color: '#27ae60', fontWeight: 'bold', marginTop: '4px' }}>
                  Current Status: {collab.progress}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button onClick={() => onUpdateProgress(collab.requestId, 'On The Way 🚗')} style={progBtn('#e67e22')}>
                  🚗 On The Way
                </button>
                <button onClick={() => onUpdateProgress(collab.requestId, 'Reached Hospital 🏥')} style={progBtn('#2980b9')}>
                  🏥 Reached Hospital
                </button>
                <button onClick={() => onUpdateProgress(collab.requestId, 'Donated ✅')} style={progBtn('#27ae60')}>
                  ✅ Mark Donated
                </button>
                <button onClick={() => onOpenChat(collab)} style={progBtn('#8e44ad')}>
                  💬 Chat
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const cardStyle = (bg, borderColor) => ({
  backgroundColor: bg,
  borderLeft: `5px solid ${borderColor}`,
  padding: '15px',
  borderRadius: '6px'
});

const progBtn = (bg) => ({
  backgroundColor: bg,
  color: 'white',
  border: 'none',
  padding: '7px 11px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '12px'
});