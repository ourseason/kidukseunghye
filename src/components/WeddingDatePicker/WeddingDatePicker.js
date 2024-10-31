import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './WeddingDatePicker.css';

const WeddingDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가
    const weddingDate = dayjs('2025-02-22T16:30:00'); // 결혼식 날짜
    const monthStart = weddingDate.startOf('month'); // 월의 첫 번째 날짜
    const monthEnd = weddingDate.endOf('month'); // 월의 마지막 날짜

    const monthData = []; // 월 데이터 저장할 배열

    // 월의 모든 날짜를 배열에 추가
    for (let day = monthStart; day.isBefore(monthEnd.add(1, 'day')); day = day.add(1, 'day')) {
        monthData.push(day);
    }

    // 주 단위로 데이터를 나누기 위한 배열 생성
    const weeks = [];
    const firstDayOfWeek = monthStart.day(); // 시작 요일 가져오기

    // 첫 주에 빈 날짜 추가
    const firstWeek = Array(firstDayOfWeek).fill(null).concat(monthData.slice(0, 7 - firstDayOfWeek));
    weeks.push(firstWeek);

    // 이후 주 추가
    for (let i = 7 - firstDayOfWeek; i < monthData.length; i += 7) {
        weeks.push(monthData.slice(i, i + 7));
    }

    // 마지막 주에 빈 날짜 추가하여 정렬 유지
    const lastWeek = weeks[weeks.length - 1];
    const lastWeekLength = lastWeek.length;

    // 마지막 주에 필요한 빈 날짜 수 계산
    if (lastWeekLength < 7) {
        const emptyDays = Array(7 - lastWeekLength).fill(null); // 빈 날짜 배열 생성
        weeks[weeks.length - 1] = lastWeek.concat(emptyDays); // 마지막 주에 빈 날짜 추가
    }

    // 마지막 주에서 1 제거
    if (lastWeek[lastWeekLength - 1]?.date() === 1) {
        weeks[weeks.length - 1][lastWeekLength - 1] = null; // 마지막 주에서 1을 null로 설정
    }

    // 오전/오후 문구 결정
    const hour = weddingDate.hour();
    const period = hour < 12 ? '오전' : '오후';

    // 결혼식 시간 형식
    const wddingHour = weddingDate.format('h'); // 시 (1~12 형식)
    const minute = weddingDate.format('mm'); // 분
    const weddingTime = `${period} ${wddingHour}:${minute}`; // 최종 결혼식 시간 포맷

    // 월 이름 배열
    const monthNames = [
        '일월', '이월', '삼월', '사월', '오월', '유월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'
    ];

    // 날짜 이름 배열
    const dayNames = [
        '첫째 날', '둘째 날', '셋째 날', '넷째 날', '다섯째 날', '여섯째 날', '일곱째 날',
        '여덟째 날', '아홉째 날', '열째 날', '열한째 날', '열두째 날', '열세째 날', '열네째 날',
        '열다섯째 날', '열여섯째 날', '열일곱째 날', '열여덟째 날', '열아홉째 날', '스무째 날',
        '스물한째 날', '스물두째 날', '스물세째 날', '스물네째 날', '스물다섯째 날', '스물여섯째 날',
        '스물일곱째 날', '스물여덟째 날', '스물아홉째 날', '서른째 날'
    ];


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


    // AOS 초기화
    useEffect(() => {
        AOS.init({
            duration: 800, // 애니메이션 지속시간
            once: true, // 한 번만 애니메이션 실행
        });
    }, []);

    // 날짜 클릭 핸들러
    const handleDateClick = (day) => {
        if (day) {
            setSelectedDate(day.format('YYYY-MM-DD')); // 선택된 날짜를 형식화하여 상태 업데이트
        }
    };

    return (
        <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" style={{ padding: '30px' }}>
            <p 
                style={{ fontSize: '12px', letterSpacing: '3px' }} 
                data-aos="fade-up" 
                data-aos-once="true" 
                className="aos-init aos-animate"
                >
                THE WEDDING DAY
            </p>
            
            {/* 추가된 div */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }} data-aos="fade-up" data-aos-once="true" className="aos-init aos-animate">
                <span style={{ fontSize: '1.5rem', filter: 'blur(4px)', color: '#D2C3B1', display: 'inline-block', minWidth: '1.8rem' }}>12</span>
                <span style={{ margin: '0 30px', fontSize: '1.7rem', filter: 'blur(2px)', color: '#D2C3B1', display: 'inline-block', minWidth: '2rem' }}>1</span>
                <span style={{ fontSize: '3.5rem', paddingBottom: '10px' }}>2</span>
                <span style={{ margin: '0 30px', fontSize: '1.7rem', filter: 'blur(2px)', color: '#D2C3B1', display: 'inline-block', minWidth: '2rem' }}>3</span>
                <span style={{ fontSize: '1.5rem', filter: 'blur(4px)', color: '#D2C3B1', display: 'inline-block', minWidth: '1.8rem' }}>4</span>
            </div>
            
            <div className="schedule-calandar-wrapper">
                <div className="wedding-date red-text" >
                    <p>2025년 2월 22일 토요일</p>
                    <p>오후 4시 30분</p>
                </div>
                <div className="common-calandar"> {/* 전체 달력에 AOS 적용 */}
                    <div className="common-calandar-table">
                        <div className="common-calandar-header"></div>
                        <div className="common-calandar-week">
                            <div className="common-calandar-day sunday">일</div>
                            <div className="common-calandar-day monday">월</div>
                            <div className="common-calandar-day tuesday">화</div>
                            <div className="common-calandar-day wednesday">수</div>
                            <div className="common-calandar-day thursday">목</div>
                            <div className="common-calandar-day friday">금</div>
                            <div className="common-calandar-day saturday">토</div>
                        </div>
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="common-calandar-week">
                                {week.map((day, dayIndex) => {
                                    const isWeddingDay = day && day.isSame(weddingDate, 'day'); // 결혼식 날짜와 비교
                                    return (
                                        <div
                                            key={dayIndex}
                                            className={`common-calandar-date ${isWeddingDay ? 'circle' : ''}`}
                                            onClick={() => handleDateClick(day)} // 날짜 클릭 시 이벤트 핸들러 추가
                                        >
                                            <span>{day ? day.date() : ''}</span>
                                            {isWeddingDay && (
                                                <span className="wedding-day-text">
                                                    {weddingTime} {/* 결혼식 시간 표시 */}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                        <div className="common-calandar-header"></div>
                    </div>
                </div>
            </div>
            <div className="countdown-timer" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200" style={{ }} >
                <div className="countdown-display">
                    우리의 예식까지 남은 시간, <span className='time-day'>{timeLeft.days}</span>일
                </div>
            </div>
        </div>
    );
};

export default WeddingDatePicker;
