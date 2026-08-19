import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useImagePreloader from './hooks/useImagePreloader';

// 공통 기능 컴포넌트
import ScrollToTop from './components/ScrollToTop';
import BackgroundMusic from './components/BackgroundMusic';

// 페이지 전환에 사용되는 배경 이미지
import bgWrite from './assets/bg-write.svg';
import bgEntrance from './assets/bg-entrance.svg';
import bgLanding from './assets/bg-landing.svg';
import bgMain from './assets/bg-main.svg';
import bgNightsky from './assets/bg-nightsky.svg';
import bgNightskyRead from './assets/bg-nightsky-read.svg';
import bgOutro from './assets/bg-outro.svg';
import bgStable from './assets/bg-stable.svg';
import bgStableRead from './assets/bg-stable-read.svg';

// 라우트 페이지
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
  // 주요 배경 이미지를 미리 불러와 화면 전환 시 깜빡임을 줄입니다.
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

  useImagePreloader(imagesToPreload);

  return (
    <BrowserRouter>
      {/* 모든 페이지 이동 후 스크롤 위치를 상단으로 초기화합니다. */}
      <ScrollToTop />

      {/* 페이지가 바뀌어도 배경 음악이 이어지도록 라우트 바깥에서 재생합니다. */}
      <BackgroundMusic />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entrance" element={<EntrancePage />} />
        <Route path="/main" element={<MainPage />} />
        
        {/* 메시지 목록 */}
        <Route path="/sky" element={<NightSkyList />} />
        <Route path="/stable" element={<StableList />} />

        {/* 메시지 작성 */}
        <Route path="/:theme/write" element={<MessageForm />} />

        {/* 오너먼트 선택 */}
        <Route path="/select/:theme" element={<OrnamentSelect />} />
        
        {/* 메시지 상세 보기 */}
        <Route path="/:theme/detail/:id" element={<MessageDetail />} />

        <Route path="/outro" element={<OutroPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;