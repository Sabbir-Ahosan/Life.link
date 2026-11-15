import React from 'react';

export default function RequesterDashboard({
  requests = [],
  collaborations = [],
  referrals = [],
  onMarkCompleted,
  onCancelRequest,
  onOpenChat
}) {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ color: '#2980b9', marginTop: 0, borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        🏥 Requester Dashboard (Collaboration & Live Donor Tracking)
      </h2>

      <h3 style={{ color: '#27ae60' }}>🤝 Active Collaborations & Live Donor Tracking ({collaborations.length})</h3>
      {collaborations.length === 0 ? (
        <p style={{ color: '#777', fontSize: '14px' }}>
          No donor has accepted a request yet. Once a donor clicks "I Will Donate", their live status will appear here.
        </p>
      ) : (
        collaborations.map((collab) => (
          <div
            key={collab.requestId}
            style={{
              backgroundColor: '#eafaf1',
              border: '1px solid #a9dfbf',
              borderLeft: '5px solid #27ae60',
              padding: '15px',
              borderRadius: '6px',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div>
              <strong>Patient: {collab.patient} ({collab.bloodGroup})</strong> • {collab.hospital}
              <div style={{ fontSize: '14px', color: '#1e8449', marginTop: '4px' }}>
                🩸 <strong>Donor:</strong> {collab.donorName} ({collab.donorPhone}) | 🚦 <strong>Live Progress:</strong> {collab.progress}
              </div>
            </div>
            <button
              onClick={() => onOpenChat(collab)}
              style={{ backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              💬 Coordinate in Chat
            </button>
          </div>
        ))
      )}

      <h3 style={{ color: '#2c3e50', marginTop: '20px' }}>📋 My Blood Requests ({requests.length})</h3>
      {requests.length === 0 ? (
        <p style={{ color: '#666', fontSize: '14px' }}>No active blood requests found.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: '1px solid #ddd',
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
              <strong style={{ fontSize: '16px' }}>Patient: {req.patient}</strong> —{' '}
              <span style={{ color: '#c0392b', fontWeight: 'bold' }}>{req.bloodGroup}</span>
              <div style={{ color: '#555', fontSize: '14px', marginTop: '4px' }}>
                Hospital: {req.hospital} ({req.location}) | Status: <strong>{req.status || 'Active'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => alert('🔔 Notification sent to nearby matching donors!')}
                style={{ backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
              >
                🔔 Notify Next Donor
              </button>
              {req.status !== 'Completed' && req.status !== 'Cancelled' && (
                <>
                  <button
                    onClick={() => onMarkCompleted(req.id)}
                    style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                  >
                    Mark Fulfilled
                  </button>
                  <button
                    onClick={() => onCancelRequest(req.id)}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {referrals.length > 0 && (
        <>
          <h3 style={{ color: '#8e44ad', marginTop: '20px' }}>🤝 Referred Friends ({referrals.length})</h3>
          {referrals.map((ref) => (
            <div key={ref.id} style={{ padding: '10px', backgroundColor: '#f4ecf7', borderRadius: '6px', marginBottom: '8px', fontSize: '14px' }}>
              👤 <strong>{ref.friendName}</strong> ({ref.friendPhone}) — Referred by {ref.referredBy}
            </div>
          ))}
        </>
      )}
    </div>
  );
}