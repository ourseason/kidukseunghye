// src/components/CoverImage.js
import React from 'react';

const CoverImage = () => {
  return (
    <div style={{ textAlign: 'center', position: 'relative', height: '100vh',overflow: 'hidden' }}>
      <img
        alt="cover_image"
        fetchpriority="high" // 소문자로 변경
        decoding="async"
        data-nimg="fill"
        className="object-cover w-full h-full"
        src="/image_20241011_173757_384.jpeg" // public 폴더에서 이미지 경로
        style={{
          position: 'absolute',
          height: '100%',
          inset: '0px',
          color: 'transparent',
          overflow: 'hidden',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

export default CoverImage;
