import ReactDOM from 'react-dom';
import './GuestbookModal.css';
import './GuestbookDeleteModal.css'; // 새로 추가한 CSS 파일

function GuestbookDeleteModal({ isOpen, onClose, deletePassword, handleDeleteSubmit, setDeletePassword }) {
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
                <span className='guestbook-delete-sapn'>비밀번호를 입력하세요</span>
                <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="비밀번호"
                    className="modal-input-text"
                />
                <div className="modal-footer">
                    <button onClick={handleDeleteSubmit} className="write-button">삭제하기</button>
                   
                </div>
            </div>
        </div>,
        document.body
    );
}

export default GuestbookDeleteModal;
