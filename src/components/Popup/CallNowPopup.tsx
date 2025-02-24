// @/components/CallNowPopup.tsx
import React from 'react';
import './CallNowPopup.css';

interface CallNowPopupProps {
  onClose: () => void;
}

const CallNowPopup: React.FC<CallNowPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2>Call Now!</h2>
        <p>Visit our website: <a href="https://www.deepakgautam.com">deepakgautam.com</a></p>
        <button onClick={onClose}>Next</button>
      </div>
    </div>
  );
};

export default CallNowPopup;