import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FaHeart } from 'react-icons/fa';

const Gallery = () => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
        fetchLikes(); // 초기 좋아요 데이터 가져오기
    }, []);

    const images = [
        '/1.jpeg',
        '/2.jpeg',
        '/3.jpeg',
        '/4.jpeg',
        '/5.jpeg',
        '/6.jpeg',
        '/7.jpeg',
        '/8.jpeg',
        '/9.jpeg',
        '/10.jpeg',
        '/11.jpeg',
        '/12.jpeg',
        '/13.jpeg',
        '/14.jpeg',
        '/15.jpeg'
    ];

    const [likes, setLikes] = useState(Array(images.length).fill(0)); // 각 이미지에 대한 좋아요 수 저장

    // 서버로부터 좋아요 데이터 가져오는 함수
    const fetchLikes = async () => {
        try {
            const response = await fetch('https://lenssiskr1.cafe24.com/weddingapi/likes');
            const data = await response.json();
            if (data.success) {
                // 좋아요 데이터에서 like_count 값만 추출하여 상태로 설정
                const likeCounts = data.likes.map(item => item.like_count);
                setLikes(likeCounts);
            } else {
                console.error('Failed to fetch likes');
            }
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    // 서버에 좋아요 업데이트하는 함수
    const updateLike = async (index) => {
        try {
            const formData = new URLSearchParams();
            formData.append('index', index);
    
            const response = await fetch('https://lenssiskr1.cafe24.com/weddingapi/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });
    
            const data = await response.json();
            if (!data.success) {
                throw new Error('Failed to update like');
            }
        } catch (error) {
            console.error('Error updating like:', error);
    
            // 요청 실패 시 상태 복구
            setLikes(prevLikes => {
                const updatedLikes = [...prevLikes];
                updatedLikes[index] = (updatedLikes[index] || 0) - 1; // 실패 시 이전 값으로 복구
                return updatedLikes;
            });
        }
    };

    const handleLike = (index, event) => {
        // 로컬 상태에 즉시 반영: 기존 값을 숫자로 변환하여 +1
        setLikes(prevLikes => {
            const updatedLikes = [...prevLikes];
            updatedLikes[index] = parseInt(updatedLikes[index] || 0, 10) + 1; // 숫자로 변환 후 +1
            return updatedLikes;
        });
    
        // 서버에 비동기로 좋아요 업데이트 요청
        updateLike(index);
    
        // 하트 애니메이션 표시
        const rect = event.target.getBoundingClientRect();
        showHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    const showHearts = (x, y) => {
        const colors = ["#FF1461", "#FF5C93", "#FF85C1", "#FFB3D9"];
        const heartContainer = document.createElement("div");
        heartContainer.classList.add("heart-container");

        heartContainer.style.position = 'fixed';
        heartContainer.style.left = `${x}px`;
        heartContainer.style.top = `${y}px`;
        heartContainer.style.pointerEvents = 'none';
        heartContainer.style.zIndex = '10003';

        document.body.appendChild(heartContainer);

        for (let i = 0; i < 40; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.textContent = "♥";
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heartContainer.appendChild(heart);

            heart.animate(
                [
                    { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1)`, opacity: 1 },
                    { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0.5)`, opacity: 0 }
                ],
                { duration: 1000 + Math.random() * 1000, easing: "ease-out" }
            );
        }

        setTimeout(() => {
            document.body.removeChild(heartContainer);
        }, 2000);
    };

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const swiperRef = useRef(null);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setIsImageVisible(true);
        document.documentElement.style.overflowY = 'hidden';
    };

    const closeSelectedImage = () => {
        document.documentElement.style.overflowY = '';
        setIsImageVisible(false);
    };

    const goToNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const goToPrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <>
            <div className="gallery-container" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
                <div style={{ paddingBottom: '0.7rem' }}>
                    <p data-aos="fade-up" style={{ fontSize: '10px', letterSpacing: '3px' }}>GALLERY</p>
                </div>

                <div className="gallery-grid" style={{ overflow: 'hidden', transition: 'max-height 1s' }}>
                    {images.map((src, index) => (
                        <div className='images-div' key={index}>
                            <img src={src} alt={`Slide ${index + 1}`} onClick={() => handleImageClick(index)} />
                        </div>
                    ))}
                </div>
            </div>

            {isImageVisible && (
                <div className="selected-image-container">
                    <Swiper
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={20}
                        centeredSlides={true}
                        initialSlide={selectedImageIndex}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                        {images.map((src, index) => (
                            <SwiperSlide key={index}>
                            <img src={src} alt={`Slide ${index + 1}`} className="selected-image" />
                            <div className="like-section">
                                <button onClick={(event) => handleLike(index, event)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <FaHeart style={{ color: 'red', fontSize: '20px' }} />
                                </button>
                                <span>{likes[index] || 0}</span> {/* 객체 속성으로 접근 */}
                            </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        className="prev-button"
                        onClick={goToPrevSlide}
                        style={{
                            position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', color: 'white', fontSize: '24px',
                            cursor: 'pointer', zIndex: 10002,
                            width: '40px', height: '40px', 
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}
                    >&lt;</button>
                    <button
                        className="next-button"
                        onClick={goToNextSlide}
                        style={{
                            position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', color: 'white', fontSize: '24px',
                            cursor: 'pointer', zIndex: 10002,
                            width: '40px', height: '40px', 
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}
                    >&gt;</button>
                    <button
                        className="close-button"
                        onClick={closeSelectedImage}
                        style={{
                            position: 'absolute', top: '20px', right: '20px', background: 'none',
                            border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', zIndex: 10002,
                            width: '40px', height: '40px', 
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}
                    >✖</button>
                </div>
            )}
        </>
    );
};

export default Gallery;
