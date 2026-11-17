import React, { useState } from 'react';

export default function Location({ currentLocation, onLocationUpdate }) {
  const [cityCountry, setCityCountry] = useState(currentLocation || 'Dhaka, Bangladesh');
  const [coords, setCoords] = useState({ latitude: 23.8103, longitude: 90.4125 });
  const [loading, setLoading] = useState(false);

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          const city = geoData.address?.city || geoData.address?.town || geoData.address?.state || 'Dhaka';
          const country = geoData.address?.country || 'Bangladesh';
          const formatted = `${city}, ${country}`;

          setCityCountry(formatted);
          if (onLocationUpdate) onLocationUpdate({ cityCountry: formatted, latitude, longitude });
        } catch {
          if (onLocationUpdate) onLocationUpdate({ cityCountry, latitude, longitude });
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        alert('Unable to access GPS location.');
      }
    );
  };

  const handleManualSave = (e) => {
    e.preventDefault();
    if (onLocationUpdate) onLocationUpdate({ cityCountry, ...(coords || {}) });
    alert('📍 Location updated!');
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderTop: '4px solid #c0392b' }}>
      <h3 style={{ color: '#2c3e50', marginTop: 0, marginBottom: '12px', fontSize: '16px' }}>
        📍 Live Donor & Hospital Map
      </h3>

      <iframe
        title="Live Location Map"
        width="100%"
        height="280"
        style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.longitude - 0.03}%2C${coords.latitude - 0.03}%2C${coords.longitude + 0.03}%2C${coords.latitude + 0.03}&layer=mapnik&marker=${coords.latitude}%2C${coords.longitude}`}
      />

      <form onSubmit={handleManualSave} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          type="text"
          value={cityCountry}
          onChange={(e) => setCityCountry(e.target.value)}
          placeholder="City, Country"
          style={{ width: '100%', padding: '9px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '13px' }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="submit"
            style={{ flex: 1, backgroundColor: '#2980b9', color: '#fff', border: 'none', padding: '9px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            Save Location
          </button>
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={loading}
            style={{ flex: 1, backgroundColor: '#27ae60', color: '#fff', border: 'none', padding: '9px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
          >
            {loading ? '📡 Locating...' : '🎯 Use GPS'}
          </button>
        </div>
      </form>
    </div>
  );
}