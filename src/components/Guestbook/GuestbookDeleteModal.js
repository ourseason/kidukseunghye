import ReactDOM from 'react-dom';
import './GuestbookModal.css';

function GuestbookDeleteModal({ isOpen, onClose, deletePassword, handleDeleteSubmit, setDeletePassword }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="guestbook-modal-overlay">
            <div className="guestbook-modal-content">
                <button className="guestbook-modal-close" onClick={onClose}>&times;</button>
                <h3>비밀번호를 입력하세요</h3>
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
