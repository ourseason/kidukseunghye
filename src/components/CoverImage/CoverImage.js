// src/components/CoverImage.js
import React from 'react';
import './CoverImage.css'; // CSS 파일 임포트

const CoverImage = () => {
  return (
    <div style={{ 
      backgroundColor: '#fff', 
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)' 
    }}>
      <div style={{ position: 'relative', boxShadow:'rgba(0, 0, 0, 0.1) 0px 0px 8px' }}>
       
          <img
            alt="cover_image"
            fetchpriority="high"
            decoding="async"
            data-nimg="fill"
            className="object-cover w-full h-full"
            src="/main.jpeg" // public 폴더에서 이미지 경로
            style={{
              width: '100%',
              inset: '0px',
              color: 'transparent',
              overflow: 'hidden',
              left: '50%',
              paddingTop: '14px'
            }}
          />

        <div style={{ backgroundColor:'white', paddingBottom: '40px', paddingTop: '40px' }}>
          <p style={{ margin: '0', fontSize: '1.2rem' }}>
            성 기 덕 <span style={{ margin: '0 42px' }}>|</span> 노 승 혜
          </p>
          <p style={{ margin: '5px 0', fontSize: '.85rem', marginTop:'26px' }}>2025.02.22 SAT 16:30PM</p>
          <p style={{ margin: '0', fontSize: '.85rem' }}>수원 메리빌리아 컨벤션 홀</p>
        </div>
        
        <div
          style={{
            position: 'absolute',
            width: 'calc(100% - 32px)',
            height: 'calc(100% - 32px)',
            top: '16px',
            left: '16px',
            border: '2px solid #EFEFEF',
          }}
        ></div>

      </div>
    </div>
  );
};

export default CoverImage;
