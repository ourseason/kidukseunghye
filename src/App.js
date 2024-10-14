import './App.css';
import CoverImage from './components/CoverImage';
import InvitationText from './components/InvitationText';
import WeddingDatePicker from './components/WeddingDatePicker';
import CountdownTimer from './components/CountdownTimer';
import KakaoMap from './components/KakaoMap';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <CoverImage />
      <div className="content">
        <InvitationText /> {/* 인사말 추가 */}
        <WeddingDatePicker /> {/* 캘린더 추가 */}
        <CountdownTimer /> {/* 카운트다운 타이머 추가 */}
        <KakaoMap /> {/* 카카오 지도 추가 */}
        <Gallery /> {/* 사진 추가 */}
      </div>
    </div>
  );
}

export default App;
