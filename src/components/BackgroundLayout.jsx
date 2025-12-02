import React from 'react';

const BackgroundLayout = ({ children, className, image }) => {
  return (
    // 1. [Outer Wrapper] PC 화면 전체를 감싸는 영역 (배경색: #1C2333)
    <div 
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: '#1C2333', // 요청하신 색상
        display: 'flex',
        justifyContent: 'center', // 모바일 화면을 가운데 정렬
        alignItems: 'flex-start', // 내용이 길어지면 스크롤 되도록 상단 기준 정렬
      }}
    >
      {/* 2. [Inner Container] 실제 모바일 앱 화면 (최대 너비 제한) */}
      <div
        className={className}
        style={{
          width: '100%',
          maxWidth: '430px', // 최신 아이폰 Pro Max 정도의 너비 (PC에서 너무 넓게 안 퍼지게)
          minHeight: '100vh',
          
          // 배경 이미지 설정
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
          // 내부 요소 정렬
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          
          // 시각적 디테일 (PC에서 앱처럼 보이게 그림자 추가 - 선택사항)
          boxShadow: '0 0 20px rgba(0,0,0,0.5)' 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;