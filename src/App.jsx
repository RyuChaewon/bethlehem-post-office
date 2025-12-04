import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useImagePreloader from './hooks/useImagePreloader';

// [1] 기능 컴포넌트 불러오기
import ScrollToTop from './components/ScrollToTop';
import BackgroundMusic from './components/BackgroundMusic'; // 새로 추가!

// --- [2] 이미지 에셋 미리 불러오기 ---
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
  // --- [3] 프리로딩할 이미지 리스트 ---
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

  // --- [4] 훅 실행 ---
  useImagePreloader(imagesToPreload);

  return (
    <BrowserRouter>
      {/* [기능 1] 페이지 이동 시 스크롤 맨 위로 
        Routes 바깥에 있어야 모든 페이지에 적용됨
      */}
      <ScrollToTop />

      {/* [기능 2] 배경 음악 재생 (4곡 반복)
        Routes 바깥에 있어야 페이지 이동해도 끊기지 않음
      */}
      <BackgroundMusic />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrance" element={<EntrancePage />} />
        <Route path="/main" element={<MainPage />} />
        
        {/* 리스트 페이지 */}
        <Route path="/sky" element={<NightSkyList />} />
        <Route path="/stable" element={<StableList />} />

        {/* 글쓰기 */}
        <Route path="/:theme/write" element={<MessageForm />} />

        {/* 오너먼트 선택 */}
        <Route path="/select/:theme" element={<OrnamentSelect />} />
        
        {/* 상세 보기 */}
        <Route path="/:theme/detail/:id" element={<MessageDetail />} />

        <Route path="/outro" element={<OutroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;