import React from 'react';
import ReactDOM from 'react-dom';
import './GuestbookWriteModal.css'; // 새로 추가한 CSS 파일

function GuestbookWriteModal({ isOpen, onClose, formData, handleInputChange, handleSubmit }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className="guestbook-write-modal-overlay" onClick={handleOverlayClick}>
            <div className="guestbook-write-modal-content">
                <span className="guestbook-write-modal-close" onClick={onClose}>&times;</span>
                <h3>축하의 메시지를 전해주세요.</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className='font-size-13'>작성자 성함</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="성함을 입력해주세요"
                            className="modal-input-text font-size-13"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='font-size-13'>비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="작성하신 방명록을 삭제할 때 사용됩니다."
                            className="modal-input-text font-size-13"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className='font-size-13'>방명록 내용</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="내용을 작성해주세요"
                            className="modal-input-textarea font-size-13"
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="write-button">작성하기</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}

export default GuestbookWriteModal;
