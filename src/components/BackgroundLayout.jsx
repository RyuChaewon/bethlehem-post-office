import React, { useState, useEffect } from 'react';

const BackgroundLayout = ({ children, className, image }) => {
  // 1. 로딩 상태 관리
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 이미지가 없으면 바로 로딩 끝 (setTimeout으로 경고 방지)
    if (!image) {
      setTimeout(() => setIsLoaded(true), 0);
      return;
    }

    // 이미지 미리 다운로드 (Preload)
    const img = new Image();
    img.src = image;
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // 에러 나도 화면은 보여줌
  }, [image]);

  return (
    // 1. [Outer Wrapper] 기존 레이아웃 설정 완벽 유지
    <div 
      style={{
        width: '100vw',
        
        /* 기존 설정 유지: 내용물이 길면 늘어나도록 */
        minHeight: '100vh',
        height: 'auto',
        
        backgroundColor: '#1C2333', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'flex-start', // 위에서부터 시작
        
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative' // 로딩 텍스트 위치 잡기 위해 추가
      }}
    >
      {/* 2. [로딩 텍스트] 이미지가 뜨기 전까지 중앙에 표시 */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50vh', // 화면 중앙쯤
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          zIndex: 0
        }}>
          Loading...
        </div>
      )}

      {/* 3. [Inner Container] 기존 설정 유지 + 애니메이션 추가 */}
      <div
        className={className}
        style={{
          width: '100%',
          maxWidth: '430px', 
          
          /* 기존 비율 설정 유지 */
          aspectRatio: '390 / 720',
          minHeight: 'calc(100vw * (720 / 390))', 

          backgroundImage: image ? `url(${image})` : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%', 
          backgroundPosition: 'top center',
          
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          overflow: 'hidden',

          /* [추가된 부분] 로딩 완료 시 투명도 0 -> 1 부드럽게 전환 */
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;