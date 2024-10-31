import React, { useEffect, useState} from 'react';
import './KakaoMap.css'; // KakaoMap.css 파일을 가져옵니다.
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FaCopy } from 'react-icons/fa'; // 복사 아이콘 import

const KakaoMap = () => {

    const [copySuccess, setCopySuccess] = useState('');
    
    const copyToClipboard = () => {
        const address = "경기도 수원시 팔달구 효원로 25"; // 복사할 주소
        navigator.clipboard.writeText(address).then(() => {
           alert("주소 복사되었습니다");
        }).catch(err => {
            console.error('복사 실패: ', err);
        });
    };
    
    // 네이버 지도 클릭 핸들러
    const handleNaverMapClick = () => {
        window.location.href = "https://map.naver.com/p/entry/place/1856237237?c=14.78,0,0,0,dh";
    };
    
     // 카카오맵 클릭 핸들러
     const handleKakaoMapClick = () => {
        window.location.href = "https://m.map.kakao.com/scheme/route?sp=&sn=&ep=37.2640901%2C126.9977417&en=%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84+%EB%8D%94+%ED%94%84%EB%A6%AC%EC%8A%A4%ED%8B%B0%EC%A7%80&by=car";
    };

     // T맵 클릭 핸들러
     const handleTMapClick = () => {
        window.location.href = "https://www.tmap.co.kr/tmap2/mobile/route.jsp?appKey=iTBIfzoES29EU5n9N3sWB9XB28cnDN6f3XP4CeNR&lat=37.2640901&lon=126.9977417&name=%EB%A9%94%EB%A6%AC%EB%B9%8C%EB%A6%AC%EC%95%84+%EB%8D%94+%ED%94%84%EB%A6%AC%EC%8A%A4%ED%8B%B0%EC%A7%80";
    };

        // AOS 초기화
    useEffect(() => {
        AOS.init({
            duration: 800, // 애니메이션 지속시간
            once: true, // 한 번만 애니메이션 실행
        });
    }, []);

    
    useEffect(() => {
        const loadKakaoMap = () => {
            if (!window.kakao) {
                console.error("Kakao Maps SDK not loaded");
                return;
            }

            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(37.2640901, 126.9977417), // 좌표 설정
                level: 5, // 지도 확대 수준
            };

            const map = new window.kakao.maps.Map(container, options);
            const markerPosition = new window.kakao.maps.LatLng(37.2640901, 126.9977417); // 마커 위치 설정
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map); // 마커를 지도에 추가
        };

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=7c83ad9e898fc41e0bf2bffb14232074&autoload=false`;
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(loadKakaoMap);
        };
        script.onerror = () => {
            console.error("Failed to load the Kakao Maps SDK");
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" style={{ padding: '30px', marginTop:"30px", backgroundColor:"#fcfaf8" }}>

            <div style={{ paddingBottom: '0.7rem' }}>
                <p
                    data-aos="fade-up"
                    data-aos-once="true"
                    style={{ fontSize: '12px', letterSpacing: '3px' }}
                    className="aos-init aos-animate"
                >
                    LOCATION
                </p>
                <p
                    data-aos="fade-up"
                    data-aos-once="true"
                    style={{ fontSize: '12px', lineHeight: '0.3rem' }}
                    className="aos-init aos-animate"
                >
                    오시는길
                </p>
            </div>
            
            <p className="location-subtitle-1">MARRYVILIA THE PRESTIGE</p>
            <p className="location-subtitle-2">경기도 수원시 팔달구 효원로 25  
                
            <FaCopy
                onClick={copyToClipboard}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                title="복사하기"
            /> </p> 

            <div className="map-container" id="map"></div>


            <div style={{textAlign: 'left' }}>
                <div data-aos="fade-up" data-aos-once="true" data-aos-anchor-placement="top-bottom" style={{ padding: '16px 0', borderBottom: '1px solid #ccc' }}>
                    <div style={{ paddingTop: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            height: '40px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            color: '#333',
                            fontFamily: 'Nanum Gothic',
                            margin: '0 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0px 0px 16px rgb(0 0 0 / 6%)',
                        }}
                            onClick={handleNaverMapClick}
                        >
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '20px', color: '#2db400' }} />
                            <span style={{ marginLeft: '5px', fontSize: "12px", color: "gray" }}>네이버지도</span>
                        </div>
                        <div style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            height: '40px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            color: '#333',
                            fontFamily: 'Nanum Gothic',
                            margin: '0 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0px 0px 16px rgb(0 0 0 / 6%)'
                        }}
                            onClick={handleKakaoMapClick}
                        >
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '20px', color: '#F5C400' }} />
                            <span style={{ marginLeft: '5px', fontSize: "12px", color: "gray" }}>카카오맵</span>
                        </div>
                        <div style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            height: '40px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            color: '#333',
                            fontFamily: 'Nanum Gothic',
                            margin: '0 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0px 0px 16px rgb(0 0 0 / 6%)'
                        }}
                        onClick={handleTMapClick}
                        >
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '20px', color: '#FF6347' }} />
                            <span style={{ marginLeft: '5px', fontSize: "12px", color: "gray" }}>티맵</span>
                        </div>
                    </div>
                </div>
            </div>





            <div className="directions">
                <div className="transportation">
                    <p className="transport-title">지하철</p>
                    <p className="transport-info">수원역 1호선 3번 출구</p>

                    <p className="transport-title">버스</p>
                    <p className="transport-info">수원역 환승센터 (1승강장)하차, 평동동남아파트 하차</p>

                    <p className="transport-title">주차</p>
                    <p className="transport-info ">경기도 수원시 권선구 세화로 116 서둔동 389</p>
                    <p className="transport-info">또는 메리빌리아 더 프리스티지 웨딩홀</p>
                    <p className="transport-info">* 자차 이용 시 무료주차 2시간</p>
                </div>
            </div>
        </div>
    );
};

export default KakaoMap;
