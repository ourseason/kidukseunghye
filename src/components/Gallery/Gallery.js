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
        '/8.jpeg',
        '/7.jpeg',
        '/9.jpeg',
        '/10.jpeg',
        '/11.jpeg',
        '/12.jpeg',
        '/14.jpeg',
        '/13.jpeg',
        '/15.jpeg'
    ];

    const [likes, setLikes] = useState(Array(images.length).fill(0)); // 각 이미지에 대한 좋아요 수 저장

    // 서버로부터 좋아요 데이터 가져오는 함수
    const fetchLikes = async () => {
        try {
            const response = await fetch('https://sn0711.mycafe24.com/weddingapi/likes');
            const data = await response.json();
            if (data.success) {
                const likeCounts = Array(images.length).fill(0); // 초기 값을 0으로 설정
                data.likes.forEach((item) => {
                    likeCounts[item.image_index] = item.like_count; // image_index에 따라 좋아요 수 설정
                });
                setLikes(likeCounts); // 배열 형태로 likes 상태 업데이트
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
    
            const response = await fetch('https://sn0711.mycafe24.com/weddingapi/likes', {
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

    const [canLike, setCanLike] = useState(Array(images.length).fill(true)); // 각 이미지의 클릭 가능 여부

    const handleLike = (index, event) => {
        if (!canLike[index]) return;
    
        setLikes(prevLikes => {
            const updatedLikes = [...prevLikes];
            updatedLikes[index] = parseInt(updatedLikes[index] || 0, 10) + 1;
            return updatedLikes;
        });
    
        updateLike(index);
    
        // 클릭한 버튼의 위치를 가져와 GIF를 그 근처에 표시
        const rect = event.target.getBoundingClientRect();
        showHeartGif(
            rect.left + rect.width / 2 - 50,      // 버튼의 중앙 x 좌표
            rect.top + rect.height / 2 - 100  // 버튼의 중앙보다 10px 위쪽의 y 좌표
        );

        setCanLike(prevCanLike => {
            const updatedCanLike = [...prevCanLike];
            updatedCanLike[index] = false;
            return updatedCanLike;
        });
    
        setTimeout(() => {
            setCanLike(prevCanLike => {
                const updatedCanLike = [...prevCanLike];
                updatedCanLike[index] = true;
                return updatedCanLike;
            });
        }, 1000);
    };
    

    const showHearts = () => {
        const colors = ["#FF1461", "#FF5C93", "#FF85C1", "#FFB3D9"];
    
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.classList.add("heart");
    
                // 무작위로 이미지 선택
                const heartImage = Math.random() > 0.5 ? '/heart1.png' : '/heart2.png';
                heart.style.backgroundImage = `url(${heartImage})`;
                heart.style.backgroundSize = 'cover';
    
                // 하트 크기 설정
                heart.style.width = '25px';
                heart.style.height = '25px';
    
                // 화면 좌우 끝까지 포함하여 무작위 위치 설정 (여백을 약간 줄여서 5px씩만 남김)
                const startX = Math.random() * (window.innerWidth - 10) + 5; // 5px ~ (화면 너비 - 5px) 범위
                const startY = Math.random() * 50 + 40; // 화면 위에서 약간 아래에서 시작
                heart.style.position = 'fixed';
                heart.style.left = `${startX}px`;
                heart.style.top = `${startY}px`;
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '10003';
    
                document.body.appendChild(heart);
    
                // 애니메이션: 더 아래로 이동하며 커지고 사라짐
                const translateY = Math.random() * 300 + 400; // 400px ~ 700px 아래로 이동
    
                const animation = heart.animate(
                    [
                        { transform: `translateY(0px) scale(1)`, opacity: 1 },
                        { transform: `translateY(${translateY}px) scale(1.2)`, opacity: 0 }
                    ],
                    { duration: 2500, easing: "ease-out" }
                );
    
                // 애니메이션이 끝난 후 하트를 DOM에서 제거
                animation.onfinish = () => {
                    heart.remove();
                };
            }, i * 100); // 각 하트가 나타나는 시간 간격 (100ms 간격)
        }
    };
    
    
    
    
    const showHeartGif = (x, y) => {
        // GIF 이미지 요소 생성
        const gif = document.createElement("div");
        gif.style.backgroundImage = "url('/heart-animation.gif')"; // GIF 파일 경로
        gif.style.backgroundSize = "contain"; // 이미지 크기를 맞추기 위해 'contain' 사용
        gif.style.backgroundRepeat = "no-repeat"; // GIF 반복 방지
        gif.style.backgroundPosition = "center";
    
        // GIF 스타일 설정
        gif.style.position = "fixed";
        gif.style.left = `${x}px`; // 클릭 위치의 x 좌표
        gif.style.top = `${y}px`; // 클릭 위치의 y 좌표
        gif.style.width = "20vh"; // 크기를 작게 조정 (필요에 따라 조정 가능)
        gif.style.height = "20vh"; // 크기를 작게 조정
        gif.style.pointerEvents = "none";
        gif.style.zIndex = "10003";
        gif.style.opacity = "1";
    
        document.body.appendChild(gif);
    
        // 애니메이션 효과로 서서히 사라짐
        setTimeout(() => {
            gif.style.transition = "opacity 1s ease";
            gif.style.opacity = "0";
    
            // 애니메이션이 끝난 후 GIF 제거
            gif.addEventListener("transitionend", () => {
                gif.remove();
            });
        }, 1000); // GIF가 화면에 나타나 있는 시간 (1초)
    };
    
    
    
    // 하트 클릭 핸들러
    const handleHeartClick = () => {
        showHeartGif();
        // 여기서 추가적인 로직을 실행할 수 있습니다.
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
                                    <button 
                                        onClick={(event) => handleLike(index, event)} 
                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                        disabled={!canLike[index]} // 클릭 불가능할 때 버튼 비활성화
                                    >
                                        <img 
                                            src="/heart3.png" 
                                            alt="Heart Icon" 
                                            style={{ width: '20px', height: '20px' }} 
                                        />
                                    </button>
                                    <span>{likes[index] || 0}</span> {/* 좋아요 수 표시 */}
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
