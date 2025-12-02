import React from 'react';
import { useNavigate } from 'react-router-dom';

// 1. 공통 배경 레이아웃 컴포넌트 불러오기
import BackgroundLayout from '../components/BackgroundLayout';

// 2. 이미지 에셋 불러오기 (경로 확인 필요!)
// 만약 경로 에러가 난다면 '../assets/images/bg-landing.svg' 처럼 실제 경로로 수정해주세요.
import bgLanding from '../assets/bg-landing.svg';
import btnStart from '../assets/btn-start.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  // 시작 버튼 클릭 시 페이지 이동 함수
  const handleStartClick = () => {
    navigate('/entrance');
  };

  return (
    // BackgroundLayout으로 감싸서 배경 이미지 적용 (모바일 비율 자동 처리)
    <BackgroundLayout image={bgLanding}>
      
      {/* 시작하기 버튼 */}
      <button
        onClick={handleStartClick}
        style={{
          // --- 위치 및 크기 설정 (디자인 기준 390x844 비율 적용) ---
          position: 'absolute',
          
          // 세로 위치: 677 / 844 ≈ 80.2% 지점에 배치
          top: '80.2%', 
          
          // 가로 위치: 디자인상 가운데 정렬이므로 50%로 이동 후 본인 크기의 절반만큼 왼쪽으로 이동
          left: '50%',
          transform: 'translateX(-50%)',
          
          // 크기 고정 (요청하신 사이즈)
          width: '89px',
          height: '35px',
          
          // --- 버튼 기본 스타일 제거 ---
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 10, // 배경보다 위에 오도록 설정
        }}
      >
        {/* SVG 이미지를 버튼 크기에 꽉 차게 표시 */}
        <img 
          src={btnStart} 
          alt="시작하기" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </button>

    </BackgroundLayout>
  );
};

export default LandingPage;