import React from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트와 이미지 에셋
import BackgroundLayout from '../components/BackgroundLayout';
import bgMain from '../assets/bg-main.svg';
import btnBack from '../assets/btn-back.svg';
import btnNightSky from '../assets/btn-nightsky.png';
import btnStable from '../assets/btn-stable.png';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <BackgroundLayout image={bgMain}>
      
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/outro')}
        style={{
          position: 'absolute',
          top: '5.45%', 
          left: '9%',
          width: '48px',
          height: '22px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <img 
          src={btnBack} 
          alt="Back" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </button>

      {/* 밤하늘 메시지 목록으로 이동 */}
      <button
        onClick={() => navigate('/sky')}
        style={{
          position: 'absolute',
          top: '11.61%',
          left: '57%',
          width: '120px',
          height: '185px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <img 
          src={btnNightSky} 
          alt="Go to Night Sky" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </button>

      {/* 마구간 메시지 목록으로 이동 */}
      <button
        onClick={() => navigate('/stable')}
        style={{
          position: 'absolute',
          top: '50%',
          left: '13.59%',
          width: '200px',
          height: '250px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        <img 
          src={btnStable} 
          alt="Go to Stable" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </button>

    </BackgroundLayout>
  );
};

export default MainPage;