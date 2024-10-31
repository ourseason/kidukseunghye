import React, { useState } from "react";
import styles from "./AttendanceStatus.module.css";

const AttendanceStatus = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [side, setSide] = useState(""); // 신랑측/신부측 선택
  const [attendance, setAttendance] = useState(""); // 참석/미참석 선택
  const [name, setName] = useState(""); // 이름 입력
  const [consent, setConsent] = useState(true); // 개인정보 동의

  const openSecondModal = () => {
    setIsOpen(false);
    setIsSecondModalOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSecondModalOpen(false);
  };

  const handleSubmit = () => {
    if (!side || !attendance || !name || !consent) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }
    alert("참석여부가 제출되었습니다.");
    closeModal();
  };

  return (
    <div>
      {/* 첫 번째 모달 */}
      {isOpen && (
        <div className={styles["AttendanceStatus-overlay"]} onClick={closeModal}>
          <div className={styles["AttendanceStatus-content"]} onClick={(e) => e.stopPropagation()}>
            <button className={styles["AttendanceStatus-close-button"]} onClick={closeModal}>
              &times;
            </button>
            <h2 className={styles["AttendanceStatus-content_h2"]}>참석 여부 전달하기</h2>
            <p>
              참석여부를 미리 전달주시면<br></br>
              예식 준비에 큰 도움이 됩니다 :)
            </p>
            <hr />
            <div className={styles["AttendanceStatus-event-details"]}>
              <p className={styles["AttendanceStatus-event-details_font"]}>📅 2025.02.22 SAT</p>
              <p className={styles["AttendanceStatus-event-details_font"]}>📍 수원 메리빌리아 컨벤션 홀</p>
            </div>
            <button className={styles["AttendanceStatus-confirm-button"]} onClick={openSecondModal}>참석여부 전달하기</button>
          </div>
        </div>
      )}

      {/* 두 번째 모달 */}
      {isSecondModalOpen && (
        <div className={styles["AttendanceStatus-overlay"]} onClick={closeModal}>
          <div className={styles["AttendanceStatus-content"]} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles["AttendanceStatus-content_h2"]}> 참석여부 전달하기</h2>
            <div className={styles.section}>
              <label className={styles["section-label"]}>* 참석하시는 측</label>
              <div className={styles["button-group"]}>
                <button className={`${styles["choice-button"]} ${side === "신랑측" ? styles.selected : ""}`} onClick={() => setSide("신랑측")}>
                  신랑측
                </button>
                <button className={`${styles["choice-button"]} ${side === "신부측" ? styles.selected : ""}`} onClick={() => setSide("신부측")}>
                  신부측
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <label className={styles["section-label"]}>* 참석여부</label>
              <div className={styles["button-group"]}>
                <button className={`${styles["choice-button"]} ${attendance === "참석" ? styles.selected : ""}`} onClick={() => setAttendance("참석")}>
                  참석
                </button>
                <button className={`${styles["choice-button"]} ${attendance === "미참석" ? styles.selected : ""}`} onClick={() => setAttendance("미참석")}>
                  미참석
                </button>
              </div>
            </div>

            <div className={styles["input-group"]}>
              <label htmlFor="name">*이름</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                style={{ height:'25px' }}
              />
            </div>

            <div className={styles["consent-group"]}>
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent" className={styles["consent"]}>개인 정보 수집에 동의합니다.</label>
            </div>

            <button className={styles["submit-button"]} onClick={handleSubmit}>제출하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceStatus;
