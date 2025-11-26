// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 위에서 만든 페이지들 불러오기
import LandingPage from './pages/LandingPage';
import EntrancePage from './pages/EntrancePage';
import MainPage from './pages/MainPage';
import NightSkyList from './pages/NightSkyList';
import StableList from './pages/StableList';
import MessageForm from './pages/MessageForm';
import OrnamentSelect from './pages/OrnamentSelect';
import MessageDetail from './pages/MessageDetail';
import OutroPage from './pages/OutroPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인트로 */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrance" element={<EntrancePage />} />

        {/* 메인 */}
        <Route path="/main" element={<MainPage />} />

        {/* 리스트 */}
        <Route path="/sky" element={<NightSkyList />} />
        <Route path="/stable" element={<StableList />} />

        {/* 기능 (작성, 선택, 읽기) */}
        {/* :theme 자리에 sky 또는 stable이 들어갑니다 */}
        <Route path="/write/:theme" element={<MessageForm />} />
        <Route path="/select/:theme" element={<OrnamentSelect />} />
        <Route path="/read/:theme/:id" element={<MessageDetail />} />

        {/* 아웃트로 */}
        <Route path="/outro" element={<OutroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;