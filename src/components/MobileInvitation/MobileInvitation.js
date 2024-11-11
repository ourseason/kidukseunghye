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
    { name: '신랑 성기덕', bank: '국민', account: '0123-45-6422221', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' },
    { name: '신랑측 부모님', bank: '신한', account: '0123-45-61333', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' }
  ];

  const wifeAccounts = [
    { name: '신부 노승혜', bank: '국민', account: '0123-45-234101', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' },
    { name: '신부측 부모님', bank: '신한', account: '0123-45-67341', kakaoLink: 'https://qr.kakaopay.com/FOMPJxdaX' }
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
    <div style={{ padding: '44px', backgroundColor: 'rgb(252, 250, 248)' }}>
      <div style={{ marginBottom: '20px' }} data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
        
        <div style={{ paddingBottom: '0.7rem' }}>
            <p
                style={{ fontSize: '14px', letterSpacing: '4px', fontWeight: 'bold', color: '#666' }}
                className="aos-init aos-animate"
            >
                마음 전하실 곳
            </p>
            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '0', letterSpacing: '3.0px', lineHeight: '1.6' }} className="aos-init aos-animate">
                참석이 어려워 직접 축하를
            </p>
            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '0', letterSpacing: '3.0px', lineHeight: '1.6' }} className="aos-init aos-animate">
                전하지 못하는 분들을 위해
            </p>
            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '0', letterSpacing: '3.0px', lineHeight: '1.6' }} className="aos-init aos-animate">
                계좌번호를 기재하였습니다.
            </p>
            <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '0', marginBottom: '10px', letterSpacing: '3.0px', lineHeight: '1.6' }} className="aos-init aos-animate">
                넓은 마음으로 양해 부탁드립니다.
            </p>
        </div>
        
        {/* 신랑측 섹션 */}
        <span 
          onClick={() => toggleSection('husband')} 
          className="section-header hus"
        >
          신랑측 계좌번호
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
            <div key={index} className="person-info-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="person-info">
                <span className="person-span">{person.name}</span>
                <span>{person.bank} {person.account}</span>
              </div>
              <div
                  onClick={() => copyToClipboard(person.account)}
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      marginLeft: '10px',
                      fontSize : '14px'
                  }}
                  title="복사하기"
              >
                 <img
                        src="/copy.png"
                        alt="복사하기"
                        onClick={copyToClipboard}
                        style={{
                            cursor: 'pointer',
                            
                            width: '12px',
                            height: '12px',
                            verticalAlign: 'middle',
                            marginRight: '4px'
                        }}
                        title="복사하기"
                    />
                  복사
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
          신부측 계좌번호
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
            <div key={index} className="person-info-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="person-info">
                <span className="person-span">{person.name}</span>
                <span>{person.bank} {person.account}</span>
              </div>
              <div
                  onClick={() => copyToClipboard(person.account)}
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      marginLeft: '10px',
                      fontSize : '14px'
                  }}
                  title="복사하기"
              >
                 <img
                        src="/copy.png"
                        alt="복사하기"
                        onClick={copyToClipboard}
                        style={{
                            cursor: 'pointer',
                            
                            width: '12px',
                            height: '12px',
                            verticalAlign: 'middle',
                            marginRight: '4px'
                        }}
                        title="복사하기"
                    />
                  복사
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default MobileInvitation;
