import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundLayout from '../components/BackgroundLayout';

// 이미지 에셋
import bgOutro from '../assets/bg-outro.svg';
import btnIntro from '../assets/btn-intro.svg';
import btnHome from '../assets/btn-home.svg';

export default function OutroPage() {
  const navigate = useNavigate();

  // [기능 1] 인트로 버튼: 랜딩 페이지('/')로 이동
  const handleGoIntro = () => {
    navigate('/');
  };

  // [기능 2] 홈 버튼: 메인 페이지('/main')로 이동
  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <BackgroundLayout image={bgOutro}>
      <div 
        style={{
          position: 'absolute',
          top: '76%', // y600 아래 위치
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          zIndex: 10,
        }}
      >
        {/* 인트로 이동 버튼 */}
        <button 
          onClick={handleGoIntro}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src={btnIntro} alt="Intro" style={{ display: 'block' }} />
        </button>

        {/* 홈(메인) 이동 버튼 */}
        <button 
          onClick={handleGoHome}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src={btnHome} alt="Home" style={{ display: 'block' }} />
        </button>
      </div>
    </BackgroundLayout>
  );
}