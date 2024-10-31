import React, { useState, useRef, useEffect } from 'react';
import './MobileInvitation.css';  // CSS 파일을 import
import { FaCopy } from 'react-icons/fa'; // 복사 아이콘 import

const MobileInvitation = () => {
  const [husbandOpen, setHusbandOpen] = useState(false); // 신랑측 기본 열림
  const [wifeOpen, setWifeOpen] = useState(false); // 신부측 기본 닫힘
  const husbandRef = useRef(null);
  const wifeRef = useRef(null);

    // AOS 초기화
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init();
    });
  }, []);
  
  const husbandAccounts = [
    { name: '신랑 성기덕', bank: '국민', account: '0123-45-6789101', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' },
    { name: '신랑측 부모님', bank: '신한', account: '0123-45-6789101', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' }
  ];

  const wifeAccounts = [
    { name: '신부 노승혜', bank: '국민', account: '0123-45-6789101', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' },
    { name: '신부측 부모님', bank: '신한', account: '0123-45-6789101', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' }
  ];

  const copyToClipboard = (account) => {
    navigator.clipboard.writeText(account);
    alert(`계좌번호 복사 완료`);
  };

  const toggleSection = (section) => {
    if (section === 'husband') {
      setHusbandOpen(!husbandOpen);
    } else {
      setWifeOpen(!wifeOpen);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: 'rgb(252, 250, 248)' }}>
      <div style={{ marginBottom: '20px' }} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
        {/* 신랑측 섹션 */}
        <span 
          onClick={() => toggleSection('husband')} 
          className="section-header hus"
        >
          신랑측
          <i className={`fas fa-chevron-${husbandOpen ? 'up' : 'down'}`}></i>
        </span>
        <div
          ref={husbandRef}
          className={`section-content ${husbandOpen ? 'open' : ''}`}
          style={{
            height: husbandOpen ? `${husbandRef.current?.scrollHeight}px` : '0',
            opacity: husbandOpen ? 1 : 0,
            overflow: 'hidden',
            transition: 'height 0.5s ease, opacity 0.5s ease',
            paddingLeft: '10px'
          }}
        >
          {husbandAccounts.map((person, index) => (
            <div key={index} className="person-info-wrapper">
              <div className="person-info">
                <span className="person-span">{person.name}</span>
                <span>{person.bank} {person.account} 
                  <FaCopy
                    onClick={() => copyToClipboard(person.account)}
                    style={{ marginLeft: '6px' }}
                    title="복사하기"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 신부측 섹션 */}
      <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
        <span 
          onClick={() => toggleSection('wife')} 
          className="section-header"
        >
          신부측
          <i className={`fas fa-chevron-${wifeOpen ? 'up' : 'down'}`}></i>
        </span>
        <div
          ref={wifeRef}
          className={`section-content ${wifeOpen ? 'open' : ''}`}
          style={{
            height: wifeOpen ? `${wifeRef.current?.scrollHeight}px` : '0',
            opacity: wifeOpen ? 1 : 0,
            overflow: 'hidden',
            transition: 'height 0.5s ease, opacity 0.5s ease',
            paddingLeft: '10px'
          }}
        >
          {wifeAccounts.map((person, index) => (
            <div key={index} className="person-info-wrapper">
              <div className="person-info">
                <span className="person-span">{person.name}</span>
                <span>{person.bank} {person.account}
                  <FaCopy
                    onClick={() => copyToClipboard(person.account)}
                    style={{ marginLeft: '6px' }}
                    title="복사하기"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileInvitation;
