import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CountdownTimer.css'; // CSS 파일 추가

const CountdownTimer = () => {
    const weddingDate = dayjs('2025-02-22T16:30:00');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // AOS 초기화
    useEffect(() => {
        AOS.init({
            duration: 800, // 애니메이션 지속시간
            once: true, // 한 번만 애니메이션 실행
        });
    }, []);
    
    useEffect(() => {
        const timer = setInterval(() => {
            const now = dayjs();
            const duration = weddingDate.diff(now);

            if (duration > 0) {
                const days = Math.floor(duration / (1000 * 60 * 60 * 24));
                const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((duration % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [weddingDate]);

    return (
        <div className="countdown-timer" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" style={{ }} >
            <div className="countdown-display">
            우리의 예식까지 남은 시간, <span className='time-day'>{timeLeft.days}</span>일
            </div>
        </div>
    );
};

export default CountdownTimer;
