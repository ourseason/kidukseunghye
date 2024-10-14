import React, { useEffect } from 'react';
import './KakaoMap.css'; // KakaoMap.css 파일을 가져옵니다.

const KakaoMap = () => {
    useEffect(() => {
        const loadKakaoMap = () => {
            if (!window.kakao) {
                console.error("Kakao Maps SDK not loaded");
                return;
            }

            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(35.8728, 128.6025),
                level: 5,
            };

            const map = new window.kakao.maps.Map(container, options);
            const markerPosition = new window.kakao.maps.LatLng(35.8728, 128.6025);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map);
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
        <div>
            <h2 className="location-title">LOCATION</h2>
            <h3 className="location-subtitle">더 플라자 지스텀하우스 (22층) 서울 중구 소공로 119</h3>
            <div className="map-container" id="map"></div>

            <div className="directions">
                <h3 className="directions-title">오시는 방법</h3>
                <div className="transportation">
                    <h4>자차</h4>
                    <p>내비게이션: ‘서울 웨스틴조선호텔’ 검색</p>
                    <p>주소: 서울시 중구 소공로 106 서울 웨스틴조선호텔</p>

                    <h4>버스</h4>
                    <p>172 (우리은행종로지점 방면)</p>
                    <p>서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분</p>

                    <p>405 (롯데백화점 방면)</p>
                    <p>서울광장역 하차 → 데미타스커피 왼쪽 방면 → 도보 5분</p>

                    <p>472 (을지로입구 방면)</p>
                    <p>시청역 하차 → 도보 5분</p>

                    <h4>지하철</h4>
                    <p>1호선 (시청역)</p>
                    <p>시청역 11번 출구 → 10번 출구 도보 5분</p>

                    <p>2호선 (을지로입구역)</p>
                    <p>을지로입구역 4번 출구 → 10번 출구 도보 5분</p>

                    <h4>주차</h4>
                    <p>더 플라자 호텔 주차장: 하객 3시간 무료</p>
                    <p>주차현장 주차 요원 안내를 받아주세요.</p>
                </div>
            </div>
        </div>
    );
};

export default KakaoMap;
