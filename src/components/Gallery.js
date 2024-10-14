import React, { useState } from 'react';
import './Gallery.css'; // Gallery.css 파일을 가져옵니다.

const Gallery = () => {
    const images = [
        'https://toourguest.com/images/cards/sample/mobile/1.png',
        'https://toourguest.com/images/cards/sample/mobile/2.png',
        'https://toourguest.com/images/cards/sample/mobile/3.png',
        'https://toourguest.com/images/cards/sample/mobile/4.png',
        'https://toourguest.com/images/cards/sample/mobile/5.png',
        'https://toourguest.com/images/cards/sample/mobile/6.png',
        'https://toourguest.com/images/cards/sample/mobile/7.png',
        'https://toourguest.com/images/cards/sample/mobile/8.png',
        'https://toourguest.com/images/cards/sample/mobile/9.png',
        'https://toourguest.com/images/cards/sample/mobile/10.png',
    ];

    // 현재 슬라이드 인덱스
    const [currentSlide, setCurrentSlide] = useState(1); // 1로 시작하는 인덱스

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === images.length ? 1 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 1 ? images.length : prev - 1));
    };

    return (
        <div className="gallery-container">
            <div className="gallery-slide" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {/* 첫 번째 이미지와 마지막 이미지를 추가하여 무한 루프 효과 */}
                <img src={images[images.length - 1]} alt={`Slide ${images.length}`} /> {/* 마지막 이미지 */}
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Slide ${index + 1}`} />
                ))}
                <img src={images[0]} alt={`Slide 1`} /> {/* 첫 번째 이미지 */}
            </div>
            <div className="controls-container">
                <div className="button-container">
                    <button className="prev-button" onClick={handlePrev}> &lt; </button>
                    <button className="next-button" onClick={handleNext}> &gt; </button>
                </div>
                <div className="pagination">
                    <span>{currentSlide} / {images.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
