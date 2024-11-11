import { useState, useEffect } from 'react';
import './Guestbook.css';
import GuestbookModal from './GuestbookModal';
import GuestbookWriteModal from './GuestbookWriteModal';
import GuestbookDeleteModal from './GuestbookDeleteModal';

function Guestbook() {
    const [entries, setEntries] = useState([]);
    const [visibleEntries, setVisibleEntries] = useState(3);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [formData, setFormData] = useState({ name: '', password: '', message: '' });

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await fetch('https://sn0711.mycafe24.com/weddingapi/guestbook');
            const data = await response.json();
            if (data.success) {
                setEntries(data.entries);
            } else {
                console.error('Failed to fetch entries');
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    const openDetailModal = (entry) => {
        setSelectedEntry(entry);
        setIsDetailModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeDetailModal = () => {
        setSelectedEntry(null);
        setIsDetailModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 글쓰기 모달을 열 때 formData를 초기화
    const openWriteModal = () => {
        setFormData({ name: '', password: '', message: '' });
        setIsWriteModalOpen(true);
    };

    // 글쓰기 모달을 닫고 formData 초기화
    const closeWriteModal = () => {
        setFormData({ name: '', password: '', message: '' });
        setIsWriteModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://sn0711.mycafe24.com/weddingapi/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
            });
    
            const data = await response.json();
            if (data.success && data.entry) {  // 서버에서 생성된 새 엔트리의 ID를 포함해 응답하도록 함
                setEntries([data.entry, ...entries]); // 서버에서 받은 새 항목을 entries 배열에 추가
                setFormData({ name: '', password: '', message: '' });
                closeWriteModal();
            } else {
                console.error('Failed to submit entry');
            }
        } catch (error) {
            console.error('Error submitting entry:', error);
        }
    };

    const handleDeleteSubmit = async () => {

        console.log("selectedEntry.id", selectedEntry.id);

        if (deletePassword) {
            try {
                const response = await fetch('https://sn0711.mycafe24.com/weddingapi/guestbook/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        id: selectedEntry.id,
                        password: deletePassword,
                    }).toString(),
                });

                const data = await response.json();
                if (data.success) {
                    setEntries(entries.filter((entry) => entry.id !== selectedEntry.id));
                    setIsDeleteModalOpen(false);
                    setDeletePassword('');
                    alert('방명록 삭제완료');
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            } catch (error) {
                console.error('Error deleting entry:', error);
                alert('방명록 삭제 중 오류가 발생했습니다.');
            }
        } else {
            alert('비밀번호를 입력하세요.');
        }
    };

    const handleShowMore = () => {
        setVisibleEntries((prevVisible) => prevVisible + 3);
    };

    return (
            <div className="guestbook-container" >
                <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
                <span className="guestbook-container-title">
                    <span style={{ fontSize: '10px', letterSpacing: '3px' }}>GUEST BOOK</span>
                    
                </span>
                <div className="guestbook-entries">
                    {entries.slice(0, visibleEntries).map((entry, index) => (
                        <div className="guestbook-card" key={index} onClick={() => openDetailModal(entry)}>
                            <div className="guestbook-card-header">
                                <span className="guestbook-list-name">{entry.name}</span>
                                <span className="date-span"> {entry.created_at} 
                                <button 
                                    className="delete-button" 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setSelectedEntry(entry); // 삭제할 엔트리 정보를 selectedEntry에 설정
                                        setIsDeleteModalOpen(true); 
                                    }}
                                >
                                        x
                                    </button> 
                                </span>
                            </div>
                            <div className="guestbook-card-body">
                                {entry.message}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="button-container">
                    {visibleEntries < entries.length && (
                        <button onClick={handleShowMore} className="show-more-button">
                            더보기
                        </button>
                    )}
                    <button onClick={openWriteModal} className="write-button" contenteditable="false" tabindex="-1">글쓰기</button>
                </div>

                <GuestbookModal isOpen={isDetailModalOpen} onClose={closeDetailModal}>
                    <span className="guestbook-modal-title">{selectedEntry?.name}</span>
                    <span className="guestbook-modal-text"><p>{selectedEntry?.message}</p></span>
                </GuestbookModal>

                <GuestbookWriteModal
                    isOpen={isWriteModalOpen}
                    onClose={closeWriteModal}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />

                <GuestbookDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    deletePassword={deletePassword}
                    setDeletePassword={setDeletePassword}
                    handleDeleteSubmit={handleDeleteSubmit}
                />
            </div>
        </div>
    );
}

export default Guestbook;
