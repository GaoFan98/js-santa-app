import React from 'react';
import './SuccessModal.css';

interface SuccessModalProps {
  onClose: () => void;
  childName: string;
  childAddress: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, childName, childAddress }) => {
  return (
    <div className="success-modal">
      <p>Your message has been sent successfully!</p>
      <p><strong>Child Name:</strong> {childName}</p>
      <p><strong>Child Address:</strong> {childAddress}</p>
      <button onClick={onClose} className="close-popup">Close</button>
    </div>
  );
};

export default SuccessModal;
