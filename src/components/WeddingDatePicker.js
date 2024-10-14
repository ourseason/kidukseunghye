import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import './WeddingDatePicker.css';
import { motion, useAnimation } from 'framer-motion';

const WeddingDatePicker = () => {
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
    //const weddingTime = weddingDate.format('A h:mm'); // 오전/오후와 시간을 가져옴 (예: 오후 4:30)

    const wddingHour =  weddingDate.format('h'); // 시 (1~12 형식)
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

    // 애니메이션 설정
    const controls = useAnimation();
    const ref = useRef(null); // ref 생성

    useEffect(() => {
        const handleScroll = () => {
            const { top } = ref.current.getBoundingClientRect(); // 컴포넌트의 위치 가져오기
            const windowHeight = window.innerHeight; // 창 높이
            
            // 컴포넌트의 상단이 창의 높이 100% 아래에 있을 때 애니메이션 시작
            if (top < windowHeight * 1) {
                controls.start({ opacity: 1, y: 0 }); // 보이는 상태로 복원
            } else {
                controls.start({ opacity: 0, y: 100 }); // 아래로 이동하는 애니메이션
            }
        };

        window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 등록
        handleScroll(); // 초기 위치 확인

        return () => {
            window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, [controls]);

    return (
        <motion.div
            ref={ref} // ref 할당
            initial={{ opacity: 0, y: 100 }} // 초기 상태를 아래로 설정
            animate={controls} // controls로 애니메이션 상태 제어
            transition={{ duration: 0.8 }} // 애니메이션 지속시간
            style={{ marginTop: '50px'}} // 위아래 마진으로 간격 띄움
        >
            <div className="schedule-calandar-wrapper">
                <div className="wedding-date red-text"> 
                    {monthNames[weddingDate.month()]}의<br /> 
                    {dayNames[weddingDate.date() - 1]}.
                </div>
                <div className="common-calandar">
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
                                        <div key={dayIndex} className={`common-calandar-date ${isWeddingDay ? 'circle' : ''}`}>
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
        </motion.div>
    );
};

export default WeddingDatePicker;
