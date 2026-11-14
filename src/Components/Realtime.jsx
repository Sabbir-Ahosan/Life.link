import React, { useState } from 'react';

export default function Realtime() {
  const [messages, setMessages] = useState([
    { sender: 'Requester', text: 'Apni ki Dhaka Medical-e ashte parben?' },
    { sender: 'You', text: 'Haan, ami 15 minute-er bhetor pouchacchi.' }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'You', text: inputText }]);
    setInputText('');
  };

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0, color: '#27ae60' }}>💬 Socket.IO Secure Private Chat (Privacy Protection Active)</h3>
      <div style={{ height: '200px', overflowY: 'auto', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '6px', marginBottom: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '8px', textAlign: msg.sender === 'You' ? 'right' : 'left' }}>
            <span style={{ fontSize: '12px', color: '#7f8c8d', display: 'block' }}>{msg.sender}</span>
            <span style={{ backgroundColor: msg.sender === 'You' ? '#27ae60' : '#e74c3c', color: 'white', padding: '6px 12px', borderRadius: '12px', display: 'inline-block' }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ display: 'flex', gap: '8px' }}>
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Write message..." style={{ flex: 1, padding: '8px' }} />
        <button type="submit" style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
}