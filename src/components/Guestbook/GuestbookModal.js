import ReactDOM from 'react-dom';
import './GuestbookModal.css';

function GuestbookModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="guestbook-modal-overlay">
            <div className="guestbook-modal-content">
                <span className="guestbook-modal-close" onClick={onClose}>×</span>
                {children}
            </div>
        </div>,
        document.body // 최상위 DOM에 렌더링
    );
}

export default GuestbookModal;
