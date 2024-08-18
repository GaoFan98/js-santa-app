import React, { useState } from 'react';
import axios from 'axios';
import './MessageForm.css';
import ErrorMessage from './ErrorMessage';
import SuccessModal from './SuccessModal';

const MessageForm: React.FC = () => {
  const [childId, setChildId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [childName, setChildName] = useState('');
  const [childAddress, setChildAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/api/send-message', { childId, message }); 
      if (response.data.success) {
        setSuccess(true);
        setChildName(response.data.childName);
        setChildAddress(response.data.childAddress);
        setChildId('');
        setMessage('');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Send Your Message to Santa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="childId">Child ID:</label>
          <input
            type="text"
            id="childId"
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            required
            placeholder="Enter your Child ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Enter your message to Santa"
          />
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>

      {error && <ErrorMessage message={error} />}
      {success && (
        <SuccessModal 
          onClose={() => setSuccess(false)} 
          childName={childName} 
          childAddress={childAddress} 
        />
      )}
    </div>
  );
};

export default MessageForm;
