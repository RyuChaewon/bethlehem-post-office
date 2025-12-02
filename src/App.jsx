import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useImagePreloader from './hooks/useImagePreloader';

// --- [1] 이미지 에셋 미리 불러오기 (Import) ---
import bgWrite from './assets/bg-write.svg';
import bgEntrance from './assets/bg-entrance.svg';
import bgLanding from './assets/bg-landing.svg';
import bgMain from './assets/bg-main.svg';
import bgNightsky from './assets/bg-nightsky.svg';
import bgNightskyRead from './assets/bg-nightsky-read.svg';
import bgOutro from './assets/bg-outro.svg';
import bgStable from './assets/bg-stable.svg';
import bgStableRead from './assets/bg-stable-read.svg';

// 페이지들 불러오기
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
  // --- [2] 프리로딩할 이미지 리스트 작성 ---
  const imagesToPreload = [
    bgLanding,
    bgEntrance,
    bgMain,
    bgNightsky,
    bgStable,
    bgWrite,
    bgOutro,
    bgNightskyRead,
    bgStableRead
  ];

  // --- [3] 훅 실행 (백그라운드에서 다운로드 시작) ---
  useImagePreloader(imagesToPreload);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrance" element={<EntrancePage />} />
        <Route path="/main" element={<MainPage />} />
        
        {/* 리스트 페이지 */}
        <Route path="/sky" element={<NightSkyList />} />
        <Route path="/stable" element={<StableList />} />

        {/* 글쓰기 (1단계) */}
        {/* :theme 자리에 sky 또는 stable이 들어옴 (예: /sky/write) */}
        <Route path="/:theme/write" element={<MessageForm />} />

        {/* 오너먼트 선택 (2단계) */}
        {/* 라우트 경로 주의: 기존 코드에 맞춰 /select/:theme 로 설정 */}
        <Route path="/select/:theme" element={<OrnamentSelect />} />
        
        {/* 상세 보기 */}
        <Route path="/:theme/detail/:id" element={<MessageDetail />} />

        <Route path="/outro" element={<OutroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;