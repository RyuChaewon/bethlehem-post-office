import React from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트 & 이미지
import BackgroundLayout from '../components/BackgroundLayout';
import bgMain from '../assets/bg-main.svg';       // 메인 배경
import btnBack from '../assets/btn-back.svg';     // 뒤로가기 버튼
import btnNightSky from '../assets/btn-nightsky.svg'; // 밤하늘 버튼
import btnStable from '../assets/btn-stable.svg';     // 마구간 버튼

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <BackgroundLayout image={bgMain}>
      
      {/* 1. 뒤로가기 버튼 (Back) 
          위치: 43, 46 -> left: 11%, top: 5.45%
          크기: 48 x 22
      */}
      <button
        onClick={() => navigate('/outro')} // 이전 페이지로 이동
        style={{
          position: 'absolute',
          top: '5.45%', 
          left: '11.02%',
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

      {/* 2. 밤하늘 바로가기 버튼 (Night Sky)
          위치: 194, 98 -> left: 49.7%, top: 11.6%
          크기: 141 x 205
      */}
      <button
        onClick={() => navigate('/sky')} // 라우터 경로에 맞게 수정 필요 (예: /sky)
        style={{
          position: 'absolute',
          top: '11.61%',
          left: '53%',
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

      {/* 3. 마구간 바로가기 버튼 (Stable)
          위치: 53, 422 -> left: 13.6%, top: 50%
          크기: 227 x 278
      */}
      <button
        onClick={() => navigate('/stable')} // 라우터 경로에 맞게 수정 필요 (예: /stable)
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