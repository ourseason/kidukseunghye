import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './CountdownTimer.css'; // CSS 파일 추가

const CountdownTimer = () => {
    const weddingDate = dayjs('2024-12-31T12:00:00');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
        <div className="countdown-timer">
            <h2 className="countdown-title">두 사람이 함께 되는 날까지</h2> {/* 문구 추가 */}
            <div className="countdown-row"> {/* 카운트다운 항목을 포함할 행 */}
                <div className="countdown-item">
                    <h1>{timeLeft.days}</h1>
                    <span>일</span>
                </div>
                <div className="countdown-item">
                    <h1>{timeLeft.hours}</h1>
                    <span>시간</span>
                </div>
                <div className="countdown-item">
                    <h1>{timeLeft.minutes}</h1>
                    <span>분</span>
                </div>
                <div className="countdown-item">
                    <h1>{timeLeft.seconds}</h1>
                    <span>초</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
