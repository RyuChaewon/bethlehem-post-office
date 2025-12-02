import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지들 불러오기
import LandingPage from './pages/LandingPage';
import EntrancePage from './pages/EntrancePage';
import MainPage from './pages/MainPage';
import NightSkyList from './pages/NightSkyList';
import StableList from './pages/StableList';

// [중요] 사용하기로 한 기존 파일들
import MessageForm from './pages/MessageForm';
import OrnamentSelect from './pages/OrnamentSelect';

import MessageDetail from './pages/MessageDetail';
import OutroPage from './pages/OutroPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrance" element={<EntrancePage />} />
        <Route path="/main" element={<MainPage />} />
        
        {/* 리스트 페이지 */}
        <Route path="/sky" element={<NightSkyList />} />
        <Route path="/stable" element={<StableList />} />

        {/* [수정 포인트] 글쓰기 (1단계) */}
        {/* :theme 자리에 sky 또는 stable이 들어옵니다. (예: /sky/write) */}
        <Route path="/:theme/write" element={<MessageForm />} />

        {/* [수정 포인트] 오너먼트 선택 (2단계) */}
        {/* MessageForm에서 작성을 마치면 여기로 이동합니다. */}
        <Route path="/select/:theme" element={<OrnamentSelect />} />
        
        {/* 상세 보기 */}
        <Route path="/:theme/detail/:id" element={<MessageDetail />} />

        <Route path="/outro" element={<OutroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;