import React from 'react';
import ReactDOM from 'react-dom';
import './GuestbookModal.css';

function GuestbookModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className="guestbook-modal-overlay" onClick={handleOverlayClick}>
            <div className="guestbook-modal-content">
                <span className="guestbook-modal-close" onClick={onClose}>×</span>
                {children}
            </div>
        </div>,
        document.body // 최상위 DOM에 렌더링
    );
}

export default GuestbookModal;
