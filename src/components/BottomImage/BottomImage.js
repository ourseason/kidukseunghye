import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsChatDots } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';

const BottomImage = () => {

    // AOS 초기화
    useEffect(() => {
        AOS.init({
            duration: 800, // 애니메이션 지속시간
            once: true, // 한 번만 애니메이션 실행
        });
    }, []);

    const handleKakaoShare = () => {
        alert("카카오톡 공유하기 기능이 여기에 추가됩니다.");
    };

    const handleLinkCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다.");
    };

    return (
        <div style={{ backgroundColor: 'rgb(252, 250, 248)' }}>
            <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
                <div>     
                    <img
                        alt="cover_image"
                        fetchpriority="high"
                        decoding="async"
                        data-nimg="fill"
                        className="object-cover w-full h-full"
                        src="/bottom_image.png"
                        style={{
                            width: '100%',
                            filter: 'blur(2px)',
                        }}
                    />
                </div>

                {/* 공유 및 하단 정보 영역 */}
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgb(252, 250, 248)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                        <div 
                            onClick={handleKakaoShare} 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <BsChatDots style={{ marginRight: '5px' }} />
                            <span>카카오톡 공유하기</span>
                        </div>
                        <div 
                            onClick={handleLinkCopy} 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <FaLink style={{ marginRight: '5px' }} />
                            <span>링크주소 복사하기</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        Copyright 2024. <strong>FROM BYRSHA</strong>. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BottomImage;
