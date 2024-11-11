import React, { useEffect, useState } from 'react';
import { FaPhone, FaComment } from 'react-icons/fa'; // 전화 및 문자 이모티콘 임포트
import phoneIcon from '../../image/phoneIcon.png'; // 이미지 파일 임포트
import './InvitationText.css'; // CSS 파일 임포트

const InvitationText = () => {
  const [showModal, setShowModal] = useState(false);

  // AOS 초기화
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init();
    });
  }, []);

  const handleContactClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) { // 모달 외부를 클릭했는지 확인
      closeModal();
    }
  };

  return (
    <div className="background-color">
      <div className="div-margin">
        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          <p className="invitation-text">우리가 함께 걸어온 시간은</p>
          <p className="invitation-text">서로에게 소중한 추억이 되었고,</p>
          <p className="invitation-text">이제는 그 추억을 바탕으로</p>
          <p className="invitation-text">새로운 인생을 시작하려 합니다.</p>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          <p className="invitation-text extra-space">저희의 시작을 축복해주신다면</p>
          <p className="invitation-text">그 마음을 늘 간직하며,</p>
          <p className="invitation-text">평생 함께 웃고 사랑하며 살아가겠습니다.</p>
        </div>

        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          <div className="invitation-text extra-space">
            <span className="invitation-text-span">
              성천모 <span className='dot'>·</span> 이미자의 <span className="relation">아들</span> 성기덕
            </span>
            <span className="invitation-text-span">
              노장열 <span className='dot'>·</span> 주정하의 <span className="relation"> 딸</span> 노승혜
            </span>
          </div>
        </div>

        {/* 연락하기 버튼 */}
        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" style={{ textAlign: 'center', marginTop: '40px' }}>
          <div
            style={{
              display: 'inline-flex', // 아이콘과 텍스트를 가로로 정렬
              padding: '12px 40px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #e2e2e2',
              backgroundColor: 'transparent',
              color: '#000',
              cursor: 'pointer', // 클릭 가능한 커서
              opacity: '0.7',
              alignItems: 'center', // 수직 가운데 정렬
              justifyContent: 'center', // 수평 가운데 정렬
              gap: '10px', // 아이콘과 텍스트 간격
            }}
            onClick={handleContactClick} // 클릭 이벤트
          >
            <img src={phoneIcon} alt="전화" style={{ width: '13px', height: '13px' }} /> {/* 전화기 이미지 사용 */}
            <span>연락하기</span>
          </div>
        </div>



        {/* 모달 */}
        {showModal && (
          <div className="invitation-modal-overlay" onClick={handleOverlayClick}>
          <div className="invitation-modal-content">
            <span><h2 className="invitation-text h2">연락하기</h2></span>
            <div className="contact-info">
              {/* 신랑 */}
              <div className="contact-item">
                <div className="cotant-div">
                  <span className="contact-title">신랑</span>
                  <span className="contact-name">성기덕</span>
                </div>
                <div className="contact-phone-span">
                  <span>
                    <a href="tel:01012345678">
                    <img src={phoneIcon} alt="전화" style={{ width: '12px', height: '12px' }} /> {/* 전화기 이미지 사용 */}
                    </a>
                  </span>
                    <span className="contact-phone">010-3117-5027</span>
                </div>  
              </div>
              {/* 신부 */}
              <div className="contact-item">
              <div className="cotant-div">
                  <span className="contact-title">신부</span>
                  <span className="contact-name">노승혜</span>
                </div>
                <div className="contact-phone-span">
                  <span>
                    <a href="tel:01012345678">
                    <img src={phoneIcon} alt="전화" style={{ width: '12px', height: '12px' }} /> {/* 전화기 이미지 사용 */}
                    </a>
                  </span>
                    <span className="contact-phone">010-3117-5027</span>
                </div>  
              </div>
            </div>
            <button className="it-close-button" onClick={closeModal}>x</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default InvitationText;
