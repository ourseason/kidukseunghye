// src/components/InvitationText.js
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InvitationText = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,  // false로 설정하여 여러 번 트리거
    threshold: 0.2,      // 20% 화면에 노출될 때 애니메이션 시작
  });

  // inView가 true일 때마다 애니메이션 시작
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // 현재 스크롤 위치
      const windowHeight = window.innerHeight; // 창 높이
      const threshold = windowHeight * 0.1; // 상단 10% 위치

      // 상단 10%에 도달했을 때
      if (currentScrollY < threshold) {
        controls.start({ opacity: 0, y: 100 }); // 사라지는 애니메이션
      } else {
        controls.start({ opacity: 1, y: 0 }); // 보이는 상태로 복원
      }
    };

    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 등록

    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref} // 요소에 ref 연결
      initial={{ opacity: 0, y: 100 }}
      animate={controls} // controls로 애니메이션 상태 제어
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', padding: '20px', fontFamily: 'SUIT-Regular', fontSize: '13px', letterSpacing: '1.4px', lineHeight: '2.6', backgroundColor: '#fff' }}
    >
      <h2>INVITATION</h2>
      <p>
        서로 다른 길을 걸어온 저희가 함께하는<br />
        다섯 번째 겨울을 끝으로<br />
        부부의 연을 맺어 항상 함께하기로 했습니다<br /><br /><br />
        인생의 또 다른 시작을 하기로 한 날<br />
        귀한 걸음 하시어 축복해 주시면 감사하겠습니다<br />
      </p>
      <p>
        성천모 . 이미자의 아들 성기덕<br />
        노장열 . 주정하의 딸 노승혜
      </p>
    </motion.div>
  );
};

export default InvitationText;
