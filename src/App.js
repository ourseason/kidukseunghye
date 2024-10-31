import './App.css';
import CoverImage from './components/CoverImage/CoverImage';
import InvitationText from './components/InvitationText/InvitationText';
import WeddingDatePicker from './components/WeddingDatePicker/WeddingDatePicker';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
import KakaoMap from './components/KakaoMap/KakaoMap';
import Gallery from './components/Gallery/Gallery';
import MobileInvitation from './components/MobileInvitation/MobileInvitation';
import Guestbook from './components/Guestbook/Guestbook';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import AttendanceStatus from './components/AttendanceStatus/AttendanceStatus';

function App() {
  return (
    <div className="App">
      <AttendanceStatus />
      <MusicPlayer />
      <CoverImage />
      <div className="content">
        <InvitationText /> {/* 인사말 추가 */}
        <WeddingDatePicker /> {/* 캘린더 추가 */}
        <Gallery /> {/* 사진 추가 */}
        <KakaoMap /> {/* 카카오 지도 추가 */}
        <MobileInvitation /> {/* 마을전하실곳 */}
        <Guestbook />
      </div>
    </div>
  );
}

export default App;
