import React, { useState, useEffect, useRef } from 'react';
import ChatBar from './Chatbar';

export default function Realtime({ currentUser, activeChatContext, onConfirmationSuccess }) {
  const chatKey = activeChatContext?.chatId || 'lifelink_general_chat';
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(chatKey) || '[]');
    if (saved.length === 0) {
      const initialMsg = [
        {
          id: 1,
          senderName: 'System Coordinator',
          text: `Connected for Patient: ${activeChatContext?.patient || 'Emergency Request'} (${activeChatContext?.bloodGroup || 'Blood'}). You can coordinate here.`,
          isSystem: true
        }
      ];
      setMessages(initialMsg);
      localStorage.setItem(chatKey, JSON.stringify(initialMsg));
    } else {
      setMessages(saved);
    }
  }, [chatKey, activeChatContext]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text) => {
    const newMsg = {
      id: Date.now(),
      senderName: currentUser?.name || 'You',
      text
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(chatKey, JSON.stringify(updated));
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const mapLink = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        handleSendMessage(`📍 My Live Location: ${mapLink}`);
      },
      () => {
        handleSendMessage(`📍 Current Location: ${currentUser?.cityCountry || 'On the way to hospital'}`);
      }
    );
  };

  const handleConfirmDonation = () => {
    alert('🎉 Donation Confirmed Successfully! Generating your Appreciation Certificate...');
    if (onConfirmationSuccess) {
      onConfirmationSuccess();
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
        <h3 style={{ color: '#27ae60', margin: 0 }}>
          💬 Donor-Patient Live Coordination Chat {activeChatContext ? `(${activeChatContext.patient})` : ''}
        </h3>

        <button
          onClick={handleConfirmDonation}
          style={{
            backgroundColor: '#c0392b',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          ✅ Confirm Donation Completed
        </button>
      </div>

      <div style={{ height: '270px', overflowY: 'auto', border: '1px solid #ddd', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
        {messages.map((msg) => {
          const isMe = msg.senderName === currentUser?.name;
          return (
            <div key={msg.id} style={{ textAlign: msg.isSystem ? 'center' : isMe ? 'right' : 'left', marginBottom: '12px' }}>
              {!msg.isSystem && (
                <small style={{ color: '#7f8c8d', display: 'block', marginBottom: '2px' }}>
                  {msg.senderName}
                </small>
              )}
              <span
                style={{
                  display: 'inline-block',
                  padding: '9px 14px',
                  borderRadius: '14px',
                  backgroundColor: msg.isSystem ? '#ecf0f1' : isMe ? '#27ae60' : '#2980b9',
                  color: msg.isSystem ? '#2c3e50' : 'white',
                  maxWidth: '75%',
                  textAlign: 'left',
                  fontSize: msg.isSystem ? '13px' : '14px',
                  wordBreak: 'break-word'
                }}
              >
                {msg.text}
              </span>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <ChatBar onSendMessage={handleSendMessage} onShareLocation={handleShareLocation} />
    </div>
  );
}