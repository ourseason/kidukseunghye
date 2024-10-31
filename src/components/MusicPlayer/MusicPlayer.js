import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'; // react-icons 사용
import './MusicPlayer.css'; // 별도의 CSS 파일 사용 가능

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(true); // 재생 상태
  const [muted, setMuted] = useState(false); // 음소거 상태
  const playerRef = useRef(null); // ReactPlayer에 접근하기 위한 ref

  const togglePlayPause = () => {
    setPlaying(!playing); // 재생/일시정지 토글
  };

  const toggleMute = () => {
    setMuted(!muted); // 음소거/음소거 해제 토글
  };

  return (
    <div className="music-player-wrapper">
      <ReactPlayer
        ref={playerRef}
        url='/main_02.mp3'
        playing={playing}
        muted={muted}
        loop={true} // 무제한 반복 재생
        width="0" // 플레이어 숨김
        height="0"
      />

      {/* 커스텀 컨트롤 버튼 */}

      <button onClick={toggleMute} className="control-button">
        {muted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default MusicPlayer;
